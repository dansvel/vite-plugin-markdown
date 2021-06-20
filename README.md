# vite-import-markdown

This plugin just for my purpose only, feel free to develop it up. Very inspired
from [snowpack-plugin-markdown](https://github.com/joshnuss/snowpack-plugin-markdown). But, I add little different
option.

## Installation

```
npm i @dansvel/vite-plugin-markdown --save-dev
```

Then add it to your Vite config

### Example: SvelteKit

```js
import vitePluginMarkdown from '@dansvel/vite-plugin-markdown'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // some preprocessor maybe
  kit: {
    target: '#svelte',
    vite: () => ({
      plugins: [
        vitePluginMarkdown(),
      ],
    })
  }
};

export default config;
```

### Example: Snowpack

```js
// snowpack.config.js
import vitePluginMarkdown from '@dansvel/vite-plugin-markdown';

export default {
  plugins: [
    vitePluginMarkdown(),
  ],
};
```

## Options

Function of the plugin is something like this

```
function (pluginOptions = {}, withOrigin = false)
```

`pluginOptions` is markedjs `setOptions` object, something like this

```js
const markedOptions = {
  renderer: new marked.Renderer(),
  highlight: function (code, lang) {
    const hljs = require('highlight.js');
    const language = hljs.getLanguage(lang) ? lang : 'plaintext';
    return hljs.highlight(code, {language}).value;
  },
  pedantic: false,
  gfm: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false
}
```

See https://marked.js.org/using_advanced#options for more marked options

If you set `withOrigin` to `true` it will return additional raw markdown string. Set it like this
`viteImportMarkdown({}, true)`

## Usage

Attributes can be added to the top the file in YAML format:

```markdown
---
title: Hello World!
date: 2020-01-01
---
```

### Single file

The attributes will be available when imported:

```js
import file from './path/to/some/file.md'

// file.markdown -> original markdown (if `withOrigin` set to `true`)
// file.body -> markdown converted to html
// file.title -> from frontmatter (can be any name you'd like)
// file.date -> from frontmatter (cane be name you'd like)
```

### Multiple file

```js
const slug = 'hello-world' // or get from url or else

// use relative path to markdown files directory
// this example is for ./src/routes/post/[slug].svelte
// and the content in  ./contents/post/
const posts = await import.meta.glob('../../../contents/post/*.md')
let post
for (const path in posts) {
  if (slug === path.split('/').pop().split('.').shift()) {
    post = await posts[path]()
    post = {slug, ...post.default}
  }
}
```

# License

MIT
