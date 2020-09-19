<template>
  <div
    v-show="!hide"
    :id="id"
    :name="name"
    :class="classList"
    :style="styleMap"
    class="al-page">
      <component
        v-for="(child, index) in item.children"
        :is="child.tag"
        :key="index"
        :model="getModel(child)"
        :extra="extra"
        v-bind="{ ...child, ...child.attrs, ...child.hooks }"
        :schema="child"
        :children="child.children"
        v-on="getEvents(child)"
      />
  </div>
</template>

<script>

import containerMixin from '../../mixins/container'
/**
 * 页面组件
 * @displayName Al Page
 */
export default {
  name: 'al-page',

  mixins: [containerMixin],
  props: {
  }
}
</script>

<style lang="scss" scoped>

</style>
