<template>
  <i
    v-bind:class="classList"
    v-bind:style="styleMap"
    @click="onClick"
    v-show="!hide"
  ></i>
</template>

<script>
import baseMixin from '../../mixins/base'
/**
 * 图标库
 * @displayName Al Icon
 */
export default {
  name: 'al-icon',
  mixins: [baseMixin],
  props: {
    /**
     * 默认值
     * @values true / false
     */
    hide: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
    onClick (e) {
    /**
     * 单击事件
     * @event click
     * @type {Event}
     */
      this.$emit('click', e)
    }
  }
}
</script>
<docs>

## 演示

默认展示

```jsx
<al-icon class='el-icon-share' />
<al-icon class='el-icon-delete' />
<al-icon class="el-icon-edit" />
```

隐藏展示

```jsx
<al-icon class='el-icon-share' :hide="false"/>
```
</docs>
