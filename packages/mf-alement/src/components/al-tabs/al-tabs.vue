<template>
  <el-tabs
    :closable="closable"
    :value="value"
    :before-leave="beforeLeaveHook"
    @tab-click="onTabClick"
  >
    <el-tab-pane
      v-for="item in tabs"
      :key="getAttr(item, 'name')"
      :name="getAttr(item, 'name')"
      :label="getAttr(item, 'label')"
      :disabled="getAttr(item, 'disabled', false)"
      :closable="getClosable(item)"
    >
      <component
        v-for="(child, index) in item.children"
        :is="child.tag"
        :key="index"
        :model="getModel(child)"
        :extra="extra"
        v-bind="{ ...child, ...child.attrs, ...child.hooks }"
        :children="child.children"
        :schema="child"
        v-on="getEvents(child)"
      />
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import containerMixin from '../../mixins/container'
import { alGetterCoolPath } from '../../utils'

/**
 * 标签页
 * @displayName Al Tabs
 */
export default {
  name: 'al-tabs',
  mixins: [containerMixin],
  props: {
    /**
     * 默认值
     * @value string
     */
    value: {
      type: String
    },
    /**
     * 组件选项
     * @value array
     */
    tabs: {
      type: Array
    },
    /**
     * 标签是否可关闭
     * @values boolean
     */
    closable: {
      type: Boolean,
      default: false
    },
    /**
     * 切换标签前的钩子函数
     */
    beforeLeaveHook: {
      type: Function
    }
  },
  methods: {

    getEvent (field = {}, name = '') {
      return (field.events || {})[name]
    },

    /**
     * 获取events中的事件
     * @private
     */
    getEvents (col = {}, name = '') {
      const eventList = {}

      if (col.events) {
        Object.keys(col.events).forEach(eventName => {
          eventList[eventName] = this.getEvent(col, eventName)
        })
      }

      return eventList
    },

    /**
     * 获取子签页的关闭状态
     * @private
     */
    getClosable (item) {
      let disabled = this.getAttr(item, 'closable')

      if ((typeof disabled).toLowerCase() !== 'boolean') {
        disabled = this.closable
      }

      return disabled
    },

    getModel (schema) {
      return alGetterCoolPath(this.model, this.getAttr(schema, 'primaryKey'))
    },

    /**
     * 触发子标签点击事件
     * @private
     */
    onTabClick (val) {
      this.$emit('onTabClick', val.name, this.value)
    }
  }
}
</script>

<docs>

## 演示

Tabs
```vue
<template>
  <al-tabs
    :value="value"
    :tabs="tabs"
  ></al-tabs>
</template>

<script>
export default {
  data () {
    return {
      value: '1',
      tabs: [{
        attrs: {
          name: "1",
          label: "tab 1"
        },
        children: [{
          tag: "al-text",
          attrs: {
            text: "第一个页签中的内容1"
          }
        }, {
          tag: "al-text",
          attrs: {
            text: "第一个页签中的内容2"
          }
        }]
      }, {
        attrs: {
          name: "2",
          label: "tab 2"
        },
        children: [{
          tag: "al-text",
          attrs: {
            text: "第二个页签中的内容1"
          }
        }, {
          tag: "al-text",
          attrs: {
            text: "第二个页签中的内容2"
          }
        }]
      }]
    }
  }
}
</script>
```

Tabs 嵌套table
```vue
<template>
  <div>
    <al-tabs
      :value="value"
      :tabs="tabs1"
      :model="model"
      :extra="extra"
    ></al-tabs>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        value: '1',
        model: {
          tab1: [{
            select: 'input'
          }]
        },
        extra: {},
        tabs1: [{
          attrs: {
            name: "1",
            label: "table 1"
          },
          children: [{
            tag: "al-table",
            attrs: {
              primaryKey: 'tab1',
              columns: [
                {
                  attrs: {
                    label: "类型",
                    primaryKey: 'select',
                    type: "select",
                    options: [
                      { text: "输入框", value: "input" }
                    ]
                  }
                }
              ]
            }
          }]
        }]
      }
    }
  }
</script>
```

Tabs 可关闭标签
```vue
<template>
  <al-tabs
    :value="value"
    :tabs="tabs"
  ></al-tabs>
</template>

<script>
  export default {
    data () {
      return {
        value: '1',
        closable: false,
        tabs: [{
          attrs: {
            name: "1",
            label: "tab 1",
            closable: true
          },
          children: [{
            tag: "al-text",
            attrs: {
              text: "第一个页签中的内容1"
            }
          }, {
            tag: "al-text",
            attrs: {
              text: "第一个页签中的内容2"
            }
          }]
        }, {
          attrs: {
            name: "2",
            label: "tab 2"
          },
          children: [{
            tag: "al-text",
            attrs: {
              text: "第二个页签中的内容1"
            }
          }, {
            tag: "al-text",
            attrs: {
              text: "第二个页签中的内容2"
            }
          }]
        }]
      }
    }
  }
</script>
```

切换标签前的钩子函数
```vue
<template>
  <div>
    <al-tabs
      :value="value"
      :tabs="tabs1"
      :before-leave-hook="beforeLeaveHookFalse"
    ></al-tabs>
    <al-tabs
      :value="value"
      :tabs="tabs2"
      :before-leave-hook="beforeLeaveHook"
    ></al-tabs>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        value: '1',
        closable: false,
        tabs1: [{
          attrs: {
            name: "1",
            label: "tab 1",
            closable: true
          },
          children: [{
            tag: "al-text",
            attrs: {
              text: "无法切换标签页, 钩子函数阻止了切换行为"
            }
          }]
        }, {
          attrs: {
            name: "2",
            label: "tab 2"
          },
          children: [{
            tag: "al-text",
            attrs: {
              text: "正常切换"
            }
          }]
        }],
        tabs2: [{
          attrs: {
            name: "1",
            label: "tab 1",
            closable: true
          },
          children: [{
            tag: "al-text",
            attrs: {
              text: "正常切换1"
            }
          }]
        }, {
          attrs: {
            name: "2",
            label: "tab 2"
          },
          children: [{
            tag: "al-text",
            attrs: {
              text: "正常切换2 可以在打印日志查看tab值"
            }
          }]
        }]
      }
    },
    methods: {
      beforeLeaveHookFalse () {
        return false
      },

      beforeLeaveHook (newVal, oldVal) {
        console.log('current tab val:', newVal)
        console.log('previous tab val:', oldVal)
      }
    }
  }
</script>
```

标签页点击事件
```vue
<template>
  <al-tabs
    :value="value"
    :tabs="tabs"
    @onTabClick="handleClick"
  ></al-tabs>
</template>

<script>
  export default {
    data () {
      return {
        value: '1',
        closable: false,
        tabs: [{
          attrs: {
            name: "1",
            label: "tab 1",
            closable: true
          },
          children: [{
            tag: "al-text",
            attrs: {
              text: "打印日志查看点击事件"
            }
          }]
        }, {
          attrs: {
            name: "2",
            label: "tab 2"
          },
          children: [{
            tag: "al-text",
            attrs: {
              text: "打印日志查看点击事件"
            }
          }]
        }]
      }
    },
    methods: {
      handleClick (newVal, oldVal) {
        this.value = newVal
        console.log(`click success. new value: ${newVal}, old value: ${oldVal}`)
      }
    }
  }
</script>
```
</docs>
