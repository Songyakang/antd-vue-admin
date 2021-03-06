import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout'
Vue.use(VueRouter)

  const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/login.vue'),
    icon: 'account-book',
    hidden: true
  },
  {
    path: '/about',
    name: '旅游产品管理',
    component: Layout,
    hidden: false,
    icon: 'customer-service',
    children: [
      {
        path: '/about',
        name: '关于',
        icon: 'customer-service',
        component: () => import('../views/About.vue')
      }
    ]
  },{
    path: '/design',
    name: '拖拽生成页面',
    component: Layout,
    hidden: false,
    icon: 'customer-service',
    children: [
      {
        path: '/design',
        name: '关于',
        hidden: true,
        icon: 'customer-service',
        component: () => import('../views/design')
      }
    ]
  },{
    path: '/nine',
    name: '特殊',
    component: Layout,
    hidden: false,
    icon: 'customer-service',
    children: [
      {
        path: '/nine',
        name: '九宫格动画',
        icon: 'customer-service',
        component: () => import('../views/nine/nine.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
