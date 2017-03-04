# README

Grunt Template for PHP frontend development w/ Bootstrap.

## Prerequisites

You will need Node and Ruby to run Grunt (task manager) and Sass (SASS compiler).

*Installing Grunt and Sass*

`npm install -g grunt-cli`
`gem install sass`

*Grunt dependencies*

To install all Grunt dependencies:
`npm install`

## Features:

- Boostrap integration
- ES6 Syntax Support (babel)
- CSS, JS, and HTML minification
- PHP comment removal and inline HTML minification
- Consistent banners on CSS and JS
- Image compression
- Webfont support
- PhpDocumentor support
- Watch for changes

## Package.json

You will need to edit the first four lines of your Package.json, which concern your project.

```
"title": "Project Title",
"version": "0.1.0",
"repository": {
    "git:git@github.com:username/project.git"
},
"license": "YOUR LICENSE 1.0",
```

## Distribution

All original code is saved in the `src/` directory. The Gruntfile contains compilers and minifiers which write to `dist/` using the build commands.

*Build options*

- `grunt build`           Build everything (CSS, HTML, PHP, JS)
- `grunt build:js`        Compiles ES6 and minifies JS
- `grunt build:css`       Builds bootstrap
- `grunt build:img`       Copies and compresses images

*Watch*

- `grunt watch`           Watch and build automagically
- `grunt watch:css`       Builds CSS automatically
- `grunt watch:html`      Builds PHP/HTML automatically
- `grunt watch:js`        Builds JavaScript automatically

## webfonts

You will find a `src/fonts/` folder. All the font files (ttf, eot, svg, woff and woff2) will be copied to `dist/fonts/`. Other documents will be ignored.

## CSS

*Bootstrap*

The framework is built on Bootstrap, which gets compiled throught the `build`
command.

Edit the following documents:

- `src/scss/bootstrap.scss`             Components
- `src/scss/_custom.scss`               Boostrap variable overrides
- `src/scss/_customdefinitions.scss`    Custom CSS definitions

*Components*

By default all bootstrap components are disabled. You can selectively add them in `boostrap.css`.

# Banner

All front-facing JS and CSS files have a banner.

```
/*! Project Title - v0.1.0 (build date 1/1/2017)
  license: YOUR LICENSE 1.0
  Copyright (c) 2017 */
```

You can customize the banner in the first few lines of
