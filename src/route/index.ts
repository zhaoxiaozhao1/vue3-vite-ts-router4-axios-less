import { createWebHashHistory, createRouter } from 'vue-router'

const history = createWebHashHistory()
export const router = createRouter({
  history, // 路由模式
  routes: [
    {
      path:'/',
      name:'home',
      component: () => import('../components/HelloWorld.vue')
    },
    {
      // 页面逻辑
      path: '/test',
      name: 'test',
      component: () => import('../page/test.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../page/login.vue')
    },
    {
      path: '/login_new',
      name: 'loginNew',
      component: () => import('../page/login_v3.vue')
    }
  ]
})
 