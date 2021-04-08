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
    path: '/study/upload',
    name: 'Upload',
    component: () => import('@/views/study/Upload'),
    meta:{title:"上传学习资料"}
  },
  {
    path: '/study/catagory',
    name: 'Catagory',
    component: () => import('@/views/study/Catagory'),
    meta:{title:"资料目录"}
  },
  {
    path: '/study/detail:id',
    name: 'StudyDetail',
    component: () => import('@/views/study/StudyDetail'),
    meta:{title:"资料详情"}
  },
  //帖子详情页
  {
    path: '/topic/detail:id',
    name: 'TopicDetail',
    component: () => import('@/components/common/TopicDetail'),
    meta:{title:"帖子详情"}
  },
  // 用户主页
  {
    name: 'user',
    path: '/member/:username/home',
    component: () => import('@/views/user/Profile'),
    meta: { title: '用户主页' }
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
