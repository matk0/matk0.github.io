(() => {
  // ns-hugo-imp:/Users/matejlukasik/Library/Caches/hugo_cache/modules/filecache/modules/pkg/mod/github.com/twbs/bootstrap@v5.3.7+incompatible/js/src/dom/data.js
  var elementMap = /* @__PURE__ */ new Map();
  var data_default = {
    set(element, key, instance) {
      if (!elementMap.has(element)) {
        elementMap.set(element, /* @__PURE__ */ new Map());
      }
      const instanceMap = elementMap.get(element);
      if (!instanceMap.has(key) && instanceMap.size !== 0) {
        console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(instanceMap.keys())[0]}.`);
        return;
      }
      instanceMap.set(key, instance);
    },
    get(element, key) {
      if (elementMap.has(element)) {
        return elementMap.get(element).get(key) || null;
      }
      return null;
    },
    remove(element, key) {
      if (!elementMap.has(element)) {
        return;
      }
      const instanceMap = elementMap.get(element);
      instanceMap.delete(key);
      if (instanceMap.size === 0) {
        elementMap.delete(element);
      }
    }
  };

  // ns-hugo-imp:/Users/matejlukasik/Library/Caches/hugo_cache/modules/filecache/modules/pkg/mod/github.com/twbs/bootstrap@v5.3.7+incompatible/js/src/util/index.js
  var MILLISECONDS_MULTIPLIER = 1e3;
  var TRANSITION_END = "transitionend";
  var parseSelector = (selector) => {
    if (selector && window.CSS && window.CSS.escape) {
      selector = selector.replace(/#([^\s"#']+)/g, (match, id) => `#${CSS.escape(id)}`);
    }
    return selector;
  };
  var toType = (object) => {
    if (object === null || object === void 0) {
      return `${object}`;
    }
    return Object.prototype.toString.call(object).match(/\s([a-z]+)/i)[1].toLowerCase();
  };
  var getTransitionDurationFromElement = (element) => {
    if (!element) {
      return 0;
    }
    let { transitionDuration, transitionDelay } = window.getComputedStyle(element);
    const floatTransitionDuration = Number.parseFloat(transitionDuration);
    const floatTransitionDelay = Number.parseFloat(transitionDelay);
    if (!floatTransitionDuration && !floatTransitionDelay) {
      return 0;
    }
    transitionDuration = transitionDuration.split(",")[0];
    transitionDelay = transitionDelay.split(",")[0];
    return (Number.parseFloat(transitionDuration) + Number.parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
  };
  var triggerTransitionEnd = (element) => {
    element.dispatchEvent(new Event(TRANSITION_END));
  };
  var isElement = (object) => {
    if (!object || typeof object !== "object") {
      return false;
    }
    if (typeof object.jquery !== "undefined") {
      object = object[0];
    }
    return typeof object.nodeType !== "undefined";
  };
  var getElement = (object) => {
    if (isElement(object)) {
      return object.jquery ? object[0] : object;
    }
    if (typeof object === "string" && object.length > 0) {
      return document.querySelector(parseSelector(object));
    }
    return null;
  };
  var isVisible = (element) => {
    if (!isElement(element) || element.getClientRects().length === 0) {
      return false;
    }
    const elementIsVisible = getComputedStyle(element).getPropertyValue("visibility") === "visible";
    const closedDetails = element.closest("details:not([open])");
    if (!closedDetails) {
      return elementIsVisible;
    }
    if (closedDetails !== element) {
      const summary = element.closest("summary");
      if (summary && summary.parentNode !== closedDetails) {
        return false;
      }
      if (summary === null) {
        return false;
      }
    }
    return elementIsVisible;
  };
  var isDisabled = (element) => {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
      return true;
    }
    if (element.classList.contains("disabled")) {
      return true;
    }
    if (typeof element.disabled !== "undefined") {
      return element.disabled;
    }
    return element.hasAttribute("disabled") && element.getAttribute("disabled") !== "false";
  };
  var getjQuery = () => {
    if (window.jQuery && !document.body.hasAttribute("data-bs-no-jquery")) {
      return window.jQuery;
    }
    return null;
  };
  var DOMContentLoadedCallbacks = [];
  var onDOMContentLoaded = (callback) => {
    if (document.readyState === "loading") {
      if (!DOMContentLoadedCallbacks.length) {
        document.addEventListener("DOMContentLoaded", () => {
          for (const callback2 of DOMContentLoadedCallbacks) {
            callback2();
          }
        });
      }
      DOMContentLoadedCallbacks.push(callback);
    } else {
      callback();
    }
  };
  var defineJQueryPlugin = (plugin) => {
    onDOMContentLoaded(() => {
      const $ = getjQuery();
      if ($) {
        const name = plugin.NAME;
        const JQUERY_NO_CONFLICT = $.fn[name];
        $.fn[name] = plugin.jQueryInterface;
        $.fn[name].Constructor = plugin;
        $.fn[name].noConflict = () => {
          $.fn[name] = JQUERY_NO_CONFLICT;
          return plugin.jQueryInterface;
        };
      }
    });
  };
  var execute = (possibleCallback, args = [], defaultValue = possibleCallback) => {
    return typeof possibleCallback === "function" ? possibleCallback.call(...args) : defaultValue;
  };
  var executeAfterTransition = (callback, transitionElement, waitForTransition = true) => {
    if (!waitForTransition) {
      execute(callback);
      return;
    }
    const durationPadding = 5;
    const emulatedDuration = getTransitionDurationFromElement(transitionElement) + durationPadding;
    let called = false;
    const handler = ({ target }) => {
      if (target !== transitionElement) {
        return;
      }
      called = true;
      transitionElement.removeEventListener(TRANSITION_END, handler);
      execute(callback);
    };
    transitionElement.addEventListener(TRANSITION_END, handler);
    setTimeout(() => {
      if (!called) {
        triggerTransitionEnd(transitionElement);
      }
    }, emulatedDuration);
  };
  var getNextActiveElement = (list, activeElement, shouldGetNext, isCycleAllowed) => {
    const listLength = list.length;
    let index = list.indexOf(activeElement);
    if (index === -1) {
      return !shouldGetNext && isCycleAllowed ? list[listLength - 1] : list[0];
    }
    index += shouldGetNext ? 1 : -1;
    if (isCycleAllowed) {
      index = (index + listLength) % listLength;
    }
    return list[Math.max(0, Math.min(index, listLength - 1))];
  };

  // ns-hugo-imp:/Users/matejlukasik/Library/Caches/hugo_cache/modules/filecache/modules/pkg/mod/github.com/twbs/bootstrap@v5.3.7+incompatible/js/src/dom/event-handler.js
  var namespaceRegex = /[^.]*(?=\..*)\.|.*/;
  var stripNameRegex = /\..*/;
  var stripUidRegex = /::\d+$/;
  var eventRegistry = {};
  var uidEvent = 1;
  var customEvents = {
    mouseenter: "mouseover",
    mouseleave: "mouseout"
  };
  var nativeEvents = /* @__PURE__ */ new Set([
    "click",
    "dblclick",
    "mouseup",
    "mousedown",
    "contextmenu",
    "mousewheel",
    "DOMMouseScroll",
    "mouseover",
    "mouseout",
    "mousemove",
    "selectstart",
    "selectend",
    "keydown",
    "keypress",
    "keyup",
    "orientationchange",
    "touchstart",
    "touchmove",
    "touchend",
    "touchcancel",
    "pointerdown",
    "pointermove",
    "pointerup",
    "pointerleave",
    "pointercancel",
    "gesturestart",
    "gesturechange",
    "gestureend",
    "focus",
    "blur",
    "change",
    "reset",
    "select",
    "submit",
    "focusin",
    "focusout",
    "load",
    "unload",
    "beforeunload",
    "resize",
    "move",
    "DOMContentLoaded",
    "readystatechange",
    "error",
    "abort",
    "scroll"
  ]);
  function makeEventUid(element, uid) {
    return uid && `${uid}::${uidEvent++}` || element.uidEvent || uidEvent++;
  }
  function getElementEvents(element) {
    const uid = makeEventUid(element);
    element.uidEvent = uid;
    eventRegistry[uid] = eventRegistry[uid] || {};
    return eventRegistry[uid];
  }
  function bootstrapHandler(element, fn) {
    return function handler(event) {
      hydrateObj(event, { delegateTarget: element });
      if (handler.oneOff) {
        EventHandler.off(element, event.type, fn);
      }
      return fn.apply(element, [event]);
    };
  }
  function bootstrapDelegationHandler(element, selector, fn) {
    return function handler(event) {
      const domElements = element.querySelectorAll(selector);
      for (let { target } = event; target && target !== this; target = target.parentNode) {
        for (const domElement of domElements) {
          if (domElement !== target) {
            continue;
          }
          hydrateObj(event, { delegateTarget: target });
          if (handler.oneOff) {
            EventHandler.off(element, event.type, selector, fn);
          }
          return fn.apply(target, [event]);
        }
      }
    };
  }
  function findHandler(events, callable, delegationSelector = null) {
    return Object.values(events).find((event) => event.callable === callable && event.delegationSelector === delegationSelector);
  }
  function normalizeParameters(originalTypeEvent, handler, delegationFunction) {
    const isDelegated = typeof handler === "string";
    const callable = isDelegated ? delegationFunction : handler || delegationFunction;
    let typeEvent = getTypeEvent(originalTypeEvent);
    if (!nativeEvents.has(typeEvent)) {
      typeEvent = originalTypeEvent;
    }
    return [isDelegated, callable, typeEvent];
  }
  function addHandler(element, originalTypeEvent, handler, delegationFunction, oneOff) {
    if (typeof originalTypeEvent !== "string" || !element) {
      return;
    }
    let [isDelegated, callable, typeEvent] = normalizeParameters(originalTypeEvent, handler, delegationFunction);
    if (originalTypeEvent in customEvents) {
      const wrapFunction = (fn2) => {
        return function(event) {
          if (!event.relatedTarget || event.relatedTarget !== event.delegateTarget && !event.delegateTarget.contains(event.relatedTarget)) {
            return fn2.call(this, event);
          }
        };
      };
      callable = wrapFunction(callable);
    }
    const events = getElementEvents(element);
    const handlers = events[typeEvent] || (events[typeEvent] = {});
    const previousFunction = findHandler(handlers, callable, isDelegated ? handler : null);
    if (previousFunction) {
      previousFunction.oneOff = previousFunction.oneOff && oneOff;
      return;
    }
    const uid = makeEventUid(callable, originalTypeEvent.replace(namespaceRegex, ""));
    const fn = isDelegated ? bootstrapDelegationHandler(element, handler, callable) : bootstrapHandler(element, callable);
    fn.delegationSelector = isDelegated ? handler : null;
    fn.callable = callable;
    fn.oneOff = oneOff;
    fn.uidEvent = uid;
    handlers[uid] = fn;
    element.addEventListener(typeEvent, fn, isDelegated);
  }
  function removeHandler(element, events, typeEvent, handler, delegationSelector) {
    const fn = findHandler(events[typeEvent], handler, delegationSelector);
    if (!fn) {
      return;
    }
    element.removeEventListener(typeEvent, fn, Boolean(delegationSelector));
    delete events[typeEvent][fn.uidEvent];
  }
  function removeNamespacedHandlers(element, events, typeEvent, namespace) {
    const storeElementEvent = events[typeEvent] || {};
    for (const [handlerKey, event] of Object.entries(storeElementEvent)) {
      if (handlerKey.includes(namespace)) {
        removeHandler(element, events, typeEvent, event.callable, event.delegationSelector);
      }
    }
  }
  function getTypeEvent(event) {
    event = event.replace(stripNameRegex, "");
    return customEvents[event] || event;
  }
  var EventHandler = {
    on(element, event, handler, delegationFunction) {
      addHandler(element, event, handler, delegationFunction, false);
    },
    one(element, event, handler, delegationFunction) {
      addHandler(element, event, handler, delegationFunction, true);
    },
    off(element, originalTypeEvent, handler, delegationFunction) {
      if (typeof originalTypeEvent !== "string" || !element) {
        return;
      }
      const [isDelegated, callable, typeEvent] = normalizeParameters(originalTypeEvent, handler, delegationFunction);
      const inNamespace = typeEvent !== originalTypeEvent;
      const events = getElementEvents(element);
      const storeElementEvent = events[typeEvent] || {};
      const isNamespace = originalTypeEvent.startsWith(".");
      if (typeof callable !== "undefined") {
        if (!Object.keys(storeElementEvent).length) {
          return;
        }
        removeHandler(element, events, typeEvent, callable, isDelegated ? handler : null);
        return;
      }
      if (isNamespace) {
        for (const elementEvent of Object.keys(events)) {
          removeNamespacedHandlers(element, events, elementEvent, originalTypeEvent.slice(1));
        }
      }
      for (const [keyHandlers, event] of Object.entries(storeElementEvent)) {
        const handlerKey = keyHandlers.replace(stripUidRegex, "");
        if (!inNamespace || originalTypeEvent.includes(handlerKey)) {
          removeHandler(element, events, typeEvent, event.callable, event.delegationSelector);
        }
      }
    },
    trigger(element, event, args) {
      if (typeof event !== "string" || !element) {
        return null;
      }
      const $ = getjQuery();
      const typeEvent = getTypeEvent(event);
      const inNamespace = event !== typeEvent;
      let jQueryEvent = null;
      let bubbles = true;
      let nativeDispatch = true;
      let defaultPrevented = false;
      if (inNamespace && $) {
        jQueryEvent = $.Event(event, args);
        $(element).trigger(jQueryEvent);
        bubbles = !jQueryEvent.isPropagationStopped();
        nativeDispatch = !jQueryEvent.isImmediatePropagationStopped();
        defaultPrevented = jQueryEvent.isDefaultPrevented();
      }
      const evt = hydrateObj(new Event(event, { bubbles, cancelable: true }), args);
      if (defaultPrevented) {
        evt.preventDefault();
      }
      if (nativeDispatch) {
        element.dispatchEvent(evt);
      }
      if (evt.defaultPrevented && jQueryEvent) {
        jQueryEvent.preventDefault();
      }
      return evt;
    }
  };
  function hydrateObj(obj, meta = {}) {
    for (const [key, value] of Object.entries(meta)) {
      try {
        obj[key] = value;
      } catch (e) {
        Object.defineProperty(obj, key, {
          configurable: true,
          get() {
            return value;
          }
        });
      }
    }
    return obj;
  }
  var event_handler_default = EventHandler;

  // ns-hugo-imp:/Users/matejlukasik/Library/Caches/hugo_cache/modules/filecache/modules/pkg/mod/github.com/twbs/bootstrap@v5.3.7+incompatible/js/src/dom/manipulator.js
  function normalizeData(value) {
    if (value === "true") {
      return true;
    }
    if (value === "false") {
      return false;
    }
    if (value === Number(value).toString()) {
      return Number(value);
    }
    if (value === "" || value === "null") {
      return null;
    }
    if (typeof value !== "string") {
      return value;
    }
    try {
      return JSON.parse(decodeURIComponent(value));
    } catch (e) {
      return value;
    }
  }
  function normalizeDataKey(key) {
    return key.replace(/[A-Z]/g, (chr) => `-${chr.toLowerCase()}`);
  }
  var Manipulator = {
    setDataAttribute(element, key, value) {
      element.setAttribute(`data-bs-${normalizeDataKey(key)}`, value);
    },
    removeDataAttribute(element, key) {
      element.removeAttribute(`data-bs-${normalizeDataKey(key)}`);
    },
    getDataAttributes(element) {
      if (!element) {
        return {};
      }
      const attributes = {};
      const bsKeys = Object.keys(element.dataset).filter((key) => key.startsWith("bs") && !key.startsWith("bsConfig"));
      for (const key of bsKeys) {
        let pureKey = key.replace(/^bs/, "");
        pureKey = pureKey.charAt(0).toLowerCase() + pureKey.slice(1);
        attributes[pureKey] = normalizeData(element.dataset[key]);
      }
      return attributes;
    },
    getDataAttribute(element, key) {
      return normalizeData(element.getAttribute(`data-bs-${normalizeDataKey(key)}`));
    }
  };
  var manipulator_default = Manipulator;

  // ns-hugo-imp:/Users/matejlukasik/Library/Caches/hugo_cache/modules/filecache/modules/pkg/mod/github.com/twbs/bootstrap@v5.3.7+incompatible/js/src/util/config.js
  var Config = class {
    // Getters
    static get Default() {
      return {};
    }
    static get DefaultType() {
      return {};
    }
    static get NAME() {
      throw new Error('You have to implement the static method "NAME", for each component!');
    }
    _getConfig(config) {
      config = this._mergeConfigObj(config);
      config = this._configAfterMerge(config);
      this._typeCheckConfig(config);
      return config;
    }
    _configAfterMerge(config) {
      return config;
    }
    _mergeConfigObj(config, element) {
      const jsonConfig = isElement(element) ? manipulator_default.getDataAttribute(element, "config") : {};
      return {
        ...this.constructor.Default,
        ...typeof jsonConfig === "object" ? jsonConfig : {},
        ...isElement(element) ? manipulator_default.getDataAttributes(element) : {},
        ...typeof config === "object" ? config : {}
      };
    }
    _typeCheckConfig(config, configTypes = this.constructor.DefaultType) {
      for (const [property, expectedTypes] of Object.entries(configTypes)) {
        const value = config[property];
        const valueType = isElement(value) ? "element" : toType(value);
        if (!new RegExp(expectedTypes).test(valueType)) {
          throw new TypeError(
            `${this.constructor.NAME.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`
          );
        }
      }
    }
  };
  var config_default = Config;

  // ns-hugo-imp:/Users/matejlukasik/Library/Caches/hugo_cache/modules/filecache/modules/pkg/mod/github.com/twbs/bootstrap@v5.3.7+incompatible/js/src/base-component.js
  var VERSION = "5.3.7";
  var BaseComponent = class extends config_default {
    constructor(element, config) {
      super();
      element = getElement(element);
      if (!element) {
        return;
      }
      this._element = element;
      this._config = this._getConfig(config);
      data_default.set(this._element, this.constructor.DATA_KEY, this);
    }
    // Public
    dispose() {
      data_default.remove(this._element, this.constructor.DATA_KEY);
      event_handler_default.off(this._element, this.constructor.EVENT_KEY);
      for (const propertyName of Object.getOwnPropertyNames(this)) {
        this[propertyName] = null;
      }
    }
    // Private
    _queueCallback(callback, element, isAnimated = true) {
      executeAfterTransition(callback, element, isAnimated);
    }
    _getConfig(config) {
      config = this._mergeConfigObj(config, this._element);
      config = this._configAfterMerge(config);
      this._typeCheckConfig(config);
      return config;
    }
    // Static
    static getInstance(element) {
      return data_default.get(getElement(element), this.DATA_KEY);
    }
    static getOrCreateInstance(element, config = {}) {
      return this.getInstance(element) || new this(element, typeof config === "object" ? config : null);
    }
    static get VERSION() {
      return VERSION;
    }
    static get DATA_KEY() {
      return `bs.${this.NAME}`;
    }
    static get EVENT_KEY() {
      return `.${this.DATA_KEY}`;
    }
    static eventName(name) {
      return `${name}${this.EVENT_KEY}`;
    }
  };
  var base_component_default = BaseComponent;

  // ns-hugo-imp:/Users/matejlukasik/Library/Caches/hugo_cache/modules/filecache/modules/pkg/mod/github.com/twbs/bootstrap@v5.3.7+incompatible/js/src/dom/selector-engine.js
  var getSelector = (element) => {
    let selector = element.getAttribute("data-bs-target");
    if (!selector || selector === "#") {
      let hrefAttribute = element.getAttribute("href");
      if (!hrefAttribute || !hrefAttribute.includes("#") && !hrefAttribute.startsWith(".")) {
        return null;
      }
      if (hrefAttribute.includes("#") && !hrefAttribute.startsWith("#")) {
        hrefAttribute = `#${hrefAttribute.split("#")[1]}`;
      }
      selector = hrefAttribute && hrefAttribute !== "#" ? hrefAttribute.trim() : null;
    }
    return selector ? selector.split(",").map((sel) => parseSelector(sel)).join(",") : null;
  };
  var SelectorEngine = {
    find(selector, element = document.documentElement) {
      return [].concat(...Element.prototype.querySelectorAll.call(element, selector));
    },
    findOne(selector, element = document.documentElement) {
      return Element.prototype.querySelector.call(element, selector);
    },
    children(element, selector) {
      return [].concat(...element.children).filter((child) => child.matches(selector));
    },
    parents(element, selector) {
      const parents = [];
      let ancestor = element.parentNode.closest(selector);
      while (ancestor) {
        parents.push(ancestor);
        ancestor = ancestor.parentNode.closest(selector);
      }
      return parents;
    },
    prev(element, selector) {
      let previous = element.previousElementSibling;
      while (previous) {
        if (previous.matches(selector)) {
          return [previous];
        }
        previous = previous.previousElementSibling;
      }
      return [];
    },
    // TODO: this is now unused; remove later along with prev()
    next(element, selector) {
      let next = element.nextElementSibling;
      while (next) {
        if (next.matches(selector)) {
          return [next];
        }
        next = next.nextElementSibling;
      }
      return [];
    },
    focusableChildren(element) {
      const focusables = [
        "a",
        "button",
        "input",
        "textarea",
        "select",
        "details",
        "[tabindex]",
        '[contenteditable="true"]'
      ].map((selector) => `${selector}:not([tabindex^="-"])`).join(",");
      return this.find(focusables, element).filter((el) => !isDisabled(el) && isVisible(el));
    },
    getSelectorFromElement(element) {
      const selector = getSelector(element);
      if (selector) {
        return SelectorEngine.findOne(selector) ? selector : null;
      }
      return null;
    },
    getElementFromSelector(element) {
      const selector = getSelector(element);
      return selector ? SelectorEngine.findOne(selector) : null;
    },
    getMultipleElementsFromSelector(element) {
      const selector = getSelector(element);
      return selector ? SelectorEngine.find(selector) : [];
    }
  };
  var selector_engine_default = SelectorEngine;

  // ns-hugo-imp:/Users/matejlukasik/Library/Caches/hugo_cache/modules/filecache/modules/pkg/mod/github.com/twbs/bootstrap@v5.3.7+incompatible/js/src/tab.js
  var NAME = "tab";
  var DATA_KEY = "bs.tab";
  var EVENT_KEY = `.${DATA_KEY}`;
  var EVENT_HIDE = `hide${EVENT_KEY}`;
  var EVENT_HIDDEN = `hidden${EVENT_KEY}`;
  var EVENT_SHOW = `show${EVENT_KEY}`;
  var EVENT_SHOWN = `shown${EVENT_KEY}`;
  var EVENT_CLICK_DATA_API = `click${EVENT_KEY}`;
  var EVENT_KEYDOWN = `keydown${EVENT_KEY}`;
  var EVENT_LOAD_DATA_API = `load${EVENT_KEY}`;
  var ARROW_LEFT_KEY = "ArrowLeft";
  var ARROW_RIGHT_KEY = "ArrowRight";
  var ARROW_UP_KEY = "ArrowUp";
  var ARROW_DOWN_KEY = "ArrowDown";
  var HOME_KEY = "Home";
  var END_KEY = "End";
  var CLASS_NAME_ACTIVE = "active";
  var CLASS_NAME_FADE = "fade";
  var CLASS_NAME_SHOW = "show";
  var CLASS_DROPDOWN = "dropdown";
  var SELECTOR_DROPDOWN_TOGGLE = ".dropdown-toggle";
  var SELECTOR_DROPDOWN_MENU = ".dropdown-menu";
  var NOT_SELECTOR_DROPDOWN_TOGGLE = `:not(${SELECTOR_DROPDOWN_TOGGLE})`;
  var SELECTOR_TAB_PANEL = '.list-group, .nav, [role="tablist"]';
  var SELECTOR_OUTER = ".nav-item, .list-group-item";
  var SELECTOR_INNER = `.nav-link${NOT_SELECTOR_DROPDOWN_TOGGLE}, .list-group-item${NOT_SELECTOR_DROPDOWN_TOGGLE}, [role="tab"]${NOT_SELECTOR_DROPDOWN_TOGGLE}`;
  var SELECTOR_DATA_TOGGLE = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]';
  var SELECTOR_INNER_ELEM = `${SELECTOR_INNER}, ${SELECTOR_DATA_TOGGLE}`;
  var SELECTOR_DATA_TOGGLE_ACTIVE = `.${CLASS_NAME_ACTIVE}[data-bs-toggle="tab"], .${CLASS_NAME_ACTIVE}[data-bs-toggle="pill"], .${CLASS_NAME_ACTIVE}[data-bs-toggle="list"]`;
  var Tab = class _Tab extends base_component_default {
    constructor(element) {
      super(element);
      this._parent = this._element.closest(SELECTOR_TAB_PANEL);
      if (!this._parent) {
        return;
      }
      this._setInitialAttributes(this._parent, this._getChildren());
      event_handler_default.on(this._element, EVENT_KEYDOWN, (event) => this._keydown(event));
    }
    // Getters
    static get NAME() {
      return NAME;
    }
    // Public
    show() {
      const innerElem = this._element;
      if (this._elemIsActive(innerElem)) {
        return;
      }
      const active = this._getActiveElem();
      const hideEvent = active ? event_handler_default.trigger(active, EVENT_HIDE, { relatedTarget: innerElem }) : null;
      const showEvent = event_handler_default.trigger(innerElem, EVENT_SHOW, { relatedTarget: active });
      if (showEvent.defaultPrevented || hideEvent && hideEvent.defaultPrevented) {
        return;
      }
      this._deactivate(active, innerElem);
      this._activate(innerElem, active);
    }
    // Private
    _activate(element, relatedElem) {
      if (!element) {
        return;
      }
      element.classList.add(CLASS_NAME_ACTIVE);
      this._activate(selector_engine_default.getElementFromSelector(element));
      const complete = () => {
        if (element.getAttribute("role") !== "tab") {
          element.classList.add(CLASS_NAME_SHOW);
          return;
        }
        element.removeAttribute("tabindex");
        element.setAttribute("aria-selected", true);
        this._toggleDropDown(element, true);
        event_handler_default.trigger(element, EVENT_SHOWN, {
          relatedTarget: relatedElem
        });
      };
      this._queueCallback(complete, element, element.classList.contains(CLASS_NAME_FADE));
    }
    _deactivate(element, relatedElem) {
      if (!element) {
        return;
      }
      element.classList.remove(CLASS_NAME_ACTIVE);
      element.blur();
      this._deactivate(selector_engine_default.getElementFromSelector(element));
      const complete = () => {
        if (element.getAttribute("role") !== "tab") {
          element.classList.remove(CLASS_NAME_SHOW);
          return;
        }
        element.setAttribute("aria-selected", false);
        element.setAttribute("tabindex", "-1");
        this._toggleDropDown(element, false);
        event_handler_default.trigger(element, EVENT_HIDDEN, { relatedTarget: relatedElem });
      };
      this._queueCallback(complete, element, element.classList.contains(CLASS_NAME_FADE));
    }
    _keydown(event) {
      if (![ARROW_LEFT_KEY, ARROW_RIGHT_KEY, ARROW_UP_KEY, ARROW_DOWN_KEY, HOME_KEY, END_KEY].includes(event.key)) {
        return;
      }
      event.stopPropagation();
      event.preventDefault();
      const children = this._getChildren().filter((element) => !isDisabled(element));
      let nextActiveElement;
      if ([HOME_KEY, END_KEY].includes(event.key)) {
        nextActiveElement = children[event.key === HOME_KEY ? 0 : children.length - 1];
      } else {
        const isNext = [ARROW_RIGHT_KEY, ARROW_DOWN_KEY].includes(event.key);
        nextActiveElement = getNextActiveElement(children, event.target, isNext, true);
      }
      if (nextActiveElement) {
        nextActiveElement.focus({ preventScroll: true });
        _Tab.getOrCreateInstance(nextActiveElement).show();
      }
    }
    _getChildren() {
      return selector_engine_default.find(SELECTOR_INNER_ELEM, this._parent);
    }
    _getActiveElem() {
      return this._getChildren().find((child) => this._elemIsActive(child)) || null;
    }
    _setInitialAttributes(parent, children) {
      this._setAttributeIfNotExists(parent, "role", "tablist");
      for (const child of children) {
        this._setInitialAttributesOnChild(child);
      }
    }
    _setInitialAttributesOnChild(child) {
      child = this._getInnerElement(child);
      const isActive = this._elemIsActive(child);
      const outerElem = this._getOuterElement(child);
      child.setAttribute("aria-selected", isActive);
      if (outerElem !== child) {
        this._setAttributeIfNotExists(outerElem, "role", "presentation");
      }
      if (!isActive) {
        child.setAttribute("tabindex", "-1");
      }
      this._setAttributeIfNotExists(child, "role", "tab");
      this._setInitialAttributesOnTargetPanel(child);
    }
    _setInitialAttributesOnTargetPanel(child) {
      const target = selector_engine_default.getElementFromSelector(child);
      if (!target) {
        return;
      }
      this._setAttributeIfNotExists(target, "role", "tabpanel");
      if (child.id) {
        this._setAttributeIfNotExists(target, "aria-labelledby", `${child.id}`);
      }
    }
    _toggleDropDown(element, open) {
      const outerElem = this._getOuterElement(element);
      if (!outerElem.classList.contains(CLASS_DROPDOWN)) {
        return;
      }
      const toggle = (selector, className) => {
        const element2 = selector_engine_default.findOne(selector, outerElem);
        if (element2) {
          element2.classList.toggle(className, open);
        }
      };
      toggle(SELECTOR_DROPDOWN_TOGGLE, CLASS_NAME_ACTIVE);
      toggle(SELECTOR_DROPDOWN_MENU, CLASS_NAME_SHOW);
      outerElem.setAttribute("aria-expanded", open);
    }
    _setAttributeIfNotExists(element, attribute, value) {
      if (!element.hasAttribute(attribute)) {
        element.setAttribute(attribute, value);
      }
    }
    _elemIsActive(elem) {
      return elem.classList.contains(CLASS_NAME_ACTIVE);
    }
    // Try to get the inner element (usually the .nav-link)
    _getInnerElement(elem) {
      return elem.matches(SELECTOR_INNER_ELEM) ? elem : selector_engine_default.findOne(SELECTOR_INNER_ELEM, elem);
    }
    // Try to get the outer element (usually the .nav-item)
    _getOuterElement(elem) {
      return elem.closest(SELECTOR_OUTER) || elem;
    }
    // Static
    static jQueryInterface(config) {
      return this.each(function() {
        const data = _Tab.getOrCreateInstance(this);
        if (typeof config !== "string") {
          return;
        }
        if (data[config] === void 0 || config.startsWith("_") || config === "constructor") {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config]();
      });
    }
  };
  event_handler_default.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function(event) {
    if (["A", "AREA"].includes(this.tagName)) {
      event.preventDefault();
    }
    if (isDisabled(this)) {
      return;
    }
    Tab.getOrCreateInstance(this).show();
  });
  event_handler_default.on(window, EVENT_LOAD_DATA_API, () => {
    for (const element of selector_engine_default.find(SELECTOR_DATA_TOGGLE_ACTIVE)) {
      Tab.getOrCreateInstance(element);
    }
  });
  defineJQueryPlugin(Tab);
  var tab_default = Tab;

  // <stdin>
  var stdin_default = {
    Tab: tab_default
  };
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibnMtaHVnby1pbXA6L1VzZXJzL21hdGVqbHVrYXNpay9MaWJyYXJ5L0NhY2hlcy9odWdvX2NhY2hlL21vZHVsZXMvZmlsZWNhY2hlL21vZHVsZXMvcGtnL21vZC9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwQHY1LjMuNytpbmNvbXBhdGlibGUvanMvc3JjL2RvbS9kYXRhLmpzIiwgIm5zLWh1Z28taW1wOi9Vc2Vycy9tYXRlamx1a2FzaWsvTGlicmFyeS9DYWNoZXMvaHVnb19jYWNoZS9tb2R1bGVzL2ZpbGVjYWNoZS9tb2R1bGVzL3BrZy9tb2QvZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcEB2NS4zLjcraW5jb21wYXRpYmxlL2pzL3NyYy91dGlsL2luZGV4LmpzIiwgIm5zLWh1Z28taW1wOi9Vc2Vycy9tYXRlamx1a2FzaWsvTGlicmFyeS9DYWNoZXMvaHVnb19jYWNoZS9tb2R1bGVzL2ZpbGVjYWNoZS9tb2R1bGVzL3BrZy9tb2QvZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcEB2NS4zLjcraW5jb21wYXRpYmxlL2pzL3NyYy9kb20vZXZlbnQtaGFuZGxlci5qcyIsICJucy1odWdvLWltcDovVXNlcnMvbWF0ZWpsdWthc2lrL0xpYnJhcnkvQ2FjaGVzL2h1Z29fY2FjaGUvbW9kdWxlcy9maWxlY2FjaGUvbW9kdWxlcy9wa2cvbW9kL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXBAdjUuMy43K2luY29tcGF0aWJsZS9qcy9zcmMvZG9tL21hbmlwdWxhdG9yLmpzIiwgIm5zLWh1Z28taW1wOi9Vc2Vycy9tYXRlamx1a2FzaWsvTGlicmFyeS9DYWNoZXMvaHVnb19jYWNoZS9tb2R1bGVzL2ZpbGVjYWNoZS9tb2R1bGVzL3BrZy9tb2QvZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcEB2NS4zLjcraW5jb21wYXRpYmxlL2pzL3NyYy91dGlsL2NvbmZpZy5qcyIsICJucy1odWdvLWltcDovVXNlcnMvbWF0ZWpsdWthc2lrL0xpYnJhcnkvQ2FjaGVzL2h1Z29fY2FjaGUvbW9kdWxlcy9maWxlY2FjaGUvbW9kdWxlcy9wa2cvbW9kL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXBAdjUuMy43K2luY29tcGF0aWJsZS9qcy9zcmMvYmFzZS1jb21wb25lbnQuanMiLCAibnMtaHVnby1pbXA6L1VzZXJzL21hdGVqbHVrYXNpay9MaWJyYXJ5L0NhY2hlcy9odWdvX2NhY2hlL21vZHVsZXMvZmlsZWNhY2hlL21vZHVsZXMvcGtnL21vZC9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwQHY1LjMuNytpbmNvbXBhdGlibGUvanMvc3JjL2RvbS9zZWxlY3Rvci1lbmdpbmUuanMiLCAibnMtaHVnby1pbXA6L1VzZXJzL21hdGVqbHVrYXNpay9MaWJyYXJ5L0NhY2hlcy9odWdvX2NhY2hlL21vZHVsZXMvZmlsZWNhY2hlL21vZHVsZXMvcGtnL21vZC9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwQHY1LjMuNytpbmNvbXBhdGlibGUvanMvc3JjL3RhYi5qcyIsICI8c3RkaW4+Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBCb290c3RyYXAgZG9tL2RhdGEuanNcbiAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFpbi9MSUNFTlNFKVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG4vKipcbiAqIENvbnN0YW50c1xuICovXG5cbmNvbnN0IGVsZW1lbnRNYXAgPSBuZXcgTWFwKClcblxuZXhwb3J0IGRlZmF1bHQge1xuICBzZXQoZWxlbWVudCwga2V5LCBpbnN0YW5jZSkge1xuICAgIGlmICghZWxlbWVudE1hcC5oYXMoZWxlbWVudCkpIHtcbiAgICAgIGVsZW1lbnRNYXAuc2V0KGVsZW1lbnQsIG5ldyBNYXAoKSlcbiAgICB9XG5cbiAgICBjb25zdCBpbnN0YW5jZU1hcCA9IGVsZW1lbnRNYXAuZ2V0KGVsZW1lbnQpXG5cbiAgICAvLyBtYWtlIGl0IGNsZWFyIHdlIG9ubHkgd2FudCBvbmUgaW5zdGFuY2UgcGVyIGVsZW1lbnRcbiAgICAvLyBjYW4gYmUgcmVtb3ZlZCBsYXRlciB3aGVuIG11bHRpcGxlIGtleS9pbnN0YW5jZXMgYXJlIGZpbmUgdG8gYmUgdXNlZFxuICAgIGlmICghaW5zdGFuY2VNYXAuaGFzKGtleSkgJiYgaW5zdGFuY2VNYXAuc2l6ZSAhPT0gMCkge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgIGNvbnNvbGUuZXJyb3IoYEJvb3RzdHJhcCBkb2Vzbid0IGFsbG93IG1vcmUgdGhhbiBvbmUgaW5zdGFuY2UgcGVyIGVsZW1lbnQuIEJvdW5kIGluc3RhbmNlOiAke0FycmF5LmZyb20oaW5zdGFuY2VNYXAua2V5cygpKVswXX0uYClcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGluc3RhbmNlTWFwLnNldChrZXksIGluc3RhbmNlKVxuICB9LFxuXG4gIGdldChlbGVtZW50LCBrZXkpIHtcbiAgICBpZiAoZWxlbWVudE1hcC5oYXMoZWxlbWVudCkpIHtcbiAgICAgIHJldHVybiBlbGVtZW50TWFwLmdldChlbGVtZW50KS5nZXQoa2V5KSB8fCBudWxsXG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGxcbiAgfSxcblxuICByZW1vdmUoZWxlbWVudCwga2V5KSB7XG4gICAgaWYgKCFlbGVtZW50TWFwLmhhcyhlbGVtZW50KSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY29uc3QgaW5zdGFuY2VNYXAgPSBlbGVtZW50TWFwLmdldChlbGVtZW50KVxuXG4gICAgaW5zdGFuY2VNYXAuZGVsZXRlKGtleSlcblxuICAgIC8vIGZyZWUgdXAgZWxlbWVudCByZWZlcmVuY2VzIGlmIHRoZXJlIGFyZSBubyBpbnN0YW5jZXMgbGVmdCBmb3IgYW4gZWxlbWVudFxuICAgIGlmIChpbnN0YW5jZU1hcC5zaXplID09PSAwKSB7XG4gICAgICBlbGVtZW50TWFwLmRlbGV0ZShlbGVtZW50KVxuICAgIH1cbiAgfVxufVxuIiwgIi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIEJvb3RzdHJhcCB1dGlsL2luZGV4LmpzXG4gKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21haW4vTElDRU5TRSlcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuY29uc3QgTUFYX1VJRCA9IDFfMDAwXzAwMFxuY29uc3QgTUlMTElTRUNPTkRTX01VTFRJUExJRVIgPSAxMDAwXG5jb25zdCBUUkFOU0lUSU9OX0VORCA9ICd0cmFuc2l0aW9uZW5kJ1xuXG4vKipcbiAqIFByb3Blcmx5IGVzY2FwZSBJRHMgc2VsZWN0b3JzIHRvIGhhbmRsZSB3ZWlyZCBJRHNcbiAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RvclxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuY29uc3QgcGFyc2VTZWxlY3RvciA9IHNlbGVjdG9yID0+IHtcbiAgaWYgKHNlbGVjdG9yICYmIHdpbmRvdy5DU1MgJiYgd2luZG93LkNTUy5lc2NhcGUpIHtcbiAgICAvLyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yIG5lZWRzIGVzY2FwaW5nIHRvIGhhbmRsZSBJRHMgKGh0bWw1KykgY29udGFpbmluZyBmb3IgaW5zdGFuY2UgL1xuICAgIHNlbGVjdG9yID0gc2VsZWN0b3IucmVwbGFjZSgvIyhbXlxcc1wiIyddKykvZywgKG1hdGNoLCBpZCkgPT4gYCMke0NTUy5lc2NhcGUoaWQpfWApXG4gIH1cblxuICByZXR1cm4gc2VsZWN0b3Jcbn1cblxuLy8gU2hvdXQtb3V0IEFuZ3VzIENyb2xsIChodHRwczovL2dvby5nbC9weHdRR3ApXG5jb25zdCB0b1R5cGUgPSBvYmplY3QgPT4ge1xuICBpZiAob2JqZWN0ID09PSBudWxsIHx8IG9iamVjdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIGAke29iamVjdH1gXG4gIH1cblxuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iamVjdCkubWF0Y2goL1xccyhbYS16XSspL2kpWzFdLnRvTG93ZXJDYXNlKClcbn1cblxuLyoqXG4gKiBQdWJsaWMgVXRpbCBBUElcbiAqL1xuXG5jb25zdCBnZXRVSUQgPSBwcmVmaXggPT4ge1xuICBkbyB7XG4gICAgcHJlZml4ICs9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIE1BWF9VSUQpXG4gIH0gd2hpbGUgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHByZWZpeCkpXG5cbiAgcmV0dXJuIHByZWZpeFxufVxuXG5jb25zdCBnZXRUcmFuc2l0aW9uRHVyYXRpb25Gcm9tRWxlbWVudCA9IGVsZW1lbnQgPT4ge1xuICBpZiAoIWVsZW1lbnQpIHtcbiAgICByZXR1cm4gMFxuICB9XG5cbiAgLy8gR2V0IHRyYW5zaXRpb24tZHVyYXRpb24gb2YgdGhlIGVsZW1lbnRcbiAgbGV0IHsgdHJhbnNpdGlvbkR1cmF0aW9uLCB0cmFuc2l0aW9uRGVsYXkgfSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpXG5cbiAgY29uc3QgZmxvYXRUcmFuc2l0aW9uRHVyYXRpb24gPSBOdW1iZXIucGFyc2VGbG9hdCh0cmFuc2l0aW9uRHVyYXRpb24pXG4gIGNvbnN0IGZsb2F0VHJhbnNpdGlvbkRlbGF5ID0gTnVtYmVyLnBhcnNlRmxvYXQodHJhbnNpdGlvbkRlbGF5KVxuXG4gIC8vIFJldHVybiAwIGlmIGVsZW1lbnQgb3IgdHJhbnNpdGlvbiBkdXJhdGlvbiBpcyBub3QgZm91bmRcbiAgaWYgKCFmbG9hdFRyYW5zaXRpb25EdXJhdGlvbiAmJiAhZmxvYXRUcmFuc2l0aW9uRGVsYXkpIHtcbiAgICByZXR1cm4gMFxuICB9XG5cbiAgLy8gSWYgbXVsdGlwbGUgZHVyYXRpb25zIGFyZSBkZWZpbmVkLCB0YWtlIHRoZSBmaXJzdFxuICB0cmFuc2l0aW9uRHVyYXRpb24gPSB0cmFuc2l0aW9uRHVyYXRpb24uc3BsaXQoJywnKVswXVxuICB0cmFuc2l0aW9uRGVsYXkgPSB0cmFuc2l0aW9uRGVsYXkuc3BsaXQoJywnKVswXVxuXG4gIHJldHVybiAoTnVtYmVyLnBhcnNlRmxvYXQodHJhbnNpdGlvbkR1cmF0aW9uKSArIE51bWJlci5wYXJzZUZsb2F0KHRyYW5zaXRpb25EZWxheSkpICogTUlMTElTRUNPTkRTX01VTFRJUExJRVJcbn1cblxuY29uc3QgdHJpZ2dlclRyYW5zaXRpb25FbmQgPSBlbGVtZW50ID0+IHtcbiAgZWxlbWVudC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudChUUkFOU0lUSU9OX0VORCkpXG59XG5cbmNvbnN0IGlzRWxlbWVudCA9IG9iamVjdCA9PiB7XG4gIGlmICghb2JqZWN0IHx8IHR5cGVvZiBvYmplY3QgIT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICBpZiAodHlwZW9mIG9iamVjdC5qcXVlcnkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgb2JqZWN0ID0gb2JqZWN0WzBdXG4gIH1cblxuICByZXR1cm4gdHlwZW9mIG9iamVjdC5ub2RlVHlwZSAhPT0gJ3VuZGVmaW5lZCdcbn1cblxuY29uc3QgZ2V0RWxlbWVudCA9IG9iamVjdCA9PiB7XG4gIC8vIGl0J3MgYSBqUXVlcnkgb2JqZWN0IG9yIGEgbm9kZSBlbGVtZW50XG4gIGlmIChpc0VsZW1lbnQob2JqZWN0KSkge1xuICAgIHJldHVybiBvYmplY3QuanF1ZXJ5ID8gb2JqZWN0WzBdIDogb2JqZWN0XG4gIH1cblxuICBpZiAodHlwZW9mIG9iamVjdCA9PT0gJ3N0cmluZycgJiYgb2JqZWN0Lmxlbmd0aCA+IDApIHtcbiAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihwYXJzZVNlbGVjdG9yKG9iamVjdCkpXG4gIH1cblxuICByZXR1cm4gbnVsbFxufVxuXG5jb25zdCBpc1Zpc2libGUgPSBlbGVtZW50ID0+IHtcbiAgaWYgKCFpc0VsZW1lbnQoZWxlbWVudCkgfHwgZWxlbWVudC5nZXRDbGllbnRSZWN0cygpLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgY29uc3QgZWxlbWVudElzVmlzaWJsZSA9IGdldENvbXB1dGVkU3R5bGUoZWxlbWVudCkuZ2V0UHJvcGVydHlWYWx1ZSgndmlzaWJpbGl0eScpID09PSAndmlzaWJsZSdcbiAgLy8gSGFuZGxlIGBkZXRhaWxzYCBlbGVtZW50IGFzIGl0cyBjb250ZW50IG1heSBmYWxzaWUgYXBwZWFyIHZpc2libGUgd2hlbiBpdCBpcyBjbG9zZWRcbiAgY29uc3QgY2xvc2VkRGV0YWlscyA9IGVsZW1lbnQuY2xvc2VzdCgnZGV0YWlsczpub3QoW29wZW5dKScpXG5cbiAgaWYgKCFjbG9zZWREZXRhaWxzKSB7XG4gICAgcmV0dXJuIGVsZW1lbnRJc1Zpc2libGVcbiAgfVxuXG4gIGlmIChjbG9zZWREZXRhaWxzICE9PSBlbGVtZW50KSB7XG4gICAgY29uc3Qgc3VtbWFyeSA9IGVsZW1lbnQuY2xvc2VzdCgnc3VtbWFyeScpXG4gICAgaWYgKHN1bW1hcnkgJiYgc3VtbWFyeS5wYXJlbnROb2RlICE9PSBjbG9zZWREZXRhaWxzKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICBpZiAoc3VtbWFyeSA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGVsZW1lbnRJc1Zpc2libGVcbn1cblxuY29uc3QgaXNEaXNhYmxlZCA9IGVsZW1lbnQgPT4ge1xuICBpZiAoIWVsZW1lbnQgfHwgZWxlbWVudC5ub2RlVHlwZSAhPT0gTm9kZS5FTEVNRU5UX05PREUpIHtcbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbiAgaWYgKGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdkaXNhYmxlZCcpKSB7XG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIGlmICh0eXBlb2YgZWxlbWVudC5kaXNhYmxlZCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4gZWxlbWVudC5kaXNhYmxlZFxuICB9XG5cbiAgcmV0dXJuIGVsZW1lbnQuaGFzQXR0cmlidXRlKCdkaXNhYmxlZCcpICYmIGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkaXNhYmxlZCcpICE9PSAnZmFsc2UnXG59XG5cbmNvbnN0IGZpbmRTaGFkb3dSb290ID0gZWxlbWVudCA9PiB7XG4gIGlmICghZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmF0dGFjaFNoYWRvdykge1xuICAgIHJldHVybiBudWxsXG4gIH1cblxuICAvLyBDYW4gZmluZCB0aGUgc2hhZG93IHJvb3Qgb3RoZXJ3aXNlIGl0J2xsIHJldHVybiB0aGUgZG9jdW1lbnRcbiAgaWYgKHR5cGVvZiBlbGVtZW50LmdldFJvb3ROb2RlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY29uc3Qgcm9vdCA9IGVsZW1lbnQuZ2V0Um9vdE5vZGUoKVxuICAgIHJldHVybiByb290IGluc3RhbmNlb2YgU2hhZG93Um9vdCA/IHJvb3QgOiBudWxsXG4gIH1cblxuICBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIFNoYWRvd1Jvb3QpIHtcbiAgICByZXR1cm4gZWxlbWVudFxuICB9XG5cbiAgLy8gd2hlbiB3ZSBkb24ndCBmaW5kIGEgc2hhZG93IHJvb3RcbiAgaWYgKCFlbGVtZW50LnBhcmVudE5vZGUpIHtcbiAgICByZXR1cm4gbnVsbFxuICB9XG5cbiAgcmV0dXJuIGZpbmRTaGFkb3dSb290KGVsZW1lbnQucGFyZW50Tm9kZSlcbn1cblxuY29uc3Qgbm9vcCA9ICgpID0+IHt9XG5cbi8qKlxuICogVHJpY2sgdG8gcmVzdGFydCBhbiBlbGVtZW50J3MgYW5pbWF0aW9uXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogQHJldHVybiB2b2lkXG4gKlxuICogQHNlZSBodHRwczovL3d3dy5oYXJyeXRoZW8uY29tL2Jsb2cvMjAyMS8wMi9yZXN0YXJ0LWEtY3NzLWFuaW1hdGlvbi13aXRoLWphdmFzY3JpcHQvI3Jlc3RhcnRpbmctYS1jc3MtYW5pbWF0aW9uXG4gKi9cbmNvbnN0IHJlZmxvdyA9IGVsZW1lbnQgPT4ge1xuICBlbGVtZW50Lm9mZnNldEhlaWdodCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC1leHByZXNzaW9uc1xufVxuXG5jb25zdCBnZXRqUXVlcnkgPSAoKSA9PiB7XG4gIGlmICh3aW5kb3cualF1ZXJ5ICYmICFkb2N1bWVudC5ib2R5Lmhhc0F0dHJpYnV0ZSgnZGF0YS1icy1uby1qcXVlcnknKSkge1xuICAgIHJldHVybiB3aW5kb3cualF1ZXJ5XG4gIH1cblxuICByZXR1cm4gbnVsbFxufVxuXG5jb25zdCBET01Db250ZW50TG9hZGVkQ2FsbGJhY2tzID0gW11cblxuY29uc3Qgb25ET01Db250ZW50TG9hZGVkID0gY2FsbGJhY2sgPT4ge1xuICBpZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gJ2xvYWRpbmcnKSB7XG4gICAgLy8gYWRkIGxpc3RlbmVyIG9uIHRoZSBmaXJzdCBjYWxsIHdoZW4gdGhlIGRvY3VtZW50IGlzIGluIGxvYWRpbmcgc3RhdGVcbiAgICBpZiAoIURPTUNvbnRlbnRMb2FkZWRDYWxsYmFja3MubGVuZ3RoKSB7XG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IGNhbGxiYWNrIG9mIERPTUNvbnRlbnRMb2FkZWRDYWxsYmFja3MpIHtcbiAgICAgICAgICBjYWxsYmFjaygpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuXG4gICAgRE9NQ29udGVudExvYWRlZENhbGxiYWNrcy5wdXNoKGNhbGxiYWNrKVxuICB9IGVsc2Uge1xuICAgIGNhbGxiYWNrKClcbiAgfVxufVxuXG5jb25zdCBpc1JUTCA9ICgpID0+IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5kaXIgPT09ICdydGwnXG5cbmNvbnN0IGRlZmluZUpRdWVyeVBsdWdpbiA9IHBsdWdpbiA9PiB7XG4gIG9uRE9NQ29udGVudExvYWRlZCgoKSA9PiB7XG4gICAgY29uc3QgJCA9IGdldGpRdWVyeSgpXG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgaWYgKCQpIHtcbiAgICAgIGNvbnN0IG5hbWUgPSBwbHVnaW4uTkFNRVxuICAgICAgY29uc3QgSlFVRVJZX05PX0NPTkZMSUNUID0gJC5mbltuYW1lXVxuICAgICAgJC5mbltuYW1lXSA9IHBsdWdpbi5qUXVlcnlJbnRlcmZhY2VcbiAgICAgICQuZm5bbmFtZV0uQ29uc3RydWN0b3IgPSBwbHVnaW5cbiAgICAgICQuZm5bbmFtZV0ubm9Db25mbGljdCA9ICgpID0+IHtcbiAgICAgICAgJC5mbltuYW1lXSA9IEpRVUVSWV9OT19DT05GTElDVFxuICAgICAgICByZXR1cm4gcGx1Z2luLmpRdWVyeUludGVyZmFjZVxuICAgICAgfVxuICAgIH1cbiAgfSlcbn1cblxuY29uc3QgZXhlY3V0ZSA9IChwb3NzaWJsZUNhbGxiYWNrLCBhcmdzID0gW10sIGRlZmF1bHRWYWx1ZSA9IHBvc3NpYmxlQ2FsbGJhY2spID0+IHtcbiAgcmV0dXJuIHR5cGVvZiBwb3NzaWJsZUNhbGxiYWNrID09PSAnZnVuY3Rpb24nID8gcG9zc2libGVDYWxsYmFjay5jYWxsKC4uLmFyZ3MpIDogZGVmYXVsdFZhbHVlXG59XG5cbmNvbnN0IGV4ZWN1dGVBZnRlclRyYW5zaXRpb24gPSAoY2FsbGJhY2ssIHRyYW5zaXRpb25FbGVtZW50LCB3YWl0Rm9yVHJhbnNpdGlvbiA9IHRydWUpID0+IHtcbiAgaWYgKCF3YWl0Rm9yVHJhbnNpdGlvbikge1xuICAgIGV4ZWN1dGUoY2FsbGJhY2spXG4gICAgcmV0dXJuXG4gIH1cblxuICBjb25zdCBkdXJhdGlvblBhZGRpbmcgPSA1XG4gIGNvbnN0IGVtdWxhdGVkRHVyYXRpb24gPSBnZXRUcmFuc2l0aW9uRHVyYXRpb25Gcm9tRWxlbWVudCh0cmFuc2l0aW9uRWxlbWVudCkgKyBkdXJhdGlvblBhZGRpbmdcblxuICBsZXQgY2FsbGVkID0gZmFsc2VcblxuICBjb25zdCBoYW5kbGVyID0gKHsgdGFyZ2V0IH0pID0+IHtcbiAgICBpZiAodGFyZ2V0ICE9PSB0cmFuc2l0aW9uRWxlbWVudCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY2FsbGVkID0gdHJ1ZVxuICAgIHRyYW5zaXRpb25FbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoVFJBTlNJVElPTl9FTkQsIGhhbmRsZXIpXG4gICAgZXhlY3V0ZShjYWxsYmFjaylcbiAgfVxuXG4gIHRyYW5zaXRpb25FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoVFJBTlNJVElPTl9FTkQsIGhhbmRsZXIpXG4gIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIGlmICghY2FsbGVkKSB7XG4gICAgICB0cmlnZ2VyVHJhbnNpdGlvbkVuZCh0cmFuc2l0aW9uRWxlbWVudClcbiAgICB9XG4gIH0sIGVtdWxhdGVkRHVyYXRpb24pXG59XG5cbi8qKlxuICogUmV0dXJuIHRoZSBwcmV2aW91cy9uZXh0IGVsZW1lbnQgb2YgYSBsaXN0LlxuICpcbiAqIEBwYXJhbSB7YXJyYXl9IGxpc3QgICAgVGhlIGxpc3Qgb2YgZWxlbWVudHNcbiAqIEBwYXJhbSBhY3RpdmVFbGVtZW50ICAgVGhlIGFjdGl2ZSBlbGVtZW50XG4gKiBAcGFyYW0gc2hvdWxkR2V0TmV4dCAgIENob29zZSB0byBnZXQgbmV4dCBvciBwcmV2aW91cyBlbGVtZW50XG4gKiBAcGFyYW0gaXNDeWNsZUFsbG93ZWRcbiAqIEByZXR1cm4ge0VsZW1lbnR8ZWxlbX0gVGhlIHByb3BlciBlbGVtZW50XG4gKi9cbmNvbnN0IGdldE5leHRBY3RpdmVFbGVtZW50ID0gKGxpc3QsIGFjdGl2ZUVsZW1lbnQsIHNob3VsZEdldE5leHQsIGlzQ3ljbGVBbGxvd2VkKSA9PiB7XG4gIGNvbnN0IGxpc3RMZW5ndGggPSBsaXN0Lmxlbmd0aFxuICBsZXQgaW5kZXggPSBsaXN0LmluZGV4T2YoYWN0aXZlRWxlbWVudClcblxuICAvLyBpZiB0aGUgZWxlbWVudCBkb2VzIG5vdCBleGlzdCBpbiB0aGUgbGlzdCByZXR1cm4gYW4gZWxlbWVudFxuICAvLyBkZXBlbmRpbmcgb24gdGhlIGRpcmVjdGlvbiBhbmQgaWYgY3ljbGUgaXMgYWxsb3dlZFxuICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgcmV0dXJuICFzaG91bGRHZXROZXh0ICYmIGlzQ3ljbGVBbGxvd2VkID8gbGlzdFtsaXN0TGVuZ3RoIC0gMV0gOiBsaXN0WzBdXG4gIH1cblxuICBpbmRleCArPSBzaG91bGRHZXROZXh0ID8gMSA6IC0xXG5cbiAgaWYgKGlzQ3ljbGVBbGxvd2VkKSB7XG4gICAgaW5kZXggPSAoaW5kZXggKyBsaXN0TGVuZ3RoKSAlIGxpc3RMZW5ndGhcbiAgfVxuXG4gIHJldHVybiBsaXN0W01hdGgubWF4KDAsIE1hdGgubWluKGluZGV4LCBsaXN0TGVuZ3RoIC0gMSkpXVxufVxuXG5leHBvcnQge1xuICBkZWZpbmVKUXVlcnlQbHVnaW4sXG4gIGV4ZWN1dGUsXG4gIGV4ZWN1dGVBZnRlclRyYW5zaXRpb24sXG4gIGZpbmRTaGFkb3dSb290LFxuICBnZXRFbGVtZW50LFxuICBnZXRqUXVlcnksXG4gIGdldE5leHRBY3RpdmVFbGVtZW50LFxuICBnZXRUcmFuc2l0aW9uRHVyYXRpb25Gcm9tRWxlbWVudCxcbiAgZ2V0VUlELFxuICBpc0Rpc2FibGVkLFxuICBpc0VsZW1lbnQsXG4gIGlzUlRMLFxuICBpc1Zpc2libGUsXG4gIG5vb3AsXG4gIG9uRE9NQ29udGVudExvYWRlZCxcbiAgcGFyc2VTZWxlY3RvcixcbiAgcmVmbG93LFxuICB0cmlnZ2VyVHJhbnNpdGlvbkVuZCxcbiAgdG9UeXBlXG59XG4iLCAiLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQm9vdHN0cmFwIGRvbS9ldmVudC1oYW5kbGVyLmpzXG4gKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21haW4vTElDRU5TRSlcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuaW1wb3J0IHsgZ2V0alF1ZXJ5IH0gZnJvbSAnLi4vdXRpbC9pbmRleC5qcydcblxuLyoqXG4gKiBDb25zdGFudHNcbiAqL1xuXG5jb25zdCBuYW1lc3BhY2VSZWdleCA9IC9bXi5dKig/PVxcLi4qKVxcLnwuKi9cbmNvbnN0IHN0cmlwTmFtZVJlZ2V4ID0gL1xcLi4qL1xuY29uc3Qgc3RyaXBVaWRSZWdleCA9IC86OlxcZCskL1xuY29uc3QgZXZlbnRSZWdpc3RyeSA9IHt9IC8vIEV2ZW50cyBzdG9yYWdlXG5sZXQgdWlkRXZlbnQgPSAxXG5jb25zdCBjdXN0b21FdmVudHMgPSB7XG4gIG1vdXNlZW50ZXI6ICdtb3VzZW92ZXInLFxuICBtb3VzZWxlYXZlOiAnbW91c2VvdXQnXG59XG5cbmNvbnN0IG5hdGl2ZUV2ZW50cyA9IG5ldyBTZXQoW1xuICAnY2xpY2snLFxuICAnZGJsY2xpY2snLFxuICAnbW91c2V1cCcsXG4gICdtb3VzZWRvd24nLFxuICAnY29udGV4dG1lbnUnLFxuICAnbW91c2V3aGVlbCcsXG4gICdET01Nb3VzZVNjcm9sbCcsXG4gICdtb3VzZW92ZXInLFxuICAnbW91c2VvdXQnLFxuICAnbW91c2Vtb3ZlJyxcbiAgJ3NlbGVjdHN0YXJ0JyxcbiAgJ3NlbGVjdGVuZCcsXG4gICdrZXlkb3duJyxcbiAgJ2tleXByZXNzJyxcbiAgJ2tleXVwJyxcbiAgJ29yaWVudGF0aW9uY2hhbmdlJyxcbiAgJ3RvdWNoc3RhcnQnLFxuICAndG91Y2htb3ZlJyxcbiAgJ3RvdWNoZW5kJyxcbiAgJ3RvdWNoY2FuY2VsJyxcbiAgJ3BvaW50ZXJkb3duJyxcbiAgJ3BvaW50ZXJtb3ZlJyxcbiAgJ3BvaW50ZXJ1cCcsXG4gICdwb2ludGVybGVhdmUnLFxuICAncG9pbnRlcmNhbmNlbCcsXG4gICdnZXN0dXJlc3RhcnQnLFxuICAnZ2VzdHVyZWNoYW5nZScsXG4gICdnZXN0dXJlZW5kJyxcbiAgJ2ZvY3VzJyxcbiAgJ2JsdXInLFxuICAnY2hhbmdlJyxcbiAgJ3Jlc2V0JyxcbiAgJ3NlbGVjdCcsXG4gICdzdWJtaXQnLFxuICAnZm9jdXNpbicsXG4gICdmb2N1c291dCcsXG4gICdsb2FkJyxcbiAgJ3VubG9hZCcsXG4gICdiZWZvcmV1bmxvYWQnLFxuICAncmVzaXplJyxcbiAgJ21vdmUnLFxuICAnRE9NQ29udGVudExvYWRlZCcsXG4gICdyZWFkeXN0YXRlY2hhbmdlJyxcbiAgJ2Vycm9yJyxcbiAgJ2Fib3J0JyxcbiAgJ3Njcm9sbCdcbl0pXG5cbi8qKlxuICogUHJpdmF0ZSBtZXRob2RzXG4gKi9cblxuZnVuY3Rpb24gbWFrZUV2ZW50VWlkKGVsZW1lbnQsIHVpZCkge1xuICByZXR1cm4gKHVpZCAmJiBgJHt1aWR9Ojoke3VpZEV2ZW50Kyt9YCkgfHwgZWxlbWVudC51aWRFdmVudCB8fCB1aWRFdmVudCsrXG59XG5cbmZ1bmN0aW9uIGdldEVsZW1lbnRFdmVudHMoZWxlbWVudCkge1xuICBjb25zdCB1aWQgPSBtYWtlRXZlbnRVaWQoZWxlbWVudClcblxuICBlbGVtZW50LnVpZEV2ZW50ID0gdWlkXG4gIGV2ZW50UmVnaXN0cnlbdWlkXSA9IGV2ZW50UmVnaXN0cnlbdWlkXSB8fCB7fVxuXG4gIHJldHVybiBldmVudFJlZ2lzdHJ5W3VpZF1cbn1cblxuZnVuY3Rpb24gYm9vdHN0cmFwSGFuZGxlcihlbGVtZW50LCBmbikge1xuICByZXR1cm4gZnVuY3Rpb24gaGFuZGxlcihldmVudCkge1xuICAgIGh5ZHJhdGVPYmooZXZlbnQsIHsgZGVsZWdhdGVUYXJnZXQ6IGVsZW1lbnQgfSlcblxuICAgIGlmIChoYW5kbGVyLm9uZU9mZikge1xuICAgICAgRXZlbnRIYW5kbGVyLm9mZihlbGVtZW50LCBldmVudC50eXBlLCBmbilcbiAgICB9XG5cbiAgICByZXR1cm4gZm4uYXBwbHkoZWxlbWVudCwgW2V2ZW50XSlcbiAgfVxufVxuXG5mdW5jdGlvbiBib290c3RyYXBEZWxlZ2F0aW9uSGFuZGxlcihlbGVtZW50LCBzZWxlY3RvciwgZm4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGhhbmRsZXIoZXZlbnQpIHtcbiAgICBjb25zdCBkb21FbGVtZW50cyA9IGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcilcblxuICAgIGZvciAobGV0IHsgdGFyZ2V0IH0gPSBldmVudDsgdGFyZ2V0ICYmIHRhcmdldCAhPT0gdGhpczsgdGFyZ2V0ID0gdGFyZ2V0LnBhcmVudE5vZGUpIHtcbiAgICAgIGZvciAoY29uc3QgZG9tRWxlbWVudCBvZiBkb21FbGVtZW50cykge1xuICAgICAgICBpZiAoZG9tRWxlbWVudCAhPT0gdGFyZ2V0KSB7XG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfVxuXG4gICAgICAgIGh5ZHJhdGVPYmooZXZlbnQsIHsgZGVsZWdhdGVUYXJnZXQ6IHRhcmdldCB9KVxuXG4gICAgICAgIGlmIChoYW5kbGVyLm9uZU9mZikge1xuICAgICAgICAgIEV2ZW50SGFuZGxlci5vZmYoZWxlbWVudCwgZXZlbnQudHlwZSwgc2VsZWN0b3IsIGZuKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZuLmFwcGx5KHRhcmdldCwgW2V2ZW50XSlcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZmluZEhhbmRsZXIoZXZlbnRzLCBjYWxsYWJsZSwgZGVsZWdhdGlvblNlbGVjdG9yID0gbnVsbCkge1xuICByZXR1cm4gT2JqZWN0LnZhbHVlcyhldmVudHMpXG4gICAgLmZpbmQoZXZlbnQgPT4gZXZlbnQuY2FsbGFibGUgPT09IGNhbGxhYmxlICYmIGV2ZW50LmRlbGVnYXRpb25TZWxlY3RvciA9PT0gZGVsZWdhdGlvblNlbGVjdG9yKVxufVxuXG5mdW5jdGlvbiBub3JtYWxpemVQYXJhbWV0ZXJzKG9yaWdpbmFsVHlwZUV2ZW50LCBoYW5kbGVyLCBkZWxlZ2F0aW9uRnVuY3Rpb24pIHtcbiAgY29uc3QgaXNEZWxlZ2F0ZWQgPSB0eXBlb2YgaGFuZGxlciA9PT0gJ3N0cmluZydcbiAgLy8gVE9ETzogdG9vbHRpcCBwYXNzZXMgYGZhbHNlYCBpbnN0ZWFkIG9mIHNlbGVjdG9yLCBzbyB3ZSBuZWVkIHRvIGNoZWNrXG4gIGNvbnN0IGNhbGxhYmxlID0gaXNEZWxlZ2F0ZWQgPyBkZWxlZ2F0aW9uRnVuY3Rpb24gOiAoaGFuZGxlciB8fCBkZWxlZ2F0aW9uRnVuY3Rpb24pXG4gIGxldCB0eXBlRXZlbnQgPSBnZXRUeXBlRXZlbnQob3JpZ2luYWxUeXBlRXZlbnQpXG5cbiAgaWYgKCFuYXRpdmVFdmVudHMuaGFzKHR5cGVFdmVudCkpIHtcbiAgICB0eXBlRXZlbnQgPSBvcmlnaW5hbFR5cGVFdmVudFxuICB9XG5cbiAgcmV0dXJuIFtpc0RlbGVnYXRlZCwgY2FsbGFibGUsIHR5cGVFdmVudF1cbn1cblxuZnVuY3Rpb24gYWRkSGFuZGxlcihlbGVtZW50LCBvcmlnaW5hbFR5cGVFdmVudCwgaGFuZGxlciwgZGVsZWdhdGlvbkZ1bmN0aW9uLCBvbmVPZmYpIHtcbiAgaWYgKHR5cGVvZiBvcmlnaW5hbFR5cGVFdmVudCAhPT0gJ3N0cmluZycgfHwgIWVsZW1lbnQpIHtcbiAgICByZXR1cm5cbiAgfVxuXG4gIGxldCBbaXNEZWxlZ2F0ZWQsIGNhbGxhYmxlLCB0eXBlRXZlbnRdID0gbm9ybWFsaXplUGFyYW1ldGVycyhvcmlnaW5hbFR5cGVFdmVudCwgaGFuZGxlciwgZGVsZWdhdGlvbkZ1bmN0aW9uKVxuXG4gIC8vIGluIGNhc2Ugb2YgbW91c2VlbnRlciBvciBtb3VzZWxlYXZlIHdyYXAgdGhlIGhhbmRsZXIgd2l0aGluIGEgZnVuY3Rpb24gdGhhdCBjaGVja3MgZm9yIGl0cyBET00gcG9zaXRpb25cbiAgLy8gdGhpcyBwcmV2ZW50cyB0aGUgaGFuZGxlciBmcm9tIGJlaW5nIGRpc3BhdGNoZWQgdGhlIHNhbWUgd2F5IGFzIG1vdXNlb3ZlciBvciBtb3VzZW91dCBkb2VzXG4gIGlmIChvcmlnaW5hbFR5cGVFdmVudCBpbiBjdXN0b21FdmVudHMpIHtcbiAgICBjb25zdCB3cmFwRnVuY3Rpb24gPSBmbiA9PiB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIGlmICghZXZlbnQucmVsYXRlZFRhcmdldCB8fCAoZXZlbnQucmVsYXRlZFRhcmdldCAhPT0gZXZlbnQuZGVsZWdhdGVUYXJnZXQgJiYgIWV2ZW50LmRlbGVnYXRlVGFyZ2V0LmNvbnRhaW5zKGV2ZW50LnJlbGF0ZWRUYXJnZXQpKSkge1xuICAgICAgICAgIHJldHVybiBmbi5jYWxsKHRoaXMsIGV2ZW50KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgY2FsbGFibGUgPSB3cmFwRnVuY3Rpb24oY2FsbGFibGUpXG4gIH1cblxuICBjb25zdCBldmVudHMgPSBnZXRFbGVtZW50RXZlbnRzKGVsZW1lbnQpXG4gIGNvbnN0IGhhbmRsZXJzID0gZXZlbnRzW3R5cGVFdmVudF0gfHwgKGV2ZW50c1t0eXBlRXZlbnRdID0ge30pXG4gIGNvbnN0IHByZXZpb3VzRnVuY3Rpb24gPSBmaW5kSGFuZGxlcihoYW5kbGVycywgY2FsbGFibGUsIGlzRGVsZWdhdGVkID8gaGFuZGxlciA6IG51bGwpXG5cbiAgaWYgKHByZXZpb3VzRnVuY3Rpb24pIHtcbiAgICBwcmV2aW91c0Z1bmN0aW9uLm9uZU9mZiA9IHByZXZpb3VzRnVuY3Rpb24ub25lT2ZmICYmIG9uZU9mZlxuXG4gICAgcmV0dXJuXG4gIH1cblxuICBjb25zdCB1aWQgPSBtYWtlRXZlbnRVaWQoY2FsbGFibGUsIG9yaWdpbmFsVHlwZUV2ZW50LnJlcGxhY2UobmFtZXNwYWNlUmVnZXgsICcnKSlcbiAgY29uc3QgZm4gPSBpc0RlbGVnYXRlZCA/XG4gICAgYm9vdHN0cmFwRGVsZWdhdGlvbkhhbmRsZXIoZWxlbWVudCwgaGFuZGxlciwgY2FsbGFibGUpIDpcbiAgICBib290c3RyYXBIYW5kbGVyKGVsZW1lbnQsIGNhbGxhYmxlKVxuXG4gIGZuLmRlbGVnYXRpb25TZWxlY3RvciA9IGlzRGVsZWdhdGVkID8gaGFuZGxlciA6IG51bGxcbiAgZm4uY2FsbGFibGUgPSBjYWxsYWJsZVxuICBmbi5vbmVPZmYgPSBvbmVPZmZcbiAgZm4udWlkRXZlbnQgPSB1aWRcbiAgaGFuZGxlcnNbdWlkXSA9IGZuXG5cbiAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKHR5cGVFdmVudCwgZm4sIGlzRGVsZWdhdGVkKVxufVxuXG5mdW5jdGlvbiByZW1vdmVIYW5kbGVyKGVsZW1lbnQsIGV2ZW50cywgdHlwZUV2ZW50LCBoYW5kbGVyLCBkZWxlZ2F0aW9uU2VsZWN0b3IpIHtcbiAgY29uc3QgZm4gPSBmaW5kSGFuZGxlcihldmVudHNbdHlwZUV2ZW50XSwgaGFuZGxlciwgZGVsZWdhdGlvblNlbGVjdG9yKVxuXG4gIGlmICghZm4pIHtcbiAgICByZXR1cm5cbiAgfVxuXG4gIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlRXZlbnQsIGZuLCBCb29sZWFuKGRlbGVnYXRpb25TZWxlY3RvcikpXG4gIGRlbGV0ZSBldmVudHNbdHlwZUV2ZW50XVtmbi51aWRFdmVudF1cbn1cblxuZnVuY3Rpb24gcmVtb3ZlTmFtZXNwYWNlZEhhbmRsZXJzKGVsZW1lbnQsIGV2ZW50cywgdHlwZUV2ZW50LCBuYW1lc3BhY2UpIHtcbiAgY29uc3Qgc3RvcmVFbGVtZW50RXZlbnQgPSBldmVudHNbdHlwZUV2ZW50XSB8fCB7fVxuXG4gIGZvciAoY29uc3QgW2hhbmRsZXJLZXksIGV2ZW50XSBvZiBPYmplY3QuZW50cmllcyhzdG9yZUVsZW1lbnRFdmVudCkpIHtcbiAgICBpZiAoaGFuZGxlcktleS5pbmNsdWRlcyhuYW1lc3BhY2UpKSB7XG4gICAgICByZW1vdmVIYW5kbGVyKGVsZW1lbnQsIGV2ZW50cywgdHlwZUV2ZW50LCBldmVudC5jYWxsYWJsZSwgZXZlbnQuZGVsZWdhdGlvblNlbGVjdG9yKVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRUeXBlRXZlbnQoZXZlbnQpIHtcbiAgLy8gYWxsb3cgdG8gZ2V0IHRoZSBuYXRpdmUgZXZlbnRzIGZyb20gbmFtZXNwYWNlZCBldmVudHMgKCdjbGljay5icy5idXR0b24nIC0tPiAnY2xpY2snKVxuICBldmVudCA9IGV2ZW50LnJlcGxhY2Uoc3RyaXBOYW1lUmVnZXgsICcnKVxuICByZXR1cm4gY3VzdG9tRXZlbnRzW2V2ZW50XSB8fCBldmVudFxufVxuXG5jb25zdCBFdmVudEhhbmRsZXIgPSB7XG4gIG9uKGVsZW1lbnQsIGV2ZW50LCBoYW5kbGVyLCBkZWxlZ2F0aW9uRnVuY3Rpb24pIHtcbiAgICBhZGRIYW5kbGVyKGVsZW1lbnQsIGV2ZW50LCBoYW5kbGVyLCBkZWxlZ2F0aW9uRnVuY3Rpb24sIGZhbHNlKVxuICB9LFxuXG4gIG9uZShlbGVtZW50LCBldmVudCwgaGFuZGxlciwgZGVsZWdhdGlvbkZ1bmN0aW9uKSB7XG4gICAgYWRkSGFuZGxlcihlbGVtZW50LCBldmVudCwgaGFuZGxlciwgZGVsZWdhdGlvbkZ1bmN0aW9uLCB0cnVlKVxuICB9LFxuXG4gIG9mZihlbGVtZW50LCBvcmlnaW5hbFR5cGVFdmVudCwgaGFuZGxlciwgZGVsZWdhdGlvbkZ1bmN0aW9uKSB7XG4gICAgaWYgKHR5cGVvZiBvcmlnaW5hbFR5cGVFdmVudCAhPT0gJ3N0cmluZycgfHwgIWVsZW1lbnQpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGNvbnN0IFtpc0RlbGVnYXRlZCwgY2FsbGFibGUsIHR5cGVFdmVudF0gPSBub3JtYWxpemVQYXJhbWV0ZXJzKG9yaWdpbmFsVHlwZUV2ZW50LCBoYW5kbGVyLCBkZWxlZ2F0aW9uRnVuY3Rpb24pXG4gICAgY29uc3QgaW5OYW1lc3BhY2UgPSB0eXBlRXZlbnQgIT09IG9yaWdpbmFsVHlwZUV2ZW50XG4gICAgY29uc3QgZXZlbnRzID0gZ2V0RWxlbWVudEV2ZW50cyhlbGVtZW50KVxuICAgIGNvbnN0IHN0b3JlRWxlbWVudEV2ZW50ID0gZXZlbnRzW3R5cGVFdmVudF0gfHwge31cbiAgICBjb25zdCBpc05hbWVzcGFjZSA9IG9yaWdpbmFsVHlwZUV2ZW50LnN0YXJ0c1dpdGgoJy4nKVxuXG4gICAgaWYgKHR5cGVvZiBjYWxsYWJsZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIC8vIFNpbXBsZXN0IGNhc2U6IGhhbmRsZXIgaXMgcGFzc2VkLCByZW1vdmUgdGhhdCBsaXN0ZW5lciBPTkxZLlxuICAgICAgaWYgKCFPYmplY3Qua2V5cyhzdG9yZUVsZW1lbnRFdmVudCkubGVuZ3RoKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICByZW1vdmVIYW5kbGVyKGVsZW1lbnQsIGV2ZW50cywgdHlwZUV2ZW50LCBjYWxsYWJsZSwgaXNEZWxlZ2F0ZWQgPyBoYW5kbGVyIDogbnVsbClcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGlmIChpc05hbWVzcGFjZSkge1xuICAgICAgZm9yIChjb25zdCBlbGVtZW50RXZlbnQgb2YgT2JqZWN0LmtleXMoZXZlbnRzKSkge1xuICAgICAgICByZW1vdmVOYW1lc3BhY2VkSGFuZGxlcnMoZWxlbWVudCwgZXZlbnRzLCBlbGVtZW50RXZlbnQsIG9yaWdpbmFsVHlwZUV2ZW50LnNsaWNlKDEpKVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAoY29uc3QgW2tleUhhbmRsZXJzLCBldmVudF0gb2YgT2JqZWN0LmVudHJpZXMoc3RvcmVFbGVtZW50RXZlbnQpKSB7XG4gICAgICBjb25zdCBoYW5kbGVyS2V5ID0ga2V5SGFuZGxlcnMucmVwbGFjZShzdHJpcFVpZFJlZ2V4LCAnJylcblxuICAgICAgaWYgKCFpbk5hbWVzcGFjZSB8fCBvcmlnaW5hbFR5cGVFdmVudC5pbmNsdWRlcyhoYW5kbGVyS2V5KSkge1xuICAgICAgICByZW1vdmVIYW5kbGVyKGVsZW1lbnQsIGV2ZW50cywgdHlwZUV2ZW50LCBldmVudC5jYWxsYWJsZSwgZXZlbnQuZGVsZWdhdGlvblNlbGVjdG9yKVxuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICB0cmlnZ2VyKGVsZW1lbnQsIGV2ZW50LCBhcmdzKSB7XG4gICAgaWYgKHR5cGVvZiBldmVudCAhPT0gJ3N0cmluZycgfHwgIWVsZW1lbnQpIHtcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuXG4gICAgY29uc3QgJCA9IGdldGpRdWVyeSgpXG4gICAgY29uc3QgdHlwZUV2ZW50ID0gZ2V0VHlwZUV2ZW50KGV2ZW50KVxuICAgIGNvbnN0IGluTmFtZXNwYWNlID0gZXZlbnQgIT09IHR5cGVFdmVudFxuXG4gICAgbGV0IGpRdWVyeUV2ZW50ID0gbnVsbFxuICAgIGxldCBidWJibGVzID0gdHJ1ZVxuICAgIGxldCBuYXRpdmVEaXNwYXRjaCA9IHRydWVcbiAgICBsZXQgZGVmYXVsdFByZXZlbnRlZCA9IGZhbHNlXG5cbiAgICBpZiAoaW5OYW1lc3BhY2UgJiYgJCkge1xuICAgICAgalF1ZXJ5RXZlbnQgPSAkLkV2ZW50KGV2ZW50LCBhcmdzKVxuXG4gICAgICAkKGVsZW1lbnQpLnRyaWdnZXIoalF1ZXJ5RXZlbnQpXG4gICAgICBidWJibGVzID0gIWpRdWVyeUV2ZW50LmlzUHJvcGFnYXRpb25TdG9wcGVkKClcbiAgICAgIG5hdGl2ZURpc3BhdGNoID0gIWpRdWVyeUV2ZW50LmlzSW1tZWRpYXRlUHJvcGFnYXRpb25TdG9wcGVkKClcbiAgICAgIGRlZmF1bHRQcmV2ZW50ZWQgPSBqUXVlcnlFdmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQoKVxuICAgIH1cblxuICAgIGNvbnN0IGV2dCA9IGh5ZHJhdGVPYmoobmV3IEV2ZW50KGV2ZW50LCB7IGJ1YmJsZXMsIGNhbmNlbGFibGU6IHRydWUgfSksIGFyZ3MpXG5cbiAgICBpZiAoZGVmYXVsdFByZXZlbnRlZCkge1xuICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KClcbiAgICB9XG5cbiAgICBpZiAobmF0aXZlRGlzcGF0Y2gpIHtcbiAgICAgIGVsZW1lbnQuZGlzcGF0Y2hFdmVudChldnQpXG4gICAgfVxuXG4gICAgaWYgKGV2dC5kZWZhdWx0UHJldmVudGVkICYmIGpRdWVyeUV2ZW50KSB7XG4gICAgICBqUXVlcnlFdmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgfVxuXG4gICAgcmV0dXJuIGV2dFxuICB9XG59XG5cbmZ1bmN0aW9uIGh5ZHJhdGVPYmoob2JqLCBtZXRhID0ge30pIHtcbiAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMobWV0YSkpIHtcbiAgICB0cnkge1xuICAgICAgb2JqW2tleV0gPSB2YWx1ZVxuICAgIH0gY2F0Y2gge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgZ2V0KCkge1xuICAgICAgICAgIHJldHVybiB2YWx1ZVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBvYmpcbn1cblxuZXhwb3J0IGRlZmF1bHQgRXZlbnRIYW5kbGVyXG4iLCAiLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQm9vdHN0cmFwIGRvbS9tYW5pcHVsYXRvci5qc1xuICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYWluL0xJQ0VOU0UpXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZURhdGEodmFsdWUpIHtcbiAgaWYgKHZhbHVlID09PSAndHJ1ZScpIHtcbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbiAgaWYgKHZhbHVlID09PSAnZmFsc2UnKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICBpZiAodmFsdWUgPT09IE51bWJlcih2YWx1ZSkudG9TdHJpbmcoKSkge1xuICAgIHJldHVybiBOdW1iZXIodmFsdWUpXG4gIH1cblxuICBpZiAodmFsdWUgPT09ICcnIHx8IHZhbHVlID09PSAnbnVsbCcpIHtcbiAgICByZXR1cm4gbnVsbFxuICB9XG5cbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gdmFsdWVcbiAgfVxuXG4gIHRyeSB7XG4gICAgcmV0dXJuIEpTT04ucGFyc2UoZGVjb2RlVVJJQ29tcG9uZW50KHZhbHVlKSlcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIHZhbHVlXG4gIH1cbn1cblxuZnVuY3Rpb24gbm9ybWFsaXplRGF0YUtleShrZXkpIHtcbiAgcmV0dXJuIGtleS5yZXBsYWNlKC9bQS1aXS9nLCBjaHIgPT4gYC0ke2Noci50b0xvd2VyQ2FzZSgpfWApXG59XG5cbmNvbnN0IE1hbmlwdWxhdG9yID0ge1xuICBzZXREYXRhQXR0cmlidXRlKGVsZW1lbnQsIGtleSwgdmFsdWUpIHtcbiAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShgZGF0YS1icy0ke25vcm1hbGl6ZURhdGFLZXkoa2V5KX1gLCB2YWx1ZSlcbiAgfSxcblxuICByZW1vdmVEYXRhQXR0cmlidXRlKGVsZW1lbnQsIGtleSkge1xuICAgIGVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKGBkYXRhLWJzLSR7bm9ybWFsaXplRGF0YUtleShrZXkpfWApXG4gIH0sXG5cbiAgZ2V0RGF0YUF0dHJpYnV0ZXMoZWxlbWVudCkge1xuICAgIGlmICghZWxlbWVudCkge1xuICAgICAgcmV0dXJuIHt9XG4gICAgfVxuXG4gICAgY29uc3QgYXR0cmlidXRlcyA9IHt9XG4gICAgY29uc3QgYnNLZXlzID0gT2JqZWN0LmtleXMoZWxlbWVudC5kYXRhc2V0KS5maWx0ZXIoa2V5ID0+IGtleS5zdGFydHNXaXRoKCdicycpICYmICFrZXkuc3RhcnRzV2l0aCgnYnNDb25maWcnKSlcblxuICAgIGZvciAoY29uc3Qga2V5IG9mIGJzS2V5cykge1xuICAgICAgbGV0IHB1cmVLZXkgPSBrZXkucmVwbGFjZSgvXmJzLywgJycpXG4gICAgICBwdXJlS2V5ID0gcHVyZUtleS5jaGFyQXQoMCkudG9Mb3dlckNhc2UoKSArIHB1cmVLZXkuc2xpY2UoMSlcbiAgICAgIGF0dHJpYnV0ZXNbcHVyZUtleV0gPSBub3JtYWxpemVEYXRhKGVsZW1lbnQuZGF0YXNldFtrZXldKVxuICAgIH1cblxuICAgIHJldHVybiBhdHRyaWJ1dGVzXG4gIH0sXG5cbiAgZ2V0RGF0YUF0dHJpYnV0ZShlbGVtZW50LCBrZXkpIHtcbiAgICByZXR1cm4gbm9ybWFsaXplRGF0YShlbGVtZW50LmdldEF0dHJpYnV0ZShgZGF0YS1icy0ke25vcm1hbGl6ZURhdGFLZXkoa2V5KX1gKSlcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNYW5pcHVsYXRvclxuIiwgIi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIEJvb3RzdHJhcCB1dGlsL2NvbmZpZy5qc1xuICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYWluL0xJQ0VOU0UpXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbmltcG9ydCBNYW5pcHVsYXRvciBmcm9tICcuLi9kb20vbWFuaXB1bGF0b3IuanMnXG5pbXBvcnQgeyBpc0VsZW1lbnQsIHRvVHlwZSB9IGZyb20gJy4vaW5kZXguanMnXG5cbi8qKlxuICogQ2xhc3MgZGVmaW5pdGlvblxuICovXG5cbmNsYXNzIENvbmZpZyB7XG4gIC8vIEdldHRlcnNcbiAgc3RhdGljIGdldCBEZWZhdWx0KCkge1xuICAgIHJldHVybiB7fVxuICB9XG5cbiAgc3RhdGljIGdldCBEZWZhdWx0VHlwZSgpIHtcbiAgICByZXR1cm4ge31cbiAgfVxuXG4gIHN0YXRpYyBnZXQgTkFNRSgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1lvdSBoYXZlIHRvIGltcGxlbWVudCB0aGUgc3RhdGljIG1ldGhvZCBcIk5BTUVcIiwgZm9yIGVhY2ggY29tcG9uZW50IScpXG4gIH1cblxuICBfZ2V0Q29uZmlnKGNvbmZpZykge1xuICAgIGNvbmZpZyA9IHRoaXMuX21lcmdlQ29uZmlnT2JqKGNvbmZpZylcbiAgICBjb25maWcgPSB0aGlzLl9jb25maWdBZnRlck1lcmdlKGNvbmZpZylcbiAgICB0aGlzLl90eXBlQ2hlY2tDb25maWcoY29uZmlnKVxuICAgIHJldHVybiBjb25maWdcbiAgfVxuXG4gIF9jb25maWdBZnRlck1lcmdlKGNvbmZpZykge1xuICAgIHJldHVybiBjb25maWdcbiAgfVxuXG4gIF9tZXJnZUNvbmZpZ09iaihjb25maWcsIGVsZW1lbnQpIHtcbiAgICBjb25zdCBqc29uQ29uZmlnID0gaXNFbGVtZW50KGVsZW1lbnQpID8gTWFuaXB1bGF0b3IuZ2V0RGF0YUF0dHJpYnV0ZShlbGVtZW50LCAnY29uZmlnJykgOiB7fSAvLyB0cnkgdG8gcGFyc2VcblxuICAgIHJldHVybiB7XG4gICAgICAuLi50aGlzLmNvbnN0cnVjdG9yLkRlZmF1bHQsXG4gICAgICAuLi4odHlwZW9mIGpzb25Db25maWcgPT09ICdvYmplY3QnID8ganNvbkNvbmZpZyA6IHt9KSxcbiAgICAgIC4uLihpc0VsZW1lbnQoZWxlbWVudCkgPyBNYW5pcHVsYXRvci5nZXREYXRhQXR0cmlidXRlcyhlbGVtZW50KSA6IHt9KSxcbiAgICAgIC4uLih0eXBlb2YgY29uZmlnID09PSAnb2JqZWN0JyA/IGNvbmZpZyA6IHt9KVxuICAgIH1cbiAgfVxuXG4gIF90eXBlQ2hlY2tDb25maWcoY29uZmlnLCBjb25maWdUeXBlcyA9IHRoaXMuY29uc3RydWN0b3IuRGVmYXVsdFR5cGUpIHtcbiAgICBmb3IgKGNvbnN0IFtwcm9wZXJ0eSwgZXhwZWN0ZWRUeXBlc10gb2YgT2JqZWN0LmVudHJpZXMoY29uZmlnVHlwZXMpKSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IGNvbmZpZ1twcm9wZXJ0eV1cbiAgICAgIGNvbnN0IHZhbHVlVHlwZSA9IGlzRWxlbWVudCh2YWx1ZSkgPyAnZWxlbWVudCcgOiB0b1R5cGUodmFsdWUpXG5cbiAgICAgIGlmICghbmV3IFJlZ0V4cChleHBlY3RlZFR5cGVzKS50ZXN0KHZhbHVlVHlwZSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgICAgICBgJHt0aGlzLmNvbnN0cnVjdG9yLk5BTUUudG9VcHBlckNhc2UoKX06IE9wdGlvbiBcIiR7cHJvcGVydHl9XCIgcHJvdmlkZWQgdHlwZSBcIiR7dmFsdWVUeXBlfVwiIGJ1dCBleHBlY3RlZCB0eXBlIFwiJHtleHBlY3RlZFR5cGVzfVwiLmBcbiAgICAgICAgKVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDb25maWdcbiIsICIvKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBCb290c3RyYXAgYmFzZS1jb21wb25lbnQuanNcbiAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFpbi9MSUNFTlNFKVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG5pbXBvcnQgRGF0YSBmcm9tICcuL2RvbS9kYXRhLmpzJ1xuaW1wb3J0IEV2ZW50SGFuZGxlciBmcm9tICcuL2RvbS9ldmVudC1oYW5kbGVyLmpzJ1xuaW1wb3J0IENvbmZpZyBmcm9tICcuL3V0aWwvY29uZmlnLmpzJ1xuaW1wb3J0IHsgZXhlY3V0ZUFmdGVyVHJhbnNpdGlvbiwgZ2V0RWxlbWVudCB9IGZyb20gJy4vdXRpbC9pbmRleC5qcydcblxuLyoqXG4gKiBDb25zdGFudHNcbiAqL1xuXG5jb25zdCBWRVJTSU9OID0gJzUuMy43J1xuXG4vKipcbiAqIENsYXNzIGRlZmluaXRpb25cbiAqL1xuXG5jbGFzcyBCYXNlQ29tcG9uZW50IGV4dGVuZHMgQ29uZmlnIHtcbiAgY29uc3RydWN0b3IoZWxlbWVudCwgY29uZmlnKSB7XG4gICAgc3VwZXIoKVxuXG4gICAgZWxlbWVudCA9IGdldEVsZW1lbnQoZWxlbWVudClcbiAgICBpZiAoIWVsZW1lbnQpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHRoaXMuX2VsZW1lbnQgPSBlbGVtZW50XG4gICAgdGhpcy5fY29uZmlnID0gdGhpcy5fZ2V0Q29uZmlnKGNvbmZpZylcblxuICAgIERhdGEuc2V0KHRoaXMuX2VsZW1lbnQsIHRoaXMuY29uc3RydWN0b3IuREFUQV9LRVksIHRoaXMpXG4gIH1cblxuICAvLyBQdWJsaWNcbiAgZGlzcG9zZSgpIHtcbiAgICBEYXRhLnJlbW92ZSh0aGlzLl9lbGVtZW50LCB0aGlzLmNvbnN0cnVjdG9yLkRBVEFfS0VZKVxuICAgIEV2ZW50SGFuZGxlci5vZmYodGhpcy5fZWxlbWVudCwgdGhpcy5jb25zdHJ1Y3Rvci5FVkVOVF9LRVkpXG5cbiAgICBmb3IgKGNvbnN0IHByb3BlcnR5TmFtZSBvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0aGlzKSkge1xuICAgICAgdGhpc1twcm9wZXJ0eU5hbWVdID0gbnVsbFxuICAgIH1cbiAgfVxuXG4gIC8vIFByaXZhdGVcbiAgX3F1ZXVlQ2FsbGJhY2soY2FsbGJhY2ssIGVsZW1lbnQsIGlzQW5pbWF0ZWQgPSB0cnVlKSB7XG4gICAgZXhlY3V0ZUFmdGVyVHJhbnNpdGlvbihjYWxsYmFjaywgZWxlbWVudCwgaXNBbmltYXRlZClcbiAgfVxuXG4gIF9nZXRDb25maWcoY29uZmlnKSB7XG4gICAgY29uZmlnID0gdGhpcy5fbWVyZ2VDb25maWdPYmooY29uZmlnLCB0aGlzLl9lbGVtZW50KVxuICAgIGNvbmZpZyA9IHRoaXMuX2NvbmZpZ0FmdGVyTWVyZ2UoY29uZmlnKVxuICAgIHRoaXMuX3R5cGVDaGVja0NvbmZpZyhjb25maWcpXG4gICAgcmV0dXJuIGNvbmZpZ1xuICB9XG5cbiAgLy8gU3RhdGljXG4gIHN0YXRpYyBnZXRJbnN0YW5jZShlbGVtZW50KSB7XG4gICAgcmV0dXJuIERhdGEuZ2V0KGdldEVsZW1lbnQoZWxlbWVudCksIHRoaXMuREFUQV9LRVkpXG4gIH1cblxuICBzdGF0aWMgZ2V0T3JDcmVhdGVJbnN0YW5jZShlbGVtZW50LCBjb25maWcgPSB7fSkge1xuICAgIHJldHVybiB0aGlzLmdldEluc3RhbmNlKGVsZW1lbnQpIHx8IG5ldyB0aGlzKGVsZW1lbnQsIHR5cGVvZiBjb25maWcgPT09ICdvYmplY3QnID8gY29uZmlnIDogbnVsbClcbiAgfVxuXG4gIHN0YXRpYyBnZXQgVkVSU0lPTigpIHtcbiAgICByZXR1cm4gVkVSU0lPTlxuICB9XG5cbiAgc3RhdGljIGdldCBEQVRBX0tFWSgpIHtcbiAgICByZXR1cm4gYGJzLiR7dGhpcy5OQU1FfWBcbiAgfVxuXG4gIHN0YXRpYyBnZXQgRVZFTlRfS0VZKCkge1xuICAgIHJldHVybiBgLiR7dGhpcy5EQVRBX0tFWX1gXG4gIH1cblxuICBzdGF0aWMgZXZlbnROYW1lKG5hbWUpIHtcbiAgICByZXR1cm4gYCR7bmFtZX0ke3RoaXMuRVZFTlRfS0VZfWBcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBCYXNlQ29tcG9uZW50XG4iLCAiLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQm9vdHN0cmFwIGRvbS9zZWxlY3Rvci1lbmdpbmUuanNcbiAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFpbi9MSUNFTlNFKVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG5pbXBvcnQgeyBpc0Rpc2FibGVkLCBpc1Zpc2libGUsIHBhcnNlU2VsZWN0b3IgfSBmcm9tICcuLi91dGlsL2luZGV4LmpzJ1xuXG5jb25zdCBnZXRTZWxlY3RvciA9IGVsZW1lbnQgPT4ge1xuICBsZXQgc2VsZWN0b3IgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1icy10YXJnZXQnKVxuXG4gIGlmICghc2VsZWN0b3IgfHwgc2VsZWN0b3IgPT09ICcjJykge1xuICAgIGxldCBocmVmQXR0cmlidXRlID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2hyZWYnKVxuXG4gICAgLy8gVGhlIG9ubHkgdmFsaWQgY29udGVudCB0aGF0IGNvdWxkIGRvdWJsZSBhcyBhIHNlbGVjdG9yIGFyZSBJRHMgb3IgY2xhc3NlcyxcbiAgICAvLyBzbyBldmVyeXRoaW5nIHN0YXJ0aW5nIHdpdGggYCNgIG9yIGAuYC4gSWYgYSBcInJlYWxcIiBVUkwgaXMgdXNlZCBhcyB0aGUgc2VsZWN0b3IsXG4gICAgLy8gYGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JgIHdpbGwgcmlnaHRmdWxseSBjb21wbGFpbiBpdCBpcyBpbnZhbGlkLlxuICAgIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvaXNzdWVzLzMyMjczXG4gICAgaWYgKCFocmVmQXR0cmlidXRlIHx8ICghaHJlZkF0dHJpYnV0ZS5pbmNsdWRlcygnIycpICYmICFocmVmQXR0cmlidXRlLnN0YXJ0c1dpdGgoJy4nKSkpIHtcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuXG4gICAgLy8gSnVzdCBpbiBjYXNlIHNvbWUgQ01TIHB1dHMgb3V0IGEgZnVsbCBVUkwgd2l0aCB0aGUgYW5jaG9yIGFwcGVuZGVkXG4gICAgaWYgKGhyZWZBdHRyaWJ1dGUuaW5jbHVkZXMoJyMnKSAmJiAhaHJlZkF0dHJpYnV0ZS5zdGFydHNXaXRoKCcjJykpIHtcbiAgICAgIGhyZWZBdHRyaWJ1dGUgPSBgIyR7aHJlZkF0dHJpYnV0ZS5zcGxpdCgnIycpWzFdfWBcbiAgICB9XG5cbiAgICBzZWxlY3RvciA9IGhyZWZBdHRyaWJ1dGUgJiYgaHJlZkF0dHJpYnV0ZSAhPT0gJyMnID8gaHJlZkF0dHJpYnV0ZS50cmltKCkgOiBudWxsXG4gIH1cblxuICByZXR1cm4gc2VsZWN0b3IgPyBzZWxlY3Rvci5zcGxpdCgnLCcpLm1hcChzZWwgPT4gcGFyc2VTZWxlY3RvcihzZWwpKS5qb2luKCcsJykgOiBudWxsXG59XG5cbmNvbnN0IFNlbGVjdG9yRW5naW5lID0ge1xuICBmaW5kKHNlbGVjdG9yLCBlbGVtZW50ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KSB7XG4gICAgcmV0dXJuIFtdLmNvbmNhdCguLi5FbGVtZW50LnByb3RvdHlwZS5xdWVyeVNlbGVjdG9yQWxsLmNhbGwoZWxlbWVudCwgc2VsZWN0b3IpKVxuICB9LFxuXG4gIGZpbmRPbmUoc2VsZWN0b3IsIGVsZW1lbnQgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpIHtcbiAgICByZXR1cm4gRWxlbWVudC5wcm90b3R5cGUucXVlcnlTZWxlY3Rvci5jYWxsKGVsZW1lbnQsIHNlbGVjdG9yKVxuICB9LFxuXG4gIGNoaWxkcmVuKGVsZW1lbnQsIHNlbGVjdG9yKSB7XG4gICAgcmV0dXJuIFtdLmNvbmNhdCguLi5lbGVtZW50LmNoaWxkcmVuKS5maWx0ZXIoY2hpbGQgPT4gY2hpbGQubWF0Y2hlcyhzZWxlY3RvcikpXG4gIH0sXG5cbiAgcGFyZW50cyhlbGVtZW50LCBzZWxlY3Rvcikge1xuICAgIGNvbnN0IHBhcmVudHMgPSBbXVxuICAgIGxldCBhbmNlc3RvciA9IGVsZW1lbnQucGFyZW50Tm9kZS5jbG9zZXN0KHNlbGVjdG9yKVxuXG4gICAgd2hpbGUgKGFuY2VzdG9yKSB7XG4gICAgICBwYXJlbnRzLnB1c2goYW5jZXN0b3IpXG4gICAgICBhbmNlc3RvciA9IGFuY2VzdG9yLnBhcmVudE5vZGUuY2xvc2VzdChzZWxlY3RvcilcbiAgICB9XG5cbiAgICByZXR1cm4gcGFyZW50c1xuICB9LFxuXG4gIHByZXYoZWxlbWVudCwgc2VsZWN0b3IpIHtcbiAgICBsZXQgcHJldmlvdXMgPSBlbGVtZW50LnByZXZpb3VzRWxlbWVudFNpYmxpbmdcblxuICAgIHdoaWxlIChwcmV2aW91cykge1xuICAgICAgaWYgKHByZXZpb3VzLm1hdGNoZXMoc2VsZWN0b3IpKSB7XG4gICAgICAgIHJldHVybiBbcHJldmlvdXNdXG4gICAgICB9XG5cbiAgICAgIHByZXZpb3VzID0gcHJldmlvdXMucHJldmlvdXNFbGVtZW50U2libGluZ1xuICAgIH1cblxuICAgIHJldHVybiBbXVxuICB9LFxuICAvLyBUT0RPOiB0aGlzIGlzIG5vdyB1bnVzZWQ7IHJlbW92ZSBsYXRlciBhbG9uZyB3aXRoIHByZXYoKVxuICBuZXh0KGVsZW1lbnQsIHNlbGVjdG9yKSB7XG4gICAgbGV0IG5leHQgPSBlbGVtZW50Lm5leHRFbGVtZW50U2libGluZ1xuXG4gICAgd2hpbGUgKG5leHQpIHtcbiAgICAgIGlmIChuZXh0Lm1hdGNoZXMoc2VsZWN0b3IpKSB7XG4gICAgICAgIHJldHVybiBbbmV4dF1cbiAgICAgIH1cblxuICAgICAgbmV4dCA9IG5leHQubmV4dEVsZW1lbnRTaWJsaW5nXG4gICAgfVxuXG4gICAgcmV0dXJuIFtdXG4gIH0sXG5cbiAgZm9jdXNhYmxlQ2hpbGRyZW4oZWxlbWVudCkge1xuICAgIGNvbnN0IGZvY3VzYWJsZXMgPSBbXG4gICAgICAnYScsXG4gICAgICAnYnV0dG9uJyxcbiAgICAgICdpbnB1dCcsXG4gICAgICAndGV4dGFyZWEnLFxuICAgICAgJ3NlbGVjdCcsXG4gICAgICAnZGV0YWlscycsXG4gICAgICAnW3RhYmluZGV4XScsXG4gICAgICAnW2NvbnRlbnRlZGl0YWJsZT1cInRydWVcIl0nXG4gICAgXS5tYXAoc2VsZWN0b3IgPT4gYCR7c2VsZWN0b3J9Om5vdChbdGFiaW5kZXhePVwiLVwiXSlgKS5qb2luKCcsJylcblxuICAgIHJldHVybiB0aGlzLmZpbmQoZm9jdXNhYmxlcywgZWxlbWVudCkuZmlsdGVyKGVsID0+ICFpc0Rpc2FibGVkKGVsKSAmJiBpc1Zpc2libGUoZWwpKVxuICB9LFxuXG4gIGdldFNlbGVjdG9yRnJvbUVsZW1lbnQoZWxlbWVudCkge1xuICAgIGNvbnN0IHNlbGVjdG9yID0gZ2V0U2VsZWN0b3IoZWxlbWVudClcblxuICAgIGlmIChzZWxlY3Rvcikge1xuICAgICAgcmV0dXJuIFNlbGVjdG9yRW5naW5lLmZpbmRPbmUoc2VsZWN0b3IpID8gc2VsZWN0b3IgOiBudWxsXG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGxcbiAgfSxcblxuICBnZXRFbGVtZW50RnJvbVNlbGVjdG9yKGVsZW1lbnQpIHtcbiAgICBjb25zdCBzZWxlY3RvciA9IGdldFNlbGVjdG9yKGVsZW1lbnQpXG5cbiAgICByZXR1cm4gc2VsZWN0b3IgPyBTZWxlY3RvckVuZ2luZS5maW5kT25lKHNlbGVjdG9yKSA6IG51bGxcbiAgfSxcblxuICBnZXRNdWx0aXBsZUVsZW1lbnRzRnJvbVNlbGVjdG9yKGVsZW1lbnQpIHtcbiAgICBjb25zdCBzZWxlY3RvciA9IGdldFNlbGVjdG9yKGVsZW1lbnQpXG5cbiAgICByZXR1cm4gc2VsZWN0b3IgPyBTZWxlY3RvckVuZ2luZS5maW5kKHNlbGVjdG9yKSA6IFtdXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2VsZWN0b3JFbmdpbmVcbiIsICIvKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBCb290c3RyYXAgdGFiLmpzXG4gKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21haW4vTElDRU5TRSlcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuaW1wb3J0IEJhc2VDb21wb25lbnQgZnJvbSAnLi9iYXNlLWNvbXBvbmVudC5qcydcbmltcG9ydCBFdmVudEhhbmRsZXIgZnJvbSAnLi9kb20vZXZlbnQtaGFuZGxlci5qcydcbmltcG9ydCBTZWxlY3RvckVuZ2luZSBmcm9tICcuL2RvbS9zZWxlY3Rvci1lbmdpbmUuanMnXG5pbXBvcnQgeyBkZWZpbmVKUXVlcnlQbHVnaW4sIGdldE5leHRBY3RpdmVFbGVtZW50LCBpc0Rpc2FibGVkIH0gZnJvbSAnLi91dGlsL2luZGV4LmpzJ1xuXG4vKipcbiAqIENvbnN0YW50c1xuICovXG5cbmNvbnN0IE5BTUUgPSAndGFiJ1xuY29uc3QgREFUQV9LRVkgPSAnYnMudGFiJ1xuY29uc3QgRVZFTlRfS0VZID0gYC4ke0RBVEFfS0VZfWBcblxuY29uc3QgRVZFTlRfSElERSA9IGBoaWRlJHtFVkVOVF9LRVl9YFxuY29uc3QgRVZFTlRfSElEREVOID0gYGhpZGRlbiR7RVZFTlRfS0VZfWBcbmNvbnN0IEVWRU5UX1NIT1cgPSBgc2hvdyR7RVZFTlRfS0VZfWBcbmNvbnN0IEVWRU5UX1NIT1dOID0gYHNob3duJHtFVkVOVF9LRVl9YFxuY29uc3QgRVZFTlRfQ0xJQ0tfREFUQV9BUEkgPSBgY2xpY2ske0VWRU5UX0tFWX1gXG5jb25zdCBFVkVOVF9LRVlET1dOID0gYGtleWRvd24ke0VWRU5UX0tFWX1gXG5jb25zdCBFVkVOVF9MT0FEX0RBVEFfQVBJID0gYGxvYWQke0VWRU5UX0tFWX1gXG5cbmNvbnN0IEFSUk9XX0xFRlRfS0VZID0gJ0Fycm93TGVmdCdcbmNvbnN0IEFSUk9XX1JJR0hUX0tFWSA9ICdBcnJvd1JpZ2h0J1xuY29uc3QgQVJST1dfVVBfS0VZID0gJ0Fycm93VXAnXG5jb25zdCBBUlJPV19ET1dOX0tFWSA9ICdBcnJvd0Rvd24nXG5jb25zdCBIT01FX0tFWSA9ICdIb21lJ1xuY29uc3QgRU5EX0tFWSA9ICdFbmQnXG5cbmNvbnN0IENMQVNTX05BTUVfQUNUSVZFID0gJ2FjdGl2ZSdcbmNvbnN0IENMQVNTX05BTUVfRkFERSA9ICdmYWRlJ1xuY29uc3QgQ0xBU1NfTkFNRV9TSE9XID0gJ3Nob3cnXG5jb25zdCBDTEFTU19EUk9QRE9XTiA9ICdkcm9wZG93bidcblxuY29uc3QgU0VMRUNUT1JfRFJPUERPV05fVE9HR0xFID0gJy5kcm9wZG93bi10b2dnbGUnXG5jb25zdCBTRUxFQ1RPUl9EUk9QRE9XTl9NRU5VID0gJy5kcm9wZG93bi1tZW51J1xuY29uc3QgTk9UX1NFTEVDVE9SX0RST1BET1dOX1RPR0dMRSA9IGA6bm90KCR7U0VMRUNUT1JfRFJPUERPV05fVE9HR0xFfSlgXG5cbmNvbnN0IFNFTEVDVE9SX1RBQl9QQU5FTCA9ICcubGlzdC1ncm91cCwgLm5hdiwgW3JvbGU9XCJ0YWJsaXN0XCJdJ1xuY29uc3QgU0VMRUNUT1JfT1VURVIgPSAnLm5hdi1pdGVtLCAubGlzdC1ncm91cC1pdGVtJ1xuY29uc3QgU0VMRUNUT1JfSU5ORVIgPSBgLm5hdi1saW5rJHtOT1RfU0VMRUNUT1JfRFJPUERPV05fVE9HR0xFfSwgLmxpc3QtZ3JvdXAtaXRlbSR7Tk9UX1NFTEVDVE9SX0RST1BET1dOX1RPR0dMRX0sIFtyb2xlPVwidGFiXCJdJHtOT1RfU0VMRUNUT1JfRFJPUERPV05fVE9HR0xFfWBcbmNvbnN0IFNFTEVDVE9SX0RBVEFfVE9HR0xFID0gJ1tkYXRhLWJzLXRvZ2dsZT1cInRhYlwiXSwgW2RhdGEtYnMtdG9nZ2xlPVwicGlsbFwiXSwgW2RhdGEtYnMtdG9nZ2xlPVwibGlzdFwiXScgLy8gVE9ETzogY291bGQgb25seSBiZSBgdGFiYCBpbiB2NlxuY29uc3QgU0VMRUNUT1JfSU5ORVJfRUxFTSA9IGAke1NFTEVDVE9SX0lOTkVSfSwgJHtTRUxFQ1RPUl9EQVRBX1RPR0dMRX1gXG5cbmNvbnN0IFNFTEVDVE9SX0RBVEFfVE9HR0xFX0FDVElWRSA9IGAuJHtDTEFTU19OQU1FX0FDVElWRX1bZGF0YS1icy10b2dnbGU9XCJ0YWJcIl0sIC4ke0NMQVNTX05BTUVfQUNUSVZFfVtkYXRhLWJzLXRvZ2dsZT1cInBpbGxcIl0sIC4ke0NMQVNTX05BTUVfQUNUSVZFfVtkYXRhLWJzLXRvZ2dsZT1cImxpc3RcIl1gXG5cbi8qKlxuICogQ2xhc3MgZGVmaW5pdGlvblxuICovXG5cbmNsYXNzIFRhYiBleHRlbmRzIEJhc2VDb21wb25lbnQge1xuICBjb25zdHJ1Y3RvcihlbGVtZW50KSB7XG4gICAgc3VwZXIoZWxlbWVudClcbiAgICB0aGlzLl9wYXJlbnQgPSB0aGlzLl9lbGVtZW50LmNsb3Nlc3QoU0VMRUNUT1JfVEFCX1BBTkVMKVxuXG4gICAgaWYgKCF0aGlzLl9wYXJlbnQpIHtcbiAgICAgIHJldHVyblxuICAgICAgLy8gVE9ETzogc2hvdWxkIHRocm93IGV4Y2VwdGlvbiBpbiB2NlxuICAgICAgLy8gdGhyb3cgbmV3IFR5cGVFcnJvcihgJHtlbGVtZW50Lm91dGVySFRNTH0gaGFzIG5vdCBhIHZhbGlkIHBhcmVudCAke1NFTEVDVE9SX0lOTkVSX0VMRU19YClcbiAgICB9XG5cbiAgICAvLyBTZXQgdXAgaW5pdGlhbCBhcmlhIGF0dHJpYnV0ZXNcbiAgICB0aGlzLl9zZXRJbml0aWFsQXR0cmlidXRlcyh0aGlzLl9wYXJlbnQsIHRoaXMuX2dldENoaWxkcmVuKCkpXG5cbiAgICBFdmVudEhhbmRsZXIub24odGhpcy5fZWxlbWVudCwgRVZFTlRfS0VZRE9XTiwgZXZlbnQgPT4gdGhpcy5fa2V5ZG93bihldmVudCkpXG4gIH1cblxuICAvLyBHZXR0ZXJzXG4gIHN0YXRpYyBnZXQgTkFNRSgpIHtcbiAgICByZXR1cm4gTkFNRVxuICB9XG5cbiAgLy8gUHVibGljXG4gIHNob3coKSB7IC8vIFNob3dzIHRoaXMgZWxlbSBhbmQgZGVhY3RpdmF0ZSB0aGUgYWN0aXZlIHNpYmxpbmcgaWYgZXhpc3RzXG4gICAgY29uc3QgaW5uZXJFbGVtID0gdGhpcy5fZWxlbWVudFxuICAgIGlmICh0aGlzLl9lbGVtSXNBY3RpdmUoaW5uZXJFbGVtKSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgLy8gU2VhcmNoIGZvciBhY3RpdmUgdGFiIG9uIHNhbWUgcGFyZW50IHRvIGRlYWN0aXZhdGUgaXRcbiAgICBjb25zdCBhY3RpdmUgPSB0aGlzLl9nZXRBY3RpdmVFbGVtKClcblxuICAgIGNvbnN0IGhpZGVFdmVudCA9IGFjdGl2ZSA/XG4gICAgICBFdmVudEhhbmRsZXIudHJpZ2dlcihhY3RpdmUsIEVWRU5UX0hJREUsIHsgcmVsYXRlZFRhcmdldDogaW5uZXJFbGVtIH0pIDpcbiAgICAgIG51bGxcblxuICAgIGNvbnN0IHNob3dFdmVudCA9IEV2ZW50SGFuZGxlci50cmlnZ2VyKGlubmVyRWxlbSwgRVZFTlRfU0hPVywgeyByZWxhdGVkVGFyZ2V0OiBhY3RpdmUgfSlcblxuICAgIGlmIChzaG93RXZlbnQuZGVmYXVsdFByZXZlbnRlZCB8fCAoaGlkZUV2ZW50ICYmIGhpZGVFdmVudC5kZWZhdWx0UHJldmVudGVkKSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgdGhpcy5fZGVhY3RpdmF0ZShhY3RpdmUsIGlubmVyRWxlbSlcbiAgICB0aGlzLl9hY3RpdmF0ZShpbm5lckVsZW0sIGFjdGl2ZSlcbiAgfVxuXG4gIC8vIFByaXZhdGVcbiAgX2FjdGl2YXRlKGVsZW1lbnQsIHJlbGF0ZWRFbGVtKSB7XG4gICAgaWYgKCFlbGVtZW50KSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoQ0xBU1NfTkFNRV9BQ1RJVkUpXG5cbiAgICB0aGlzLl9hY3RpdmF0ZShTZWxlY3RvckVuZ2luZS5nZXRFbGVtZW50RnJvbVNlbGVjdG9yKGVsZW1lbnQpKSAvLyBTZWFyY2ggYW5kIGFjdGl2YXRlL3Nob3cgdGhlIHByb3BlciBzZWN0aW9uXG5cbiAgICBjb25zdCBjb21wbGV0ZSA9ICgpID0+IHtcbiAgICAgIGlmIChlbGVtZW50LmdldEF0dHJpYnV0ZSgncm9sZScpICE9PSAndGFiJykge1xuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoQ0xBU1NfTkFNRV9TSE9XKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ3RhYmluZGV4JylcbiAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJywgdHJ1ZSlcbiAgICAgIHRoaXMuX3RvZ2dsZURyb3BEb3duKGVsZW1lbnQsIHRydWUpXG4gICAgICBFdmVudEhhbmRsZXIudHJpZ2dlcihlbGVtZW50LCBFVkVOVF9TSE9XTiwge1xuICAgICAgICByZWxhdGVkVGFyZ2V0OiByZWxhdGVkRWxlbVxuICAgICAgfSlcbiAgICB9XG5cbiAgICB0aGlzLl9xdWV1ZUNhbGxiYWNrKGNvbXBsZXRlLCBlbGVtZW50LCBlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhDTEFTU19OQU1FX0ZBREUpKVxuICB9XG5cbiAgX2RlYWN0aXZhdGUoZWxlbWVudCwgcmVsYXRlZEVsZW0pIHtcbiAgICBpZiAoIWVsZW1lbnQpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShDTEFTU19OQU1FX0FDVElWRSlcbiAgICBlbGVtZW50LmJsdXIoKVxuXG4gICAgdGhpcy5fZGVhY3RpdmF0ZShTZWxlY3RvckVuZ2luZS5nZXRFbGVtZW50RnJvbVNlbGVjdG9yKGVsZW1lbnQpKSAvLyBTZWFyY2ggYW5kIGRlYWN0aXZhdGUgdGhlIHNob3duIHNlY3Rpb24gdG9vXG5cbiAgICBjb25zdCBjb21wbGV0ZSA9ICgpID0+IHtcbiAgICAgIGlmIChlbGVtZW50LmdldEF0dHJpYnV0ZSgncm9sZScpICE9PSAndGFiJykge1xuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoQ0xBU1NfTkFNRV9TSE9XKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnLCBmYWxzZSlcbiAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsICctMScpXG4gICAgICB0aGlzLl90b2dnbGVEcm9wRG93bihlbGVtZW50LCBmYWxzZSlcbiAgICAgIEV2ZW50SGFuZGxlci50cmlnZ2VyKGVsZW1lbnQsIEVWRU5UX0hJRERFTiwgeyByZWxhdGVkVGFyZ2V0OiByZWxhdGVkRWxlbSB9KVxuICAgIH1cblxuICAgIHRoaXMuX3F1ZXVlQ2FsbGJhY2soY29tcGxldGUsIGVsZW1lbnQsIGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKENMQVNTX05BTUVfRkFERSkpXG4gIH1cblxuICBfa2V5ZG93bihldmVudCkge1xuICAgIGlmICghKFtBUlJPV19MRUZUX0tFWSwgQVJST1dfUklHSFRfS0VZLCBBUlJPV19VUF9LRVksIEFSUk9XX0RPV05fS0VZLCBIT01FX0tFWSwgRU5EX0tFWV0uaW5jbHVkZXMoZXZlbnQua2V5KSkpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpLy8gc3RvcFByb3BhZ2F0aW9uL3ByZXZlbnREZWZhdWx0IGJvdGggYWRkZWQgdG8gc3VwcG9ydCB1cC9kb3duIGtleXMgd2l0aG91dCBzY3JvbGxpbmcgdGhlIHBhZ2VcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICBjb25zdCBjaGlsZHJlbiA9IHRoaXMuX2dldENoaWxkcmVuKCkuZmlsdGVyKGVsZW1lbnQgPT4gIWlzRGlzYWJsZWQoZWxlbWVudCkpXG4gICAgbGV0IG5leHRBY3RpdmVFbGVtZW50XG5cbiAgICBpZiAoW0hPTUVfS0VZLCBFTkRfS0VZXS5pbmNsdWRlcyhldmVudC5rZXkpKSB7XG4gICAgICBuZXh0QWN0aXZlRWxlbWVudCA9IGNoaWxkcmVuW2V2ZW50LmtleSA9PT0gSE9NRV9LRVkgPyAwIDogY2hpbGRyZW4ubGVuZ3RoIC0gMV1cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgaXNOZXh0ID0gW0FSUk9XX1JJR0hUX0tFWSwgQVJST1dfRE9XTl9LRVldLmluY2x1ZGVzKGV2ZW50LmtleSlcbiAgICAgIG5leHRBY3RpdmVFbGVtZW50ID0gZ2V0TmV4dEFjdGl2ZUVsZW1lbnQoY2hpbGRyZW4sIGV2ZW50LnRhcmdldCwgaXNOZXh0LCB0cnVlKVxuICAgIH1cblxuICAgIGlmIChuZXh0QWN0aXZlRWxlbWVudCkge1xuICAgICAgbmV4dEFjdGl2ZUVsZW1lbnQuZm9jdXMoeyBwcmV2ZW50U2Nyb2xsOiB0cnVlIH0pXG4gICAgICBUYWIuZ2V0T3JDcmVhdGVJbnN0YW5jZShuZXh0QWN0aXZlRWxlbWVudCkuc2hvdygpXG4gICAgfVxuICB9XG5cbiAgX2dldENoaWxkcmVuKCkgeyAvLyBjb2xsZWN0aW9uIG9mIGlubmVyIGVsZW1lbnRzXG4gICAgcmV0dXJuIFNlbGVjdG9yRW5naW5lLmZpbmQoU0VMRUNUT1JfSU5ORVJfRUxFTSwgdGhpcy5fcGFyZW50KVxuICB9XG5cbiAgX2dldEFjdGl2ZUVsZW0oKSB7XG4gICAgcmV0dXJuIHRoaXMuX2dldENoaWxkcmVuKCkuZmluZChjaGlsZCA9PiB0aGlzLl9lbGVtSXNBY3RpdmUoY2hpbGQpKSB8fCBudWxsXG4gIH1cblxuICBfc2V0SW5pdGlhbEF0dHJpYnV0ZXMocGFyZW50LCBjaGlsZHJlbikge1xuICAgIHRoaXMuX3NldEF0dHJpYnV0ZUlmTm90RXhpc3RzKHBhcmVudCwgJ3JvbGUnLCAndGFibGlzdCcpXG5cbiAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIGNoaWxkcmVuKSB7XG4gICAgICB0aGlzLl9zZXRJbml0aWFsQXR0cmlidXRlc09uQ2hpbGQoY2hpbGQpXG4gICAgfVxuICB9XG5cbiAgX3NldEluaXRpYWxBdHRyaWJ1dGVzT25DaGlsZChjaGlsZCkge1xuICAgIGNoaWxkID0gdGhpcy5fZ2V0SW5uZXJFbGVtZW50KGNoaWxkKVxuICAgIGNvbnN0IGlzQWN0aXZlID0gdGhpcy5fZWxlbUlzQWN0aXZlKGNoaWxkKVxuICAgIGNvbnN0IG91dGVyRWxlbSA9IHRoaXMuX2dldE91dGVyRWxlbWVudChjaGlsZClcbiAgICBjaGlsZC5zZXRBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnLCBpc0FjdGl2ZSlcblxuICAgIGlmIChvdXRlckVsZW0gIT09IGNoaWxkKSB7XG4gICAgICB0aGlzLl9zZXRBdHRyaWJ1dGVJZk5vdEV4aXN0cyhvdXRlckVsZW0sICdyb2xlJywgJ3ByZXNlbnRhdGlvbicpXG4gICAgfVxuXG4gICAgaWYgKCFpc0FjdGl2ZSkge1xuICAgICAgY2hpbGQuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsICctMScpXG4gICAgfVxuXG4gICAgdGhpcy5fc2V0QXR0cmlidXRlSWZOb3RFeGlzdHMoY2hpbGQsICdyb2xlJywgJ3RhYicpXG5cbiAgICAvLyBzZXQgYXR0cmlidXRlcyB0byB0aGUgcmVsYXRlZCBwYW5lbCB0b29cbiAgICB0aGlzLl9zZXRJbml0aWFsQXR0cmlidXRlc09uVGFyZ2V0UGFuZWwoY2hpbGQpXG4gIH1cblxuICBfc2V0SW5pdGlhbEF0dHJpYnV0ZXNPblRhcmdldFBhbmVsKGNoaWxkKSB7XG4gICAgY29uc3QgdGFyZ2V0ID0gU2VsZWN0b3JFbmdpbmUuZ2V0RWxlbWVudEZyb21TZWxlY3RvcihjaGlsZClcblxuICAgIGlmICghdGFyZ2V0KSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICB0aGlzLl9zZXRBdHRyaWJ1dGVJZk5vdEV4aXN0cyh0YXJnZXQsICdyb2xlJywgJ3RhYnBhbmVsJylcblxuICAgIGlmIChjaGlsZC5pZCkge1xuICAgICAgdGhpcy5fc2V0QXR0cmlidXRlSWZOb3RFeGlzdHModGFyZ2V0LCAnYXJpYS1sYWJlbGxlZGJ5JywgYCR7Y2hpbGQuaWR9YClcbiAgICB9XG4gIH1cblxuICBfdG9nZ2xlRHJvcERvd24oZWxlbWVudCwgb3Blbikge1xuICAgIGNvbnN0IG91dGVyRWxlbSA9IHRoaXMuX2dldE91dGVyRWxlbWVudChlbGVtZW50KVxuICAgIGlmICghb3V0ZXJFbGVtLmNsYXNzTGlzdC5jb250YWlucyhDTEFTU19EUk9QRE9XTikpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGNvbnN0IHRvZ2dsZSA9IChzZWxlY3RvciwgY2xhc3NOYW1lKSA9PiB7XG4gICAgICBjb25zdCBlbGVtZW50ID0gU2VsZWN0b3JFbmdpbmUuZmluZE9uZShzZWxlY3Rvciwgb3V0ZXJFbGVtKVxuICAgICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKGNsYXNzTmFtZSwgb3BlbilcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0b2dnbGUoU0VMRUNUT1JfRFJPUERPV05fVE9HR0xFLCBDTEFTU19OQU1FX0FDVElWRSlcbiAgICB0b2dnbGUoU0VMRUNUT1JfRFJPUERPV05fTUVOVSwgQ0xBU1NfTkFNRV9TSE9XKVxuICAgIG91dGVyRWxlbS5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCBvcGVuKVxuICB9XG5cbiAgX3NldEF0dHJpYnV0ZUlmTm90RXhpc3RzKGVsZW1lbnQsIGF0dHJpYnV0ZSwgdmFsdWUpIHtcbiAgICBpZiAoIWVsZW1lbnQuaGFzQXR0cmlidXRlKGF0dHJpYnV0ZSkpIHtcbiAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKGF0dHJpYnV0ZSwgdmFsdWUpXG4gICAgfVxuICB9XG5cbiAgX2VsZW1Jc0FjdGl2ZShlbGVtKSB7XG4gICAgcmV0dXJuIGVsZW0uY2xhc3NMaXN0LmNvbnRhaW5zKENMQVNTX05BTUVfQUNUSVZFKVxuICB9XG5cbiAgLy8gVHJ5IHRvIGdldCB0aGUgaW5uZXIgZWxlbWVudCAodXN1YWxseSB0aGUgLm5hdi1saW5rKVxuICBfZ2V0SW5uZXJFbGVtZW50KGVsZW0pIHtcbiAgICByZXR1cm4gZWxlbS5tYXRjaGVzKFNFTEVDVE9SX0lOTkVSX0VMRU0pID8gZWxlbSA6IFNlbGVjdG9yRW5naW5lLmZpbmRPbmUoU0VMRUNUT1JfSU5ORVJfRUxFTSwgZWxlbSlcbiAgfVxuXG4gIC8vIFRyeSB0byBnZXQgdGhlIG91dGVyIGVsZW1lbnQgKHVzdWFsbHkgdGhlIC5uYXYtaXRlbSlcbiAgX2dldE91dGVyRWxlbWVudChlbGVtKSB7XG4gICAgcmV0dXJuIGVsZW0uY2xvc2VzdChTRUxFQ1RPUl9PVVRFUikgfHwgZWxlbVxuICB9XG5cbiAgLy8gU3RhdGljXG4gIHN0YXRpYyBqUXVlcnlJbnRlcmZhY2UoY29uZmlnKSB7XG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCBkYXRhID0gVGFiLmdldE9yQ3JlYXRlSW5zdGFuY2UodGhpcylcblxuICAgICAgaWYgKHR5cGVvZiBjb25maWcgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBpZiAoZGF0YVtjb25maWddID09PSB1bmRlZmluZWQgfHwgY29uZmlnLnN0YXJ0c1dpdGgoJ18nKSB8fCBjb25maWcgPT09ICdjb25zdHJ1Y3RvcicpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgTm8gbWV0aG9kIG5hbWVkIFwiJHtjb25maWd9XCJgKVxuICAgICAgfVxuXG4gICAgICBkYXRhW2NvbmZpZ10oKVxuICAgIH0pXG4gIH1cbn1cblxuLyoqXG4gKiBEYXRhIEFQSSBpbXBsZW1lbnRhdGlvblxuICovXG5cbkV2ZW50SGFuZGxlci5vbihkb2N1bWVudCwgRVZFTlRfQ0xJQ0tfREFUQV9BUEksIFNFTEVDVE9SX0RBVEFfVE9HR0xFLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgaWYgKFsnQScsICdBUkVBJ10uaW5jbHVkZXModGhpcy50YWdOYW1lKSkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgfVxuXG4gIGlmIChpc0Rpc2FibGVkKHRoaXMpKSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICBUYWIuZ2V0T3JDcmVhdGVJbnN0YW5jZSh0aGlzKS5zaG93KClcbn0pXG5cbi8qKlxuICogSW5pdGlhbGl6ZSBvbiBmb2N1c1xuICovXG5FdmVudEhhbmRsZXIub24od2luZG93LCBFVkVOVF9MT0FEX0RBVEFfQVBJLCAoKSA9PiB7XG4gIGZvciAoY29uc3QgZWxlbWVudCBvZiBTZWxlY3RvckVuZ2luZS5maW5kKFNFTEVDVE9SX0RBVEFfVE9HR0xFX0FDVElWRSkpIHtcbiAgICBUYWIuZ2V0T3JDcmVhdGVJbnN0YW5jZShlbGVtZW50KVxuICB9XG59KVxuLyoqXG4gKiBqUXVlcnlcbiAqL1xuXG5kZWZpbmVKUXVlcnlQbHVnaW4oVGFiKVxuXG5leHBvcnQgZGVmYXVsdCBUYWJcbiIsICIvLyBJbXBvcnQgdGhlIEJvb3RzdHJhcCBjb21wb25lbnRzIHdlIHdhbnQgdG8gdXNlLlxuLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21haW4vanMvaW5kZXgudW1kLmpzXG5pbXBvcnQgVGFiIGZyb20gXCIvanMvYm9vdHN0cmFwL3NyYy90YWJcIjtcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIFRhYlxufSJdLAogICJtYXBwaW5ncyI6ICI7O0FBV0EsTUFBTSxhQUFhLG9CQUFJLElBQUk7QUFFM0IsTUFBTyxlQUFRO0FBQUEsSUFDYixJQUFJLFNBQVMsS0FBSyxVQUFVO0FBQzFCLFVBQUksQ0FBQyxXQUFXLElBQUksT0FBTyxHQUFHO0FBQzVCLG1CQUFXLElBQUksU0FBUyxvQkFBSSxJQUFJLENBQUM7QUFBQSxNQUNuQztBQUVBLFlBQU0sY0FBYyxXQUFXLElBQUksT0FBTztBQUkxQyxVQUFJLENBQUMsWUFBWSxJQUFJLEdBQUcsS0FBSyxZQUFZLFNBQVMsR0FBRztBQUVuRCxnQkFBUSxNQUFNLCtFQUErRSxNQUFNLEtBQUssWUFBWSxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRztBQUNqSTtBQUFBLE1BQ0Y7QUFFQSxrQkFBWSxJQUFJLEtBQUssUUFBUTtBQUFBLElBQy9CO0FBQUEsSUFFQSxJQUFJLFNBQVMsS0FBSztBQUNoQixVQUFJLFdBQVcsSUFBSSxPQUFPLEdBQUc7QUFDM0IsZUFBTyxX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O0FBQ2xELGFBQU8sd0JBQXdCLGVBQWU7QUFDOUMsZ0JBQVUsYUFBYSxpQkFBaUIsSUFBSTtBQUFBLElBQzlDO0FBQUEsSUFFQSx5QkFBeUIsU0FBUyxXQUFXLE9BQU87QUFDbEQsVUFBSSxDQUFDLFFBQVEsYUFBYSxTQUFTLEdBQUc7QUFDcEMsZ0JBQVEsYUFBYSxXQUFXLEtBQUs7QUFBQSxNQUN2QztBQUFBLElBQ0Y7QUFBQSxJQUVBLGNBQWMsTUFBTTtBQUNsQixhQUFPLEtBQUssVUFBVSxTQUFTLGlCQUFpQjtBQUFBLElBQ2xEO0FBQUE7QUFBQSxJQUdBLGlCQUFpQixNQUFNO0FBQ3JCLGFBQU8sS0FBSyxRQUFRLG1CQUFtQixJQUFJLE9BQU8sd0JBQWUsUUFBUSxxQkFBcUIsSUFBSTtBQUFBLElBQ3BHO0FBQUE7QUFBQSxJQUdBLGlCQUFpQixNQUFNO0FBQ3JCLGFBQU8sS0FBSyxRQUFRLGNBQWMsS0FBSztBQUFBLElBQ3pDO0FBQUE7QUFBQSxJQUdBLE9BQU8sZ0JBQWdCLFFBQVE7QUFDN0IsYUFBTyxLQUFLLEtBQUssV0FBWTtBQUMzQixjQUFNLE9BQU8sS0FBSSxvQkFBb0IsSUFBSTtBQUV6QyxZQUFJLE9BQU8sV0FBVyxVQUFVO0FBQzlCO0FBQUEsUUFDRjtBQUVBLFlBQUksS0FBSyxNQUFNLE1BQU0sVUFBYSxPQUFPLFdBQVcsR0FBRyxLQUFLLFdBQVcsZUFBZTtBQUNwRixnQkFBTSxJQUFJLFVBQVUsb0JBQW9CLE1BQU0sR0FBRztBQUFBLFFBQ25EO0FBRUEsYUFBSyxNQUFNLEVBQUU7QUFBQSxNQUNmLENBQUM7QUFBQSxJQUNIO0FBQUEsRUFDRjtBQU1BLHdCQUFhLEdBQUcsVUFBVSxzQkFBc0Isc0JBQXNCLFNBQVUsT0FBTztBQUNyRixRQUFJLENBQUMsS0FBSyxNQUFNLEVBQUUsU0FBUyxLQUFLLE9BQU8sR0FBRztBQUN4QyxZQUFNLGVBQWU7QUFBQSxJQUN2QjtBQUVBLFFBQUksV0FBVyxJQUFJLEdBQUc7QUFDcEI7QUFBQSxJQUNGO0FBRUEsUUFBSSxvQkFBb0IsSUFBSSxFQUFFLEtBQUs7QUFBQSxFQUNyQyxDQUFDO0FBS0Qsd0JBQWEsR0FBRyxRQUFRLHFCQUFxQixNQUFNO0FBQ2pELGVBQVcsV0FBVyx3QkFBZSxLQUFLLDJCQUEyQixHQUFHO0FBQ3RFLFVBQUksb0JBQW9CLE9BQU87QUFBQSxJQUNqQztBQUFBLEVBQ0YsQ0FBQztBQUtELHFCQUFtQixHQUFHO0FBRXRCLE1BQU8sY0FBUTs7O0FDdFRmLE1BQU8sZ0JBQVE7QUFBQSxJQUNYO0FBQUEsRUFDSjsiLAogICJuYW1lcyI6IFsiY2FsbGJhY2siLCAiZm4iLCAiZWxlbWVudCJdCn0K
