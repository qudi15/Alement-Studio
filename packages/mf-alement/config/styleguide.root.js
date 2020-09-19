import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = []

const router = new VueRouter({
  routes
})

export default previewComponent => {
  // https://vuejs.org/v2/guide/render-function.html
  return {
    router,
    render (createElement) {
      return createElement(previewComponent)
    }
  }
}
