import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

import ModalSearch from './components/modal-search/modal-search.vue'
import moment from 'moment'
import { http } from './utils'
import * as service from './services'

import singleSpaVue from 'single-spa-vue'
import { navigateToUrl } from 'single-spa'

import ElementUI from 'element-ui'
import './styles/reset.scss'

import AlPageDetail from 'mf-alement/src/components/al-page-detail/al-page-detail'
import AlPageSearch from 'mf-alement/src/components/al-page-search/al-page-search'
import AlForm from 'mf-alement/src/components/al-form/al-form'
import AlTable from 'mf-alement/src/components/al-table/al-table'

Vue.component('AlPageSearch', AlPageSearch)
Vue.component('AlPageDetail', AlPageDetail)
Vue.component('AlForm', AlForm)
Vue.component('AlTable', AlTable)

Vue.use(ElementUI)

// 将公共能力注入到每个vue组件中
Vue.prototype.$http = http
Vue.prototype.$service = service

// 公共组件
export const components = { ModalSearch }

// 第三方包
export { Vue, VueRouter, singleSpaVue, navigateToUrl, Vuex }
export { moment }

export * from './store'
export * from './utils'
export * from './i18n'
export * from './services'
