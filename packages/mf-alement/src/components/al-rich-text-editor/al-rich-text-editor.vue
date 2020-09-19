<template>
  <quillEditor :content="value" @change="onChange" @blur="onBlur" />
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
import Base from '../../mixins/base'
/**
 * 富文本
 * @displayName Al Rich Text
 */
export default {
  name: 'al-rich-text-editor',

  mixins: [Base],

  props: {
    /**
     * 富文本中的文本
     */
    value: {
      type: String,
      default: ''
    }
  },
  components: {
    quillEditor
  },

  methods: {

    onChange (event) {
      /**
       * 富文本内文本改变时触发
       */
      this.$emit('onChange', event.html)
    },

    onBlur (event) {
      /**
       * 富文本失去焦点时触发
       */
      this.$emit('onBlur', event)
    }

  }
}
</script>

<style lang="scss" scoped>

</style>

<docs>
```vue
<template>
  <al-rich-text-editor :value="value" />
</template>

<script>
export default {
  data () {
    return {
      value: 'Hello world'
    }
  }
}
</script>

<style>

</style>
```
</docs>
