<template>
  <el-dialog
    v-bind:class="classList"
    v-bind:style="styleMap"
    @open="onOpen"
    @close="onClose"
    :model="model"
    :visible="visible"
    :title="title"
    :lock-scroll="lockScroll"
    :show-close="showClose"
    :append-to-body="appendToBody"
  >
    <span slot="title" class="dialog-footer">
      <component
        :is="item.tag"
        v-for="item in children.filter(child => (child.slot === 'title'))"
        v-show="!item.hide"
        :key="getAttr(item, 'key')"
        :id="item.id"
        :name="item.name"
        :class="item.classList"
        :style="item.styleMap"
        :model="model[getAttr(item, 'key')]"
        :extra="extra"
        :children="item.children"
        v-bind="item.attrs"
        :schema="item"
        v-on="getEventList(item)"
      >
      </component>
    </span>
    <component
      :is="item.tag"
      v-for="item in children.filter(child => !child.slot)"
      v-show="!item.hide"
      :key="getAttr(item, 'key')"
      :id="item.id"
      :name="item.name"
      :class="item.classList"
      :style="item.styleMap"
      :model="model[getAttr(item, 'key')]"
      :extra="extra"
      :children="item.children"
      v-bind="item.attrs"
      :schema="item"
      v-on="getEventList(item)"
    >
    </component>
    <span slot="footer" class="dialog-footer">
      <component
        :is="item.tag"
        v-for="item in children.filter(child => (child.slot === 'footer'))"
        v-show="!item.hide"
        :key="getAttr(item, 'key')"
        :id="item.id"
        :class="item.classList"
        :style="item.styleMap"
        v-bind="item.attrs"
        :schema="item"
        v-on="getEventList(item)"
      >
      </component>
    </span>
  </el-dialog>
</template>

<script>
import containerMixin from '../../mixins/container'
import visibleMixin from '../../mixins/visible'

/**
 * 模态框
 * @displayName Al Modal
 */
export default {
  name: 'al-modal',
  mixins: [containerMixin, visibleMixin],
  props: {
    /**
     * 子组件
     * @value array
     */
    children: {
      type: Array,
      default: () => []
    },
    /**
     * 标题
     * @value string
     */
    title: {
      type: String
    },
    /**
     * 锁定Body滚动
     * @values true / false
     */
    lockScroll: {
      type: Boolean,
      default: true
    },
    /**
     * 显示关闭按钮
     * @values true / false
     */
    showClose: {
      type: Boolean,
      default: true
    },
    /**
     * 是否插入Body
     * @values true / false
     */
    appendToBody: {
      type: Boolean,
      default: true
    }
  },
  methods: {
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
    getEventList (item) {
      const eventList = {}

      if (item.events) {
        Object.keys(item.events).forEach(eventName => {
          eventList[eventName] = this.getEvent(item, eventName)
        })
      }

      return eventList
    },

    onOpen (e) {
      /**
       * 打开事件
       * @event open
       * @type {Event}
       */
      this.$emit('open', e)
    },
    onClose (e) {
      /**
       * 关闭事件
       * @event close
       * @type {Event}
       */
      this.$emit('close', e)
    }
  }
}
</script>

<docs>

## 演示

打开关闭 Modal

```vue

<template>
  <div>
    <al-button @click="openDialog" text="打开Dialog"></al-button>
    <br/><br/>
    <al-text text="请在打印日志里观察监听事件的变化"></al-text>
    <al-modal
      :visible="visible"
      :model="model"
      @open="openListener"
      @close="closeListener"
    ></al-modal>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        visible: false,
        model: {}
      }
    },
    methods: {
      openDialog () {
        this.visible = true
      },
      openListener () {
        console.log('open dialog')
      },
      closeListener () {
        this.visible = false
        console.log('close dialog')
      }
    }
  }
</script>
```

配置模态框子组件 以及 操作列

```vue

<template>
  <div>
    <al-button @click="openDialog" text="打开Dialog"></al-button>
    <br/><br/>
    <al-modal
      :visible="visible"
      :model="model"
      :children="children"
      @open="openListener"
      @close="closeListener"
    ></al-modal>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        visible: false,
        model: {},
        children: [{
          tag: 'al-text',
          children: [],
          attrs: {
            value: '请在打印日志里观察监听事件的变化',
            disabled: false
          },
        }, {
          tag: 'al-button',
          slot: 'footer',
          children: [],
          attrs: {
            text: '确定',
            disabled: false
          },
          events: {
            click: this.submit
          }
        }, {
          tag: 'al-button',
          slot: 'footer',
          children: [],
          attrs: {
            text: '取消',
            disabled: false
          },
          events: {
            click: this.cancel
          }
        }]
      }
    },
    methods: {
      openDialog () {
        this.visible = true
      },
      openListener () {
        console.log('open dialog')
      },
      closeListener () {
        this.visible = false
        console.log('close dialog')
      },
      submit () {
        this.visible = false
        console.log('submit success')
      },
      cancel () {
        this.visible = false
        console.log('cancel success')
      }
    }
  }
</script>
```

是否显示关闭按钮

```vue

<template>
  <div>
    <al-button @click="openDialog1" text="打开Dialog1"></al-button>
    <al-button @click="openDialog2" text="打开Dialog2"></al-button>
    <br/><br/>
    <al-modal
      :visible="visible1"
      :model="model"
      :show-close="true"
      @close="closeDialog1"
    ></al-modal>
    <al-modal
      :visible="visible2"
      :model="model"
      :show-close="false"
      @close="closeDialog2"
    ></al-modal>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        visible1: false,
        visible2: false,
        showClose: false,
        model: {}
      }
    },
    methods: {
      openDialog1 () {
        this.visible = true
      },
      openDialog2 () {
        this.visible = true
      },
      closeDialog1 () {
        this.visible = false
      },
      closeDialog2 () {
        this.visible = false
      }
    }
  }
</script>
```

是否锁定body

```vue

<template>
  <div>
    <al-button @click="openDialog1" text="打开Dialog1"></al-button>
    <al-button @click="openDialog2" text="打开Dialog2"></al-button>
    <br/><br/>
    <al-modal
      :visible="visible1"
      :model="model"
      :lock-scroll="true"
      @close="closeDialog1"
    ></al-modal>
    <al-modal
      :visible="visible2"
      :model="model"
      :lock-scroll="false"
      @close="closeDialog2"
    ></al-modal>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        visible1: false,
        visible2: false,
        showClose: false,
        model: {}
      }
    },
    methods: {
      openDialog1 () {
        this.visible1 = true
      },
      openDialog2 () {
        this.visible2 = true
      },
      closeDialog1 () {
        this.visible1 = false
      },
      closeDialog2 () {
        this.visible2 = false
      }
    }
  }
</script>
```
</docs>
