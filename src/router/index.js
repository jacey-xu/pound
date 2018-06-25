/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'
// import Login from '@/views/login'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [

/*  {
    path: '/login',
    name: 'login',
    component: Login
  },*/
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/404', component: _import('404'), hidden: true },
  { path: '/chukudan/id/companyName/carUser/carNum/inTime/outTime/commodityName/nullWeight/weight/totalWeight/salesPrice/haveMoney/remark/ ',name: 'chukudan', component: _import('chukudan'), hidden: true },

  {
    path: '/admin',
    component: Layout,
    redirect: '/admin/user',
    name: 'ADMIN',
    meta: {title: '管理员', icon: 'sys'},
    children: [
      {path: 'user', name: 'user', component: _import('admin/user'), meta: {title: '财务设置', icon: 'right'}},
      {path: 'commodity', name: 'commodity', component: _import('admin/commodity'), meta: {title: '货种设置', icon: 'right'}},
      {path: 'ledcontent', name: 'ledcontent', component: _import('admin/LedContent'), meta: {title: 'LED提示设置', icon: 'right'}},
      // {path: 'saycontent', name: 'saycontent', component: _import('admin/SayContent'), meta: {title: '语音提示设置', icon: 'right'}},
      {path: 'sellStatistics', name: 'sellStatistics', component: _import('admin/sellStatistics'), meta: {title: '销售数据统计', icon: 'right'}},
      {path: 'companyStatistics', name: 'companyStatistics', component: _import('admin/companyStatistics'), meta: {title: '客户数据统计', icon: 'right'}},
      {path: 'hardware', name: 'hardware', component: _import('admin/hardware'), meta: {title: '硬件逻辑设置', icon: 'right'}}
    ]
  },

    {
        path: '/avatar',
        component: Layout,
        redirect: '/avatar/custom',
        name: 'AVATAR',
        meta: {title: '财务员', icon: 'example'},
     children: [
            // {path: 'custom', name: 'custom', component: _import('avatar/custom'), meta: {title: '客户公司设置', icon: 'right'}},
            {path: 'custom', name: 'custom', component: _import('avatar/custom'), meta: {title: '客户列表管理', icon: 'right'}},
            {path: 'driver', name: 'driver', component: _import('avatar/driver'), meta: {title: '客户车辆管理', icon: 'right'}},
         {path: 'commodities', name: 'commodities', component: _import('avatar/commodities'), meta: {title: '客户货种设定', icon: 'right'}},
         {path: 'recharge', name: 'recharge', component: _import('avatar/recharge'), meta: {title: '客户预存充值', icon: 'right'}},
            {path: 'pickup', name: 'pickup', component: _import('avatar/pickup'), meta: {title: '客户提货设置', icon: 'right'}},
            {path: 'pickupList', name: 'pickupList', component: _import('avatar/pickupList'), meta: {title: '客户提货记录', icon: 'right'}},
            {path: 'summarize', name: 'summarize', component: _import('avatar/summarize'), meta: {title: '财务数据统计', icon: 'right'}},
            // {path: 'hardware', name: 'hardware', component: _import('user/hardware'), meta: {title: '硬件逻辑设置', icon: 'right'}}
        ]
    },
    {
        path: '/fields',
        component: Layout,
        redirect: '/fields/weighbridgeA',
        name: 'points',
        meta: {title: '现场环境', icon: 'tree'},
        children: [
            {path: 'weighbridgeA', name: 'weighbridgeA', component: _import('fields/weighbridgeA'), meta: {title: '地磅A', icon: 'right'}},
            {path: 'weighbridgeAlist', name: 'weighbridgeAlist', component: _import('fields/weighbridgeAlist'), meta: {title: '地磅A记录', icon: 'right'}},
            {path: 'weighbridgeB', name: 'weighbridgeB', component: _import('fields/weighbridgeB'), meta: {title: '地磅B', icon: 'right'}},
            // {path: 'hardware', name: 'hardware', component: _import('user/hardware'), meta: {title: '硬件逻辑设置', icon: 'right'}}
        ]
    },
/*    {
        path: '/',
        component: Layout,
        redirect: '/admin/user',
    },*/
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: _import('dashboard/index')
    }]
  },
/*

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: _import('table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: _import('tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },
  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: _import('form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },
*/

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

