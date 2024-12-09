import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  //市场的路由
  {
    path: '/market',
    component: () => import('../views/campusMarket/marketView.vue'),
    children: [
      {
        path: 'south',
        component: () => import('../views/campusMarket/southView.vue')
      },
      {
        path: 'north',
        component: () => import('../views/campusMarket/northView.vue')
      }
    ]
  },
  //管理员的路由
  {
    path: '/admin',
    component: () => import('@/views/admin/components/AdminLayout.vue'),
    redirect: '/admin/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'AdminDashboard',
        component: () => import('@/views/admin/components/Dashboard.vue'),
        meta: { title: '管理控制台' }
      },
      {
        path: 'goods',
        name: 'GoodsManage',
        component: () => import('@/views/admin/goods/GoodsLayout.vue'),
        redirect: '/admin/goods/list',
        children: [
          {
            path: 'list',
            name: 'GoodsList',
            component: () => import('@/views/admin/goods/GoodsList.vue'),
            meta: { title: '商品列表' }
          },
          {
            path: 'audit',
            name: 'GoodsAudit',
            component: () => import('@/views/admin/goods/GoodsAudit.vue'),
            meta: { title: '商品审核' }
          }
        ]
      },
      {
        path: 'order',
        name: 'OrderManage',
        component: () => import('@/views/admin/order/OrderLayout.vue'),
        redirect: '/admin/order/list',
        children: [
          {
            path: 'list',
            name: 'OrderList',
            component: () => import('@/views/admin/order/OrderList.vue'),
            meta: { title: '订单列表' }
          },
          {
            path: 'stats',
            name: 'OrderStats',
            component: () => import('@/views/admin/order/OrderStats.vue'),
            meta: { title: '订单统计' }
          }
        ]
      }
    ]
  },
  //个人中心的路由
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/profile/profileView.vue')
  },
  //登录的路由
  {
    path: '/login',
    component: () => import('../views/logIn/logInView.vue')  
  },
  //默认的路由，重定向到登录页面
  {
    path: '/',
    redirect: '/login'
  }
]

const router = new VueRouter({
  routes
})

export default router
