import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import vm from 'node:vm';

const read = (path) => readFileSync(new URL(path, import.meta.url), 'utf8');

const inlineScript = (source) => {
  const match = source.match(/<script(?: [^>]*)?>\s*([\s\S]*?)\s*<\/script>/);
  assert.ok(match, 'expected an inline script');
  return match[1];
};

class FakeEventTarget {
  listeners = new Map();

  addEventListener(name, listener) {
    const listeners = this.listeners.get(name) || [];
    listeners.push(listener);
    this.listeners.set(name, listeners);
  }

  dispatchEvent(event) {
    (this.listeners.get(event.type) || []).forEach((listener) => listener(event));
  }
}

class FakeElement extends FakeEventTarget {
  constructor(dataset = {}) {
    super();
    this.dataset = dataset;
    this.hidden = false;
  }
}

test('accepting analytics retries section and scroll signals first seen before consent', () => {
  const analyticsScript = inlineScript(read('../src/components/Analytics.astro'));
  const cookieScript = inlineScript(read('../src/components/CookieNotice.astro'));
  const storedValues = new Map();
  const section = new FakeElement({ analyticsSection: 'services' });
  const acceptButton = new FakeElement();
  const rejectButton = new FakeElement();
  const notice = new FakeElement();
  notice.querySelector = (selector) => selector === '[data-cookie-accept]'
    ? acceptButton
    : selector === '[data-cookie-reject]'
      ? rejectButton
      : null;

  let sectionObserver;
  class FakeIntersectionObserver {
    constructor(callback) {
      this.callback = callback;
      this.unobserved = [];
      sectionObserver = this;
    }

    observe() {}

    unobserve(target) {
      this.unobserved.push(target);
    }

    emit(entries) {
      this.callback(entries);
    }
  }

  const document = new FakeEventTarget();
  Object.assign(document, {
    body: { scrollHeight: 2000 },
    documentElement: { lang: 'en', scrollHeight: 2000 },
    head: { appendChild() {} },
    cookie: '',
    createElement: () => ({}),
    querySelector: (selector) => selector === '[data-cookie-notice]' ? notice : null,
    querySelectorAll: (selector) => {
      if (selector === '[data-analytics-section]') return [section];
      return [];
    },
  });

  const window = new FakeEventTarget();
  Object.assign(window, {
    IntersectionObserver: FakeIntersectionObserver,
    innerHeight: 1000,
    location: { hostname: 'matejlukasik.com', pathname: '/', search: '' },
    scrollY: 600,
  });

  const context = {
    CustomEvent: class CustomEvent {
      constructor(type) {
        this.type = type;
      }
    },
    Element: FakeElement,
    IntersectionObserver: FakeIntersectionObserver,
    URLSearchParams,
    document,
    gaMeasurementId: 'G-TEST',
    localStorage: {
      getItem: (key) => storedValues.get(key) || null,
      setItem: (key, value) => storedValues.set(key, value),
    },
    requestAnimationFrame: (callback) => callback(),
    window,
  };

  vm.runInNewContext(analyticsScript, context);
  vm.runInNewContext(cookieScript, context);
  sectionObserver.emit([{ isIntersecting: true, target: section }]);

  assert.deepEqual(sectionObserver.unobserved, []);

  acceptButton.dispatchEvent({ type: 'click' });

  const analyticsEvents = window.dataLayer
    .map((entry) => Array.from(entry))
    .filter(([command]) => command === 'event');
  const eventNames = analyticsEvents.map(([, name]) => name);

  const storedConsent = JSON.parse(storedValues.get('matejlukasik_cookie_consent'));
  assert.equal(storedConsent.version, '2026-07-19');
  assert.equal(storedConsent.choice, 'accepted');
  assert.ok(Date.parse(storedConsent.expiresAt) > Date.parse(storedConsent.decidedAt));
  assert.deepEqual(sectionObserver.unobserved, [section]);
  assert.ok(eventNames.includes('section_viewed'));
  assert.equal(eventNames.filter((name) => name === 'scroll_depth_reached').length, 3);
});
