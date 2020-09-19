<template>
  <el-collapse :value="value" :class="classList" :style="styleMap" :accordion="accordion" @change="onChange">
    <el-collapse-item v-for="(item, index) in children" :name="item.name" :disabled="getAttr(item, 'disabled')" :key="index" v-show="isShow(item)">
      <template slot="title">
        <al-text :text="getAttr(item, 'title')"></al-text>
      </template>
      <template v-for="(child, index) in item.children">
        <component
          v-if="isShow(child)"
          :is="child.tag"
          :key="index"
          :model="getModel(child)"
          :extra="extra"
          v-bind="{ ...child, ...child.attrs, ...child.hooks }"
          :schema="child"
          :children="child.children"
          v-on="getEvents(child)"
        />
      </template>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
import containerMixin from '../../mixins/container'
import alText from '../al-text/al-text'
import { alGetterCoolPath } from '../../utils'

/**
 * 折叠面板
 * @displayName Al Collapse
 */
export default {
  name: 'al-collapse',

  mixins: [containerMixin],

  components: {
    alText
  },

  props: {
    /**
     * 是否为手风琴模式
     */
    accordion: {
      type: Boolean,
      default: false
    },

    /**
     * 默认打开的id
     */
    value: {
      type: [String, Array],
      default () {
        return this.accordion ? '' : []
      }
    }
  },

  data () {
    return {
    }
  },

  methods: {
    onChange (actives) {
      this.$emit('onChange', actives)
    },

    /**
     * @private
     */
    isShow (field = {}) {
      const hide = field.hide
      if (typeof hide === 'boolean') {
        return !hide
      }
      if (typeof hide === 'function') {
        return !hide(this.model, this.extra)
      }
      return true
    },

    getModel (schema) {
      return alGetterCoolPath(this.model, this.getAttr(schema, 'primaryKey'))
    },

    /**
     * 获取字段的值
     * @private
     */
    getValue (field = {}) {
      const key = this.getAttr(field, 'primaryKey')
      const format = this.getAttr(field, 'format')

      // 处理查询条件中primaryKey中带有.但不需要嵌套赋值的问题
      const noNestedKey = this.getAttr(field, 'noNestedKey')
      const val = noNestedKey
        ? this.model[key]
        : key
          ? alGetterCoolPath(this.model, key)
          : this.model

      if (typeof format === 'function') {
        return format(val, this.model, this.extra)
      }
      return val
    },

    /**
     * 获取events中的事件
     * @private
     */
    getEvent (field = {}, name = '') {
      return (field.events || {})[name]
    },

    /**
     * 生成绑定的events
     * @private
     */
    getEvents (item) {
      const eventList = {}

      if (item.events) {
        Object.keys(item.events).forEach(eventName => {
          eventList[eventName] = this.getEvent(item, eventName)
        })
      }

      return eventList
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

<docs>

## 演示

基本功能

```vue
<template>
  <al-collapse :value="value" :children="children" @onChange="onChange">
  </al-collapse>
</template>
<script>
export default {
  data () {
    return {
      value: ['1', '2'],
      children: [
        {
          name: '1',
          attrs: {
            title: '页签1',
          },
          children: [{
            tag: 'al-text',
            attrs: {
              text: '与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念'
            }
          }]
        },
        {
          name: '2',
          attrs: {
            title: '页签2',
          },
          children: [{
            tag: 'al-text',
            attrs: {
              text: '控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；'
            }
          }]
        }
      ]
    }
  },

  methods: {
    onChange (open) {
      console.log(open)
    }
  }
}
</script>
```

手风琴模式

```vue
<template>
  <al-collapse :value="value" :children="children" :accordion="true" @onChange="onChange">
  </al-collapse>
</template>
<script>
export default {
  data () {
    return {
      value: ['1'],
      children: [
        {
          name: '1',
          attrs: {
            title: '页签1',
          },
          children: [{
            tag: 'al-text',
            attrs: {
              text: '与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念'
            }
          }]
        },
        {
          name: '2',
          attrs: {
            title: '页签2',
          },
          children: [{
            tag: 'al-text',
            attrs: {
              text: '控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；'
            }
          }]
        }
      ]
    }
  },

  methods: {
    onChange (open) {
      console.log(open)
    }
  }
}
</script>
```

</docs>
