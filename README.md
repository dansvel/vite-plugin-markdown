# vite-plugin-markdown

This plugin just for my purpose only, feel free to develop it up. Very inspired from [snowpack-plugin-markdown](https://github.com/joshnuss/snowpack-plugin-markdown). But, I add little different option.

## Installation

```
npm i @dansvel/vite-plugin-markdown --save-dev
```

Then add it to your Vite config

### Example: SvelteKit

`svelte.config.js`

```js
import markdown from '@dansvel/vite-plugin-markdown'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // some preprocessor maybe
  kit: {
  target: '#svelte',
    vite: () => ({
      plugins: [
        markdown(),
      ],
    })
  }
};

export default config;
```

## Options

Function of the plugin is something like this

```
{
    markedOptions?: marked.options;
    withOrigin?: boolean;
}
```

### Example

`marked.options.js`

```js
import hljs from 'highlight.js'

const highlight = (code, lang) => {
  lang = lang && hljs.getLanguage(lang) ? lang : 'plaintext'
  return hljs.highlight(code, {language: lang}).value
}


export default { highlight }
```
See https://marked.js.org/using_advanced#options for more marked options

`svelte.config.js`

```js
import markdown from '@dansvel/vite-plugin-markdown'
import markedOptions from './marked.config.js'

const config = {
  kit: {
    target: '#svelte',
    vite: () => ({
      plugins: [
        markdown({ markedOptions, withOrigin: true })
      ]
    })
  }
};

export default config;
```

## Usage

Attributes can be added to the top the file in YAML format:

```markdown
---
title: Hello World!
date: 2020-01-01
---

i am from **markdown**
```

### Single file

The attributes will be available when imported:

```js
import content from './path/to/some/file.md'

// content.body -> markdown converted to html
// content.attributes -> from attributes frontmatter // something like{ title: "hello world", author: "dansvel"}
// content.markdown -> original markdown (if `options.withOrigin` set to `true`)
```

or

```js
import { attributes, body } from './path/to/some/file.md'
```

### Multiple file

#### synchronous example

```js
// example from index.svelte
import { page } from '$app/stores';

const thePathYouWant =  $page.path === '/' ? 'index' : $page.path.substring(1)
const contents = import.meta.globEager('./*.md')

let content
for (const path in contents) {
  if (path.split('/').pop().split('.').shift() === thePathYouWant) {
    content = contents[path]
  }
}

console.log(content)
```
#### asynchronous example

```js
// example from svelte <script context="module">
export const load = async ({ page }) => {
  const thePathYouWant = page.path === '/' ? 'index' : page.path.substring(1)
  const contents = await import.meta.glob('./*.md')
  let content
  for (const path in contents) {
    console.log(thePathYouWant)
    if (path.split('/').pop().split('.').shift() === thePathYouWant) {
      content = await contents[path]()
    }
  }

  return { props: { content } }
}

```

# License

MIT
