import { loginApi, getUserInfoApi } from '@/request/api'
import { defineStore } from 'pinia'
import { routes } from '@/router'
import { RouteRecordRaw } from 'vue-router'
import { ILoginForm } from '@/type/type'

export const useUserStore = defineStore('user', {
  state: () => ({
    name: '',
    introduction: '',
    avatar: '',
    token: '' || localStorage.getItem('token'),
    roles: [] as string[],
    allRoutes : [] as RouteRecordRaw[],
    filteredRoutes: [] as RouteRecordRaw[]
  }),
  getters: {

  },
  actions: {
    login(ruleForm: ILoginForm) {
      return new Promise((resolve, reject) => {
        loginApi(ruleForm).then((res) => {
          // console.log('login', res)
          this.token = res.data.token
          localStorage.setItem('token', res.data.token)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    logout() {
      localStorage.removeItem('token')
      this.token = ''
      this.roles = []
    },
    // get user info
    getInfo() {
      return new Promise((resolve, reject) => {
        const param = {
          token: this.token as string
        }
        getUserInfoApi(param).then(response => {
          // 为什么不输出？？？因为getUserInfoApi(param)返回的code不对
          const { data } = response

          if (!data) {
            reject('Verification failed, please Login again.')
          }

          const { roles, name, avatar, introduction } = data

          // roles must be a non-empty array
          if (!roles || roles.length <= 0) {
            reject('getInfo: roles must be a non-null array!')
          }
          // 保持user信息
          this.roles = roles
          this.name = name
          this.avatar = avatar
          this.introduction = introduction
          // 根据roles修改路由

          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    generateRoutes() {
      if (this.roles.length < 1) {
        return 
      }
      this.allRoutes = routes
      if (this.roles.includes('admin')) {
        this.filteredRoutes = this.allRoutes
      } else {
        this.filteredRoutes = filterAsyncRoutes(this.allRoutes, this.roles)
      }
      // this.filteredRoutes = this.filteredRoutes.filter(route => route.meta?.title)
    },
    async changeRoles(role: string) {
      const token = `${role}-token`
      this.token = token
      localStorage.setItem('token', this.token) 
      await this.getInfo()
      await this.generateRoutes()
    }
  }
})

const hasPermission = (roles: string[], route: RouteRecordRaw) => {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta && (route.meta.roles as string[]).includes(role))
  } else {
    return true
  }
}

// 根据roles过滤路由
const filterAsyncRoutes = (routes: RouteRecordRaw[], roles: string[]) => {
  const res: RouteRecordRaw[] = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  return res
}
