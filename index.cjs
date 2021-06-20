const marked = require('marked')
const frontMatter = require('front-matter')

module.exports = function (pluginOptions = {}, withOrigin = false) {
  return {
    name: 'vite-import-markdown',
    config() {
      marked.setOptions(pluginOptions)
    },
    transform(src, id) {
      if (!id.endsWith('.md')) return null

      const {attributes, body} = frontMatter(src)
      let result = {
        ...attributes,
        body: marked(body),
      }

      if (withOrigin) {
        result = {
          ...result,
          markdown: body
        }
      }

      return {
        code: `export default ${JSON.stringify(result)}`,
        map: null
      }

    }
  }
}