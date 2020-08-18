import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Layout from '@/layout'
Vue.use(VueRouter)

  const routes = [
  {
    path: '/login',
    name: 'login',
    component: Home,
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
  },
  {
    path: '/about',
    name: '商品管理',
    component: Layout,
    hidden: false,
    icon: 'customer-service',
    children: [
      {
        path: '/about',
        name: '关于1',
        icon: 'customer-service',
        component: () => import('../views/About.vue')
      }
    ]
  },
  {
    path: '/about',
    name: '用户管理',
    component: Layout,
    hidden: false,
    icon: 'customer-service',
    children: [
      {
        path: '/about',
        name: '关于2',
        icon: 'customer-service',
        component: () => import('../views/About.vue')
      }
    ]
  },
  {
    path: '/about',
    name: '分销管理',
    component: Layout,
    hidden: false,
    children: [
      {
        path: '/about',
        name: '关于3',
        component: () => import('../views/About.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
