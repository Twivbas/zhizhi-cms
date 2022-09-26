// 自定义指令permission调用的函数，全局注册了
import { useUserStore } from '@/stores/user'

const permissionFnc = (el: HTMLElement, binding: { value: string[] }) => {
  // 放在函数内等pinia创建后即可使用
  const user = useUserStore()
  // 传递给指令的值
  const permissionRoles = binding.value
  const roles = user.roles

  // 使用了ts无需再检测permissionRoles类型
  if (permissionRoles.length > 0) {
    const hasPermission = roles.some(role => {
      return permissionRoles.includes(role)
    })
    if (!hasPermission) {
      el.parentNode && el.parentNode.removeChild(el)
    }
  } else {
    throw new Error('need roles! Like v-permission="[\'admin\',\'editor\']"')
  }
}

export default permissionFnc