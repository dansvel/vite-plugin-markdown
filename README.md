# vite-import-markdown

[![semantic release](https://github.com/dansvel/vite-import-markdown/workflows/semantic%20release/badge.svg)](https://github.com/dansvel/vite-import-markdown/actions?query=workflow%3A%22semantic+release%22) [![coverage](https://github.com/dansvel/vite-import-markdown/workflows/coverage/badge.svg)](https://dansvel.github.io/vite-import-markdown/) [![npm](https://badge.fury.io/js/%40dansvel%2Fvite-plugin-markdown.svg)](https://www.npmjs.com/package/@dansvel/vite-plugin-markdown)

A plugin for importing markdown files in Vite

## Install

```
npm install @dansvel/vite-plugin-markdown
```

<!-- anything below this line will be safe from template removal -->

vite-import-markdown
-----------------------

This plugin just for my purpose only, feel free to develop it up. Very inspired from [snowpack-plugin-markdown](https://github.com/joshnuss/snowpack-plugin-markdown). But, I add little different option.

## Usage

```
npm i @dansvel/vite-plugin-markdown --save-dev
```

Then in your Vite config

```js
// snowpack.config.js
import vitePluginMarkdown from '@dansvel/vite-plugin-markdown';
export default {
    plugins: [
        vitePluginMarkdown(markedConfig)
    ],
    // else
};

```

By default `withOrigin = false`.
You can set it to `true` for return additional raw markdown string. Something like this
`viteImportMarkdown(markedConfig, true)`

See https://marked.js.org/using_advanced#options for more marked options

## Front matter

Attributes can be added to the top the file in YAML format:

```markdown
---
title: Hello World!
date: 2020-01-01
---

# Some markdown
```

The attributes will be available when imported:

```js
import file from './path/to/some/file.md'

// file.markdown -> original markdown (if `withOrigin` set to `true`)
// file.body -> markdown converted to html
// file.title -> from frontmatter (can be any name you'd like)
// file.date -> from frontmatter (cane be name you'd like)
```

# License

MIT
