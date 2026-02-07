# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal website for Matej Lukasik built with Hugo static site generator using the LoveIt theme. Deployed to GitHub Pages at matejlukasik.com.

## Common Commands

```bash
# Local development server with live reload
hugo server

# Build site for production
hugo --gc --minify

# Create new content
hugo new posts/my-post.md
```

## Architecture

**Configuration (split config):**
- `config/_default/hugo.toml` - Base Hugo settings, theme selection, permalinks
- `config/_default/params.toml` - Site params, author info, social links, home page profile
- `config/_default/menus.toml` - Navigation menu items

**Content:**
- `content/_index.md` - Homepage content (currently features trandom.io project)
- `content/about/` - About page

**Customizations (overrides LoveIt theme):**
- `layouts/partials/header.html` - Custom header (theme switcher removed)
- `layouts/shortcodes/` - Custom shortcodes (x.html for X/Twitter embeds)
- `assets/css/_custom.scss` - Custom CSS (Nostr icon styling)
- `assets/data/social.yml` - Extended social media definitions (includes Nostr)
- `assets/images/nostr.svg` - Custom Nostr icon

**Static assets:** `static/` - Avatar, images served directly

## Deployment

GitHub Actions workflow (`.github/workflows/hugo.yml`) automatically builds and deploys to GitHub Pages on push to main. Uses Hugo extended v0.147.8.

Build note: The workflow removes `themes/LoveIt/exampleSite` before building to avoid conflicts.
