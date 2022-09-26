import axios from 'axios'

const service = axios.create({
  baseURL:'/zhizhi-cms',
  timeout: 5000,
})

// 请求拦截
service.interceptors.request.use((config) => {
  // 修复 对象可能为“未定义”
  config.headers = config.headers || {}
  if (localStorage.getItem('token')) {
    config.headers.token = localStorage.getItem('token') || ''
  }
  return config
})

// 响应拦截
service.interceptors.response.use((res) => {
  const code:number = res.data.code
  if (code != 200 && code != 2000) {
    return Promise.reject(res.data)
  } else {
    return res.data
  }
}, (err) => {
  console.log(err)
})

export default service
