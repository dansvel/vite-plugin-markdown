import frontMatter from 'front-matter'
import {marked} from 'marked'
import {Plugin} from 'vite'


export interface PluginOptions {
  markedOptions?: marked.options
  withOrigin?: boolean
}

export interface Metadata {
  attributes: {}
  body: string
}

export interface Result extends Metadata {
  markdown?: string
}

class Content {
  #variables: string[] = []
  #contextCode = ''

  add(content: {}): void {
    for (const name in content) {
      this.#contextCode += `const ${name} = ${JSON.stringify(content[name])}\n`
      this.#variables.push(name)
    }
  }

  export(): string {
    return [this.#contextCode, `export { ${this.#variables.join(', ')} }`].join('\n')
  }
}

export default (options: PluginOptions): Plugin => {
  return {
    name: 'vite-plugin-markdown',
    config() {
      marked.setOptions(options.markedOptions)
    },
    transform: (src: string, id: string) => {
      if (!id.endsWith('.md')) return null
      if (!frontMatter.test(src)) return null

      const {attributes, body}: Metadata = frontMatter(src)

      let result: Result = {
        attributes,
        body: marked.parse(body)
      }

      if (options.withOrigin) {
        result = {
          ...result,
          markdown: body
        }
      }

      let content = new Content()
      content.add(result)

      return {
        code: `${content.export()}\n export default ${JSON.stringify(result)}`
        // code: `export default ${JSON.stringify(result)}`,
      }
    }
  }
}
