vite-import-markdown
-----------------------

This plugin just for my purpose only, feel free to develop it up. Very inspired from [snowpack-plugin-markdown](https://github.com/joshnuss/snowpack-plugin-markdown). But, I add little different option.

## Usage

```
npm i vite-import-markdown --save-dev
```

Then in your Vite config

```js
// snowpack.config.js
import viteImportMarkdown from 'vite-import-markdown';
export default {
    plugins: [
        viteImportMarkdown(markedConfig)
    ],
    // else
};

```

By default `withOrigin = false`. 
You can set it to `true` for return additional raw markdown string. Something like this
`viteImportMarkdown(markedConfig, true)`

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
