export default {
  props: {

    /**
     * 元素唯一id
     */
    id: {
      type: String,
      default: ''
    },

    /**
     * 元素名
     */
    name: {
      type: String,
      default: ''
    },

    /**
     * class列表
     */
    classList: {
      type: Array,
      default () {
        return []
      }
    },

    /**
     * inline style
     */
    styleMap: {
      type: Object,
      default () {
        return {}
      }
    },

    /**
     * 元素是否隐藏
     */
    hide: {
      type: [Boolean, Function],
      default: false
    },

    /**
     * 子元素
     */
    children: {
      type: Array,
      default () {
        return []
      }
    },

    /**
     * 节点的完整schema
     */
    schema: {
      type: Object,
      default () {
        return {}
      }
    }
  },

  methods: {
    mixMethod (methodName, method) {
      const schema = this.schema

      // merge methods
      const methods = Object.assign({}, schema.methods, {
        [methodName]: method
      })

      schema.methods = methods
    }
  }
}
