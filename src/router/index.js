import Vue from 'vue'
import Router from 'vue-router'
import sales from '@/page/sales/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/activity',
      name: 'sales',
      component: sales
    }
  ]
})
