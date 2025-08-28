import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/', // 设置根路径
        name: 'citiaoTask',
        component: () => import('/@/views/homeView.vue'),
        meta: {requiresAuth: true}
    },
    {
        path: '/callback', 
        name: 'callback',
        component: () => import('/@/views/callback.vue'),
        meta: {requiresAuth: false}
    },
    {
        path: '/login', 
        name: 'login',
        component: () => import('/@/components/LoginComponent/login.vue'),
        meta: {requiresAuth: false}
    },
    {
        path: '/:machineNumber',
        name: 'CitiaoTask',
        component: () => import('../views/citiaoTask.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

/** 
router.beforeEach((to, from, next) => {
    const isAuthenticated = !!sessionStorage.getItem('access_token')
    // 需要登录但未认证
    if (to.meta.requiresAuth && !isAuthenticated) {
      next('/login') // 强制跳转到登录页
    } 
    // 已登录时访问登录页
    else if (to.path === '/login' && isAuthenticated) {
      next('/') // 跳转到仪表盘
    } 
    // 正常放行
    else {
      next()
    }
  })
*/
export default router
