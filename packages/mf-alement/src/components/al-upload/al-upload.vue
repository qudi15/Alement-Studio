<template>
<div>
  <al-button v-if="!hideUploadBtn && !autoUpload" size="small" type="primary" @click="submit" :text="uploadBtnText" />

  <template v-for="(child, index) in children">
    <component
      v-if="isShow(child) && child.slot === 'upload'"
      :is="child.tag"
      :key="index"
      :value="getAttr(child, 'value')"
      :model="getValue(child)"
      :extra="extra"
      v-bind="{ ...child, ...child.attrs, ...child.hooks }"
      :children="child.children"
      :schema="child"
      v-on="getEvents(child)"
    />
  </template>

  <el-upload
    ref="upload"
    :action="action"
    :class="classList"
    :style="styleMap"
    :list-type="type"
    :accept="accept"
    :disabled="disabled"
    :multiple="multiple"
    :limit="limit"
    :headers="headers"
    :auto-upload="autoUpload"
    :before-upload="beforeUploadHook"
    :data="data"
    :file-list="value"
    :show-file-list="showFileList"
    @on-preview="onPreview"
    @on-remove="onRemove"
    @on-success="onSuccess"
    @on-error="onError"
  >
    <al-button v-if="!hideSelectBtn && type === 'text'" size="small" :text="selectBtnText" />
    <i class="el-icon-plus" v-if="!hideSelectBtn && type === 'picture-card'"></i>

    <template v-for="(child, index) in children">
      <component
        v-if="isShow(child) && child.slot === 'trigger'"
        :is="child.tag"
        :key="index"
        :value="getAttr(child, 'value')"
        :model="getValue(child)"
        :extra="extra"
        v-bind="{ ...child, ...child.attrs, ...child.hooks }"
        :children="child.children"
        :schema="child"
        v-on="getEvents(child)"
      />
    </template>

    <div slot="tip" class="el-upload__tip">{{tips}}</div>
  </el-upload>
</div>
</template>

<script>
import containerMixin from '../../mixins/container'
import submitMixin from '../../mixins/submit'
/**
 * 上传组件
 * @displayName Al Upload
 */
export default {
  name: 'al-upload',

  mixins: [
    containerMixin,
    submitMixin
  ],

  props: {

    /**
     * 是否选择完文件自动上传
     */
    autoUpload: {
      type: Boolean
    },

    /**
     * 可上传的文件类型
     */
    accept: {
      type: String
    },

    /**
     * 允许多文件上传
     */
    multiple: {
      type: Boolean
    },

    /**
     * 上传请求头
     */
    headers: {
      type: Object
    },

    /**
     * 上传时额外字段
     */
    data: {
      type: Object
    },

    /**
     * 最大允许上传个数
     */
    limit: {
      type: Number
    },

    /**
     * 文件列表
     */
    value: {
      type: Array
    },

    /**
     * 是否显示文件列表
     */
    showFileList: {
      type: Boolean,
      default: true
    },

    /**
     * 列表类型
     * @value string
     */
    type: {
      type: String,
      default: 'text'
    },

    /**
     * action地址
     */
    action: {
      type: String,
      default: ''
    },

    /**
     * 禁用状态
     */
    disabled: {
      type: Boolean,
      default: false
    },

    /**
     * 提示文字
     * @value string
     */
    tips: {
      type: String,
      default: ''
    },

    /**
     * 隐藏选取按钮
     */
    hideSelectBtn: {
      type: Boolean
    },

    /**
     * 默认选取按钮的文字
     */
    selectBtnText: {
      type: String,
      default: '选取文件'
    },

    /**
     * 隐藏默认的上传按钮
     */
    hideUploadBtn: {
      type: Boolean
    },

    /**
     * 上传按钮的文字
     */
    uploadBtnText: {
      type: String,
      default: '上传'
    },

    /**
     * 上传前的hook
     */
    beforeUploadHook: {
      type: Function,
      default () {
        return _ => _
      }
    }
  },
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
    onPreview (file) {
      /**
       * 文件被点击时
       * @event onPreview
       */
      this.$emit('onPreview', file)
    },

    onRemove (file, fileList) {
      /**
       * 文件被删除时
       * @event onPreview
       */
      this.$emit('onRemove', file, fileList)
    },

    onSuccess (response, file, fileList) {
      /**
       * 文件上传成功时
       * @event onSuccess
       */
      this.$emit('onSuccess', response, file, fileList)
    },

    onError (err, file, fileList) {
      /**
       * 文件上传失败时
       * @event onError
       */
      this.$emit('onError', err, file, fileList)
    },

    submit () {
      this.$refs.upload.submit()
    }
  }
}
</script>
<docs>

手动上传

```vue
<template>
  <al-upload :value="value" :beforeUploadHook="beforeUploadHook" />
</template>

<script>
export default {
  data () {
    return {
      value: []
    }
  },
  methods: {
    beforeUploadHook (files) {
      console.log('beforeUploadHook', files)

      // http here
      setTimeout(() => {
        [...files].forEach(file => {
          this.value.push({
            name: file.name
          })
        })
      }, 1000)

      return false
    }
  }
}
</script>
```

不同的类型

```vue
<template>
  <al-upload :value="value" :beforeUploadHook="beforeUploadHook" type="picture-card" />
</template>

<script>
export default {
  data () {
    return {
      value: []
    }
  },
  methods: {
    beforeUploadHook (files) {
      return false
    }
  }
}
</script>
```

自定义按钮及主动调用上传方法

```vue
<template>
  <al-upload :value="value" :beforeUploadHook="beforeUploadHook" :hideUploadBtn="true" :hideSelectBtn="true" :children="schema.children" :schema="schema" />
</template>

<script>
export default {
  data () {
    return {
      value: [],

      schema: {
        tag: 'al-upload',

        children: [
          {
            tag: 'al-button',
            slot: 'trigger',
            attrs: {
              text: '自定义选取按钮'
            }
          },
          {
            tag: 'al-button',
            slot: 'upload',
            attrs: {
              text: '自定义上传按钮'
            },
            events: {
              onClick: () => {
                this.schema.methods.submit()
              }
            }
          }
        ]
      }

    }
  },
  methods: {
    beforeUploadHook (files) {
      console.log('beforeUploadHook called')
      return false
    }
  }
}
</script>
```

</docs>
