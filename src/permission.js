/* eslint-disable */
import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // 验权

const whiteList = ['/login'] // 不重定向白名单

//用户登录成功之后，我们会在全局钩子router.beforeEach中拦截路由，判断是否已获得token，
// 在获得token之后我们就要去获取用户的基本信息了
router.beforeEach((to, from, next) => {
  NProgress.start() //进度条
  if (getToken()) { //判断是否已获得token
    console.log('getToken True');
    if (to.path === '/login') { //有token 跳转到 /
      next({ path: '/' })
    } else {
        // next();
          //权限拉取
        if (store.getters.roles.length === 0) {
            store.dispatch('GetInfo').then(res => { // 拉取用户信息
              next()
            }).catch(() => {
              store.dispatch('FedLogOut').then(() => {
                Message.error('permission权限 验证失败,请重新登录!!')
                next({ path: '/login' })
              })
            })
        } else {
          next()
        }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})
/*
//演示
router.beforeEach((to, from, next) => {
    NProgress.start() //进度条
    console.log(getToken());
    if (getToken()) { //判断是否已获得token
        console.log('getToken True');
        if (to.path === '/login') { //有token 跳转到 /
            next({ path: '/' })
        } else {
            next()
            //权限拉取

        }
    } else {

        console.log('getToken false');
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next('/login')
            NProgress.done()
        }
    }
})*/

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
