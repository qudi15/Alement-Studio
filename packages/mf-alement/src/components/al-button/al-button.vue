<template>
  <el-button
    v-bind:class="classList"
    v-bind:style="styleMap"
    @click="onClick"
    :type="type"
    :loading="loading"
    :disabled="disabled"
    :size="size"
    :icon="icon"
  >{{ text }}</el-button>
</template>

<script>
import baseMixin from '../../mixins/base'
/**
 * 按钮
 * @displayName Al Button
 */
export default {
  name: 'al-button',
  mixins: [baseMixin],
  props: {
    /**
     * 按钮类型
     * @values primary / success / warning / danger / info / text
     */
    type: {
      type: String
    },
    /**
     * 加载状态
     * @values true / false
     */
    loading: {
      type: Boolean
    },
    /**
     * 禁用状态
     * @values true / false
     */
    disabled: {
      type: Boolean
    },

    /**
     * 按钮内容
     */
    text: {
      type: [String, Number]
    },

    /**
     * 按钮中的图标
     */
    icon: {
      type: String
    },

    /**
     * 按钮中的class
     */
    classList: {
      type: String
    },

    /**
     * 尺寸
     * @values medium / small / mini
     */
    size: {
      type: String
    }
  },
  methods: {
    onClick (e) {
      /**
       * 单击事件
       * @event click
       * @type {Event}
       */
      this.$emit('click', e)
      this.$emit('onClick', e)
    }
  }
}
</script>

<docs>

## 演示

内容

```jsx
<al-button text="Hello"></al-button>
<al-button text="World"></al-button>
```

按钮类型

```jsx
<al-button text="按钮"></al-button>
<al-button type="primary" text="按钮"></al-button>
<al-button type="success" text="按钮"></al-button>
<al-button type="warning" text="按钮"></al-button>
<al-button type="danger" text="按钮"></al-button>
<al-button type="info" text="按钮"></al-button>
<al-button type="text" text="按钮"></al-button>

```

图标

```jsx
<al-button icon="el-icon-edit"></al-button>
<al-button type="primary" icon="el-icon-search"></al-button>
<al-button type="text" icon="el-icon-search"></al-button>
```

加载状态

```jsx
<al-button text="默认按钮"></al-button>
<al-button :loading="true" text="加载中"></al-button>
```

禁用状态

```jsx
<al-button text="默认按钮"></al-button>
<al-button :disabled="true" text="禁用按钮"></al-button>
```

不同尺寸
```jsx
<al-button text="按钮"></al-button>
<al-button text="按钮" size="medium"></al-button>
<al-button text="按钮" size="small"></al-button>
<al-button text="按钮" size="mini"></al-button>
```
</docs>
