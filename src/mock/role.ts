import Mock from 'mockjs'
import { routes } from '@/router'

// mock routes，这里直接用router里的路由了


const roles = [
  {
    key: 'admin',
    name: 'admin',
    description: 'Super Administrator. Have access to view all pages.',
    routes: routes
  },
  {
    key: 'editor',
    name: 'editor',
    description: 'Normal Editor. Can see all pages except permission page',
    routes: routes.filter(i => i.path !== '/permission')  // mock data
  },
  {
    key: 'visitor',
    name: 'visitor',
    description: 'Just a visitor. Can only see the home page and the document page',
    routes: [{
      path: '/',
      redirect: '/home',
      children: [
        {
          path: 'home',
          name: 'home',
          meta: {
            title: '首页',
          },
        },
      ]
    },]
  }
]

export default [
  // mock get all routes form server
  {
    url: '/zhizhi-cms/routes',
    type: 'get',
    response: () => {
      return {
        code: 200,
        data: routes
      }
    }
  },
  // mock get all roles form server
  {
    url: '/zhizhi-cms/roles',
    type: 'get',
    response: () => {
      return {
        code: 200,
        data: roles
      }
    }
  },
  // add role
  {
    url: '/zhizhi-cms/role',
    type: 'post',
    response: {
      code: 200,
      data: {
        key: Mock.mock('@integer(300, 5000)')
      }
    }
  },
  // update role
  {
    url: '/zhizhi-cms/role/[A-Za-z0-9]',
    type: 'put',
    response: {
      code: 200,
      data: {
        status: 'success'
      }
    }
  },
  // delete role
  {
    url: '/zhizhi-cms/role/[A-Za-z0-9]',
    type: 'delete',
    response: {
      code: 200,
      data: {
        status: 'success'
      }
    }
  }
]
