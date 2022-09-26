import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import './permission'
import { mockXHR } from './mock/index'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import permissionFnc from '@/directive/permission'
import 'element-plus/dist/index.css'



const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(createPinia()).use(router).mount('#app')

mockXHR()

// 全局注册自定义指令permission
app.directive('permission', permissionFnc)
