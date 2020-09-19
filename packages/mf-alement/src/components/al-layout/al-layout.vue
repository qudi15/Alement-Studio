<template>
  <div
    v-show="!hide"
    :id="id"
    :name="name"
    :class="computedClassList"
    :style="styleMap"
    class="al-layout"
  >
    <template v-for="(child, index) in children">
      <component
        v-if="isShow(child)"
        :is="child.tag"
        :key="index"
        :value="getAttr(child, 'value')"
        :model="getValue(child)"
        :extra="extra"
        v-bind="{ ...child, ...child.attrs, ...child.hooks }"
        :children="child.children"
        :schema="child"
        :loading="loading"
        v-on="getEvents(child)"
      />
    </template>
  </div>
</template>

<script>
import alButton from '../al-button/al-button'
import alSwitch from '../al-switch/al-switch'
import alCheckbox from '../al-checkbox/al-checkbox'
import alInput from '../al-input/al-input'
import alInputNumber from '../al-input-number/al-input-number'
import alText from '../al-text/al-text'
import alRadio from '../al-radio/al-radio'
import alDate from '../al-date/al-date'
import alIcon from '../al-icon/al-icon'
import alSelect from '../al-select/al-select'
import alTime from '../al-time/al-time'

import containerMixin from '../../mixins/container'
/**
 * 布局组件
 * @displayName Al Layout
 */
export default {
  name: 'al-layout',

  components: {
    alButton,
    alSwitch,
    alCheckbox,
    alInput,
    alInputNumber,
    alText,
    alRadio,
    alDate,
    alIcon,
    alSelect,
    alTime
  },

  mixins: [containerMixin],

  props: {
    /**
     * 子元素在主方向上排列方式，
     * direction为row时为水平排列
     * direction为column时为垂直排列
     * @values start / end / center / around / between
     */
    justifyContent: {
      type: String,
      default: 'start'
    },

    /**
     * 子元素在副方向上排列方式，
     * direction为row时为垂直排列
     * direction为column时为水平排列
     * @values start / end / center
     */
    alignItems: {
      type: String,
      default: 'start'
    },

    /**
     * 子元素的排列方式
     * row为水平排列
     * column为垂直排列
     * @values row / column
     */
    direction: {
      type: String,
      default: 'row'
    },

    /**
     * 加载状态，用于向子组件传递状态
     */
    loading: {
      type: Boolean
    }
  },

  computed: {
    justifyContentClassList () {
      return `justify-content-${this.justifyContent}`
    },

    alignItemsClassList () {
      return `align-items-${this.alignItems}`
    },

    computedClassList () {
      return [
        ...this.classList,
        this.justifyContentClassList,
        this.alignItemsClassList,
        this.direction
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.al-layout {
  display: flex;

  &.column {
    flex-direction: column;
  }

  &.justify-content-end {
    justify-content: flex-end;
  }

  &.justify-content-center {
    justify-content: center;
  }

  &.justify-content-between {
    justify-content: space-between;
  }

  &.justify-content-around {
    justify-content: space-around;
  }

  &.align-items-end {
    align-items: flex-end;
  }

  &.align-items-center {
    align-items: center;
  }
}
</style>

<docs>

基本
```vue
<template>
  <div>
    <al-form :model="model" :fields="fields" />
    <al-layout
      :children="children"
      :direction="model.direction"
      :styleMap="{ height: '200px' }"
      :justifyContent="model.justifyContent"
      :alignItems="model.alignItems"
      :loading="model.loading"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {
        direction: "row",
        justifyContent: "start",
        alignItems: "start",
        loading: false
      },
      fields: [
        {
          attrs: {
            type: "select",
            label: "方向",
            primaryKey: "direction",
            options: [
              { text: "水平", value: "row" },
              { text: "垂直", value: "column" }
            ]
          }
        },
        {
          attrs: {
            type: "select",
            label: "主方向排列",
            primaryKey: "justifyContent",
            options: [
              { text: "start", value: "start" },
              { text: "end", value: "end" },
              { text: "center", value: "center" },
              { text: "between", value: "between" },
              { text: "around", value: "around" }
            ]
          }
        },
        {
          attrs: {
            type: "select",
            label: "副方向排列",
            primaryKey: "alignItems",
            options: [
              { text: "start", value: "start" },
              { text: "end", value: "end" },
              { text: "center", value: "center" }
            ]
          }
        },
        {
          attrs: {
            type: "switch",
            label: "加载",
            primaryKey: "loading"
          }
        }
      ],
      children: [
        {
          tag: "al-button",
          styleMap: {
            width: "100px",
            height: "40px"
          },
          attrs: {
            text: "按钮1"
          }
        },
        {
          tag: "al-button",
          styleMap: {
            width: "100px",
            height: "40px",
            marginLeft: "0"
          },
          attrs: {
            text: "按钮2"
          }
        }
      ]
    };
  }
};
</script>

<style>
</style>
```
</docs>
