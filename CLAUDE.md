# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for Hadiya Firdaus, hosted on GitHub Pages at www.hadiya.ca. Based on the [devportfolio template](https://github.com/RyanFitzgerald/devportfolio-template) (v1.2.2) by Ryan Fitzgerald.

Static single-page site using jQuery, Bootstrap grid, and Font Awesome. No backend or framework.

## Build Commands

```bash
npm install            # Install Gulp dev dependencies
npm run watch          # Compile Sass + minify JS (runs gulp watch)
gulp watch             # Same as above if Gulp is installed globally
gulp scripts           # Minify JS only
gulp styles            # Compile Sass only
```

There are no tests or linting configured.

## Architecture

### File Flow

- **Sass source**: `scss/styles.scss` → compiled to → `css/styles.css`
- **JS source**: `js/scripts.js` → Babel + uglify → `js/scripts.min.js`
- `index.html` loads the compiled `css/styles.css` and `js/scripts.min.js`

### Key Files

- `index.html` — Main portfolio page (sections: lead, about, experience, education, projects, footer)
- `scss/styles.scss` — All custom styles; color theming via Sass variables at the top (`$base-color: #2a74af`, etc.)
- `js/scripts.js` — jQuery handlers for navigation, mobile menu, experience timeline generation, and smooth scrolling
- `gulpfile.js` — Build tasks (Sass compilation, JS transpile+minify, watch)

### Project Detail Pages

Standalone HTML pages for individual projects: `project-handsfree.html`, `project-pollocks.html`, `project-socket.html`, `project-unlockme.html`. These share the same CSS/JS as the main page.

### Static Assets

- `images/` — Project screenshots, sketches, background images (`lead-bg.jpg` is the hero background)
- `assets/img/` — Additional images (new theme portfolio images, masthead)
- `files/` — Downloadable project files (zips, PDFs)
- `libs/font-awesome/` — Bundled Font Awesome (loaded locally)
- `css/bootstrap.min.css` — Bundled Bootstrap grid

### Theming

Edit Sass variables in `scss/styles.scss` (lines 36-50) to change colors. After editing, run `gulp styles` to recompile. The `$base-color` variable drives the overall color scheme.
