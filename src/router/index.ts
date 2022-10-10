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
  {
    path: '/guide',
    redirect: '/guide/index',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Guide',
        meta: {
          title: 'Guide',
          hidden: false
        },
        component: () => import('../views/guide/guideView.vue'),
      },
    ]
  },
  {
    path: '/icon',
    redirect: '/icon/index',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Icons',
        meta: {
          title: 'Icons',
          hidden: true
        },
        component: () => import('../views/icon/indexView.vue')
      }
    ]
  },
  {
    path: '/components',
    name: 'Components',
    redirect: '/components/index',
    component: Layout,
    meta: {
      title: 'Components'
    },
    children: [
      {
        path: 'index',
        name: 'Index',
        meta: {
          title: 'Index',
          hidden: false
        },
        component: () => import('../views/components/indexView.vue')
      }
    ]
  },
  {
    path: '/charts',
    name: 'Charts',
    redirect: '/charts/keyboard',
    component: Layout,
    meta: {
      title: 'Charts'
    },
    children: [
      {
        path: 'keyboard',
        name: 'Keyboard Chart',
        meta: {
          title: 'Keyboard Chart',
          hidden: false
        },
        component: () => import('../views/charts/keyboardView.vue')
      },
      {
        path: 'line',
        name: 'Line Chart',
        meta: {
          title: 'Line Chart',
          hidden: false
        },
        component: () => import('../views/charts/lineMarker.vue')
      },
      {
        path: 'mix-chart',
        name: 'Mix Chart',
        meta: {
          title: 'Mix Chart',
          hidden: false
        },
        component: () => import('../views/charts/mixChart.vue')
      }
    ]
  },

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
