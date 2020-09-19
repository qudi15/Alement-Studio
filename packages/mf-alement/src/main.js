import Vue from 'vue'

import App from './App.vue'
import router from './router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import { http } from './utils/mock'

import AlModalSearch from './components/al-input-modal-search/al-input-modal-search'
import AlRichTextEditor from './components/al-rich-text-editor/al-rich-text-editor'

Vue.use(ElementUI)

Vue.component(AlModalSearch.name, AlModalSearch)
Vue.component(AlRichTextEditor.name, AlRichTextEditor)

Vue.prototype.$t = _ => _

Vue.prototype.$http = http

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
