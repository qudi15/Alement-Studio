<template>
  <span :class="classList" :style="styleMap" :id="id" :name="name">{{text}}</span>
</template>

<script>
import baseMixin from '../../mixins/base'
/**
 * 文本
 * @displayName Al Text
 */
export default {
  name: 'al-text',
  mixins: [baseMixin],
  props: {
    /**
    * 文本内容
    * @value string或number
    */
    text: {
      type: [String, Number],
      default: ''
    }
  },
  methods: {
  }
}
</script>

<docs>

## 演示

显示文本
```jsx
<al-text text="这是一段文本"></al-text>
```

</docs>
