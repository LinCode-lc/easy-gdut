import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  //主页
  {
    path: '/',
    name: 'Home',
    // component: () => import('@/views/Main'),
    redirect: { name: 'Main' },
    meta: { title: "C-GDUT" }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/user/Profile')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/auth/Login'),
    meta: { title: "登录" }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/auth/Register'),
    meta: { title: "注册" }
  },
  {
    path: '/myfocus',
    name: 'Myfocus',
    component: () => import('@/views/user/Myfocus'),
    mete: { title: '您的关注' }
  },
  {
    path: '/otheruser',
    name: 'Otheruser',
    component: () => import('@/views/user/OtherProfile'),
    mete: { title: '他人主页' }
  },
  {
    path: '/application',
    name: 'Application',
    component: () => import('@/Application'),
    children: [
      {
        path: '/main',
        name: 'Main',
        component: () => import('@/views/Main'),
        meta: {
          keepAlive: true,
          title: "C-GDUT"
        }
      },
      {
        path: '/study/upload',
        name: 'Upload',
        component: () => import('@/views/study/Upload'),
        meta: { title: "上传学习资料" }
      },
      {
        path: '/study/catagory',
        name: 'Catagory',
        component: () => import('@/views/study/Catagory'),
        meta: { title: "资料目录" }
      },
      {
        path: '/study/detail:id',
        name: 'StudyDetail',
        component: () => import('@/views/study/StudyDetail'),
        meta: { title: "资料详情" }
      },
      //帖子详情页
      {
        path: '/topic/detail/:id',
        name: 'topic-detail',
        component: () => import('@/components/common/TopicDetail'),
        meta: { title: "帖子详情" }
      },
      // 用户主页
      // {
      //   name: 'user',
      //   path: '/member/:username/home',
      //   component: () => import('@/views/user/Profile'),
      //   meta: { title: '用户主页' }
      // },
      {
        path: '/deliver',
        name: 'Deliver',
        component: () => import('@/views/Deliver'),
        meta: { title: "跑腿服务" }
      },
      {
        path: '/group',
        name: 'Group',
        component: () => import('@/views/Group'),
        meta: { title: "校园组队" }
      },
      {
        path: '/trade',
        name: 'Trade',
        component: () => import('@/views/Trade'),
        meta: { title: "闲置交易" }
      },
      // {
      //   path: '/login',
      //   name: 'Login',
      //   component: () => import('@/views/auth/Login'),
      //   meta: { title: "登录" }
      // },

      {
        name: "post-create",
        path: "/post/create",
        component: () => import("@/views/post/Create"),
        meta: { title: "信息发布" },
      },
      {
        name: "post-createtopic",
        path: "/post/createtopic",
        component: () => import("@/views/post/CreateTopic"),
        meta: { title: "信息发布" },
      },
      {
        path: '/forget',
        name: 'Forget',
        component: () => import('@/views/auth/Forget'),
        meta: { title: '找回密码' }
      },
      {
        path: '/update',
        name: 'Update',
        component: () => import('@/views/auth/Update'),
        meta: { title: '信息修改' }
      },
    ]
  },

]

const router = new VueRouter({
  routes
})

export default router
