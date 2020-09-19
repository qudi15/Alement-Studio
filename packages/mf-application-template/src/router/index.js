
import { Vue, VueRouter } from 'mf-shared-dependencies-vue'
// import BrandManagement from '../views/brand/brand'
// import ProductAttribute from '../views/product-attribute/product-attribute'
// import Category from '../views/category/category'
// import CategoryFront from '../views/category-front/category-front'
Vue.use(VueRouter)

const routes = [
  {
    path: '/template/brand',
    name: 'BrandManagement',
    component: () => import('../views/brand/brand')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
