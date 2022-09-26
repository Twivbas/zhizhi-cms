import router from '@/router/index'
import { useUserStore } from '@/stores/user'


const noNeedTokenPath: string[] = ['/login']

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()
  const hasToken: string | null = userStore.token

  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      const hasRoles = userStore.roles && userStore.roles.length > 0   
      if (hasRoles) {
        next()
      } else {
        try {
          await userStore.getInfo()
          // generate accessible routes map based on roles
          await userStore.generateRoutes()
          next({...to, replace: true})
        } catch (error) {
          console.log('error', error)
          next()
        }
      }
    }

  } else if (!hasToken && noNeedTokenPath.indexOf(to.path) !== -1) {
    // 去无需token的路由
    next()
  } else {
    next({ path: '/login' })
  }
})
