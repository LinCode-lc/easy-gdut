import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  //主页
  {
    path: '/',
    name: 'Main',
    component: () => import('@/views/Main')
  },
 
  {
    path: '/study',
    name: 'Study',
    component: () => import('@/views/Study'),
    meta:{title:"学习资料"}
  },
  {
    path: '/deliver',
    name: 'Deliver',
    component: () => import('@/views/Deliver'),
    meta:{title:"跑腿服务"}
  },
  {
    path: '/group',
    name: 'Group',
    component: () => import('@/views/Group'),
    meta:{title:"校园组队"}
  },
  {
    path: '/trade',
    name: 'Trade',
    component: () => import('@/views/Trade'),
    meta:{title:"闲置交易"}
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/auth/Login'),
    meta:{title:"登录"}
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/auth/Register'),
    meta:{title:"注册"}
  },
]

const router = new VueRouter({
  routes
})

export default router
