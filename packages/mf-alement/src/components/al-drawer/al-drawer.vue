<template>
  <el-drawer
    v-bind:class="classList"
    v-bind:style="styleMap"
    @open="onShow"
    @close="onHide"
    :model="model"
    :withHeader="withHeader"
    :title="title"
    :direction="direction"
    :extra-model="extra"
    :show-close="showClose"
    :visible="drawerVisible"
  >
    <component
      :is="item.tag"
      v-for="item in children"
      v-show="!item.hide"
      :key="item.attrs.key"
      :id="item.id"
      :name="item.name"
      :class="item.classList"
      :style="item.styleMap"
      :value="getValue(item.model || model, item.attrs.key)"
      :model="item.model || model"
      :extra-model="item.extra || extra"
      :children="item.children"
      v-bind="item.attrs"
      @change="value => { item.events.change && item.events.change(value) }"
      @input="value => { item.events.input && item.events.input(value) }"
      @blur="value => { item.events.blur && item.events.blur(value) }"
      @focus="value => { item.events.focus && item.events.focus(value) }"
      @click="event => { item.events.click && item.events.click(event) }"
      @clear="value => { item.events.clear && item.events.clear(value) }">
    </component>
  </el-drawer>
</template>

<script>
import containerMixin from '../../mixins/container'
import visibleMixin from '../../mixins/visible'

import { alGetterCoolPath } from '@/utils'
/**
 * 抽屉侧边栏
 * @displayName Al Drawer
 */
export default {
  name: 'al-drawer',
  mixins: [
    containerMixin,
    visibleMixin
  ],
  props: {
    /**
     * 内容树
     * @value object
     */
    schema: {
      type: Object
    },
    /**
     * 侧边栏标题
     * @value string
     */
    title: {
      type: String
    },
    /**
     * 是否显示标题
     * @values true false
     */
    withHeader: {
      type: Boolean
    },
    /**
     * 滑出的方向
     * @values rtl ltr ttb btt
     */
    direction: {
      type: String,
      default: 'rtl'
    },
    /**
     * 是否显示侧边栏
     * @values true / false
     */
    drawerVisible: {
      type: Boolean
    },
    /**
     * 是否显示关闭按钮
     * @values true / false
     */
    showClose: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    getValue (model, keyPath) {
      return alGetterCoolPath(model, keyPath)
    },
    beforeClose (e) {
    /**
     * 关闭之前事件
     * @event beforeClose
     * @type {Event}
     */
      this.$emit('beforeClose', e)
    },
    onShow (e) {
    /**
     * 打开事件
     * @event show
     * @type {Event}
     */
      this.$emit('show', e)
    },
    onHide (e) {
    /**
     * 关闭事件
     * @event hide
     * @type {Event}
     */
      this.$emit('hide', e)
    }
  }
}
</script>

<docs>

## 演示

打开关闭 Drawer

```vue

<template>
  <div>
    <al-button @click="openDrawer" text="打开Drawer"></al-button>
    <al-drawer :with-header="true" :title="'编辑内容'" :children="children" :show-close="true" :drawer-visible="drawerVisible" @hide="closeDrawer" :model="model" :extra-model="extra"></al-drawer>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        drawerVisible: false,
        model: {
          name: 'joey',
          wifeName: 'lulu',
          son:{sonName: 'george'}
        },
        extra: {},
        children: [{
        tag: 'al-form',
        id: 'al-form-id',
        name: 'al-form-name',
        classList: ['al-form-class1', 'al-form-class2'],
        hide: false,
        styleMap: {
            color: 'red',
            fontWeight: 'bold'
        },
        children: [
          {
            tag: 'al-input',
            id: 'al-input-id',
            name: 'al-input-name',
            classList: ['al-input-class1', 'al-input-class2'],
            styleMap: {
                color: 'green',
                fontWeight: 'normal'
            },
            hide: false,
            attrs: {
                key: 'name',
                type: 'text',
                minlength: 6,
                maxlength: 60,
                placeholder: 'name',
                clearable: true,
                showPassword: false,
                rows: 2,
                autosize: true,
                disabled: false,
                readonly: false,
                rules: [],
                label: '姓名',
                labelPosition: 'right',
                labelWidth: ''
            },
            events: {
                change: (value, model, extra) => {},
                blur: (value, model, extra) => {},
                focus: (value, model, extra) => {},
                input: (value, model, extra) => {},
                clear: (value, model, extra) => {}
            }
          },
          {
            tag: 'al-input',
            id: 'al-input-id3',
            name: 'al-input-name3',
            classList: ['al-input-class31', 'al-input-class32'],
            styleMap: {},
            hide: false,
            attrs: {
                key: 'wifeName',
                type: 'text',
                minlength: 6,
                maxlength: 60,
                placeholder: '',
                clearable: true,
                showPassword: true,
                rows: 2,
                autosize: true,
                disabled: false,
                readonly: false,
                rules: [],
                label: '妻子姓名',
                labelPosition: 'right',
                labelWidth: ''
            },
            events: {
                change: (value, model, extra) => {},
                blur: (value, model, extra) => {},
                focus: (value, model, extra) => {},
                input: (value, model, extra) => {},
                clear: (value, model, extra) => {}
            }
          },
          {
            tag: 'al-input',
            id: 'al-input-id2',
            name: 'al-input-name2',
            classList: ['al-input-class21', 'al-input-class22'],
            styleMap: {},
            hide: false,
            attrs: {
                key: 'son.sonName',
                type: 'textarea',
                minlength: 6,
                maxlength: 60,
                placeholder: '',
                clearable: true,
                showPassword: false,
                rows: 2,
                autosize: true,
                disabled: false,
                readonly: false,
                rules: [],
                label: '儿子姓名',
                labelPosition: 'right',
                labelWidth: ''
            },
            events: {
                change: (value, model, extra) => {},
                blur: (value, model, extra) => {},
                focus: (value, model, extra) => {},
                input: (value, model, extra) => {},
                clear: (value, model, extra) => {}
            }
          }
        ],
        attrs: {
            labelPosition: 'right',
            labelWidth: '100px',
            disabled: false,
            readonly: false,
            loading: false,
            cols: 1
        },
        hooks: {
            beforeSubmit: (model, extra) => {},
            afterSubmit: (model, extra) => {}
        },
        events: {}
        }]
      }
    },
    methods: {
      openDrawer () {
        this.drawerVisible = true
      },
      closeDrawer() {
        this.drawerVisible = false
      }
    }
  }
</script>
```
</docs>
