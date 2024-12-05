import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  //市场的路由
  {
    path: '/market',
    name: 'market',
    component: () => import('../views/campusMarket/marketView.vue'),
    children: [
      {
        path: 'south',
        name: 'south',
        component: () => import('../views/campusMarket/southView.vue')
      },
      {
        path: 'north',
        name: 'north', 
        component: () => import('../views/campusMarket/northView.vue')
      }
    ]
  },
  //管理员的路由
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/admin/adminView.vue')
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
  //默认的路由
  {
    path: '/',
    redirect: '/login'
  }
]

const router = new VueRouter({
  routes
})

export default router
