<script>
  import { attributes, body, markdown } from './index.md'
</script>

<h1>{attributes.title} by {attributes.author}</h1>

<pre>{markdown}</pre>

{@html body}


