import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Layout from '../views/LayoutView.vue'

export const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    meta: {
      hidden: true,
    },
    component: () => import('../views/login/loginView.vue'),
  },
  {
    path: '/',
    redirect: '/home',
    component: Layout,
    children: [
      {
        path: 'home',
        name: 'Home',
        meta: {
          title: '首页',
          hidden: false
        },
        component: () => import('../views/HomeView.vue'),
      },
    ]
  },
  {
    path: '/zhizhi',
    name: 'Zhizhi',
    component: Layout,
    redirect: '/zhizhi/editHotList',
    meta: {
      title: '知知小程序'
    },
    children: [
      {
        path: 'editHotList',
        name: 'EditHotList',
        meta: {
          title: '编辑热榜',
        },
        component: () => import('../views/zhizhi/editHotList.vue'),
      },
      {
        path: 'banUser',
        name: 'BanUser',
        meta: {
          title: '封禁用户',
        },
        component: () => import('../views/zhizhi/banUser.vue'),
      },
      {
        path: 'editAnswer',
        name: 'EditAnswer',
        meta: {
          title: '编辑回答',
        },
        component: () => import('../views/zhizhi/editAnswer.vue'),
      },
    ]
  },
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    name: 'Permission',
    meta: {
      title: 'Permission',
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/pageView.vue'),
        name: 'PagePermission',
        meta: {
          title: 'Page Permission',
          roles: ['admin']
        }
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/directiveView.vue'),
        name: 'DirectivePermission',
        meta: {
          title: 'Directive Permission'
        }
      },
      {
        path: 'role',
        component: () => import('@/views/permission/roleView.vue'),
        name: 'RolePermission',
        meta: {
          title: 'Role Permission',
          roles: ['admin']
        }
      }
    ]
  },
  {
    path: '/error',
    // name: 'ErrorPages',
    // component: Layout,
    // meta: {
    //   title: 'Error Pages',
    //   hidden: true
    // },
    children: [
      {
        path: '404',
        component: () => import('@/views/error/404View.vue'),
        name: 'Page404',
        meta: { 
          title: '404',
          hidden: true
        }
      }
    ]
  },
  // test
  // {
  //   path: '/tab',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/tab/indexView.vue'),
  //       name: 'Tab',
  //       meta: { title: 'Tab' }
  //     }
  //   ]
  // },
  // 404 page must be placed at the end !!!
  // Uncaught Error: Catch all routes ("*") must now be defined using a param with a custom regexp.
  { 
    path: '/:catchAll(.*)', 
    redirect: '/error/404', 
    meta: {
      hidden: true,
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
