import Mock from 'mockjs'
import user from './user'
import role from './role'
import article from './article'

/* function param2Obj(url: string) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
    return {}
  }
  const obj: { [name: string]: string} = {}
  const searchArr = search.split('&')
  searchArr.forEach(v => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
} */

export const mocks = [...user, ...role, ...article]

export function mockXHR() {
  // Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
  // Mock.XHR.prototype.send = function () {
  //   if (this.custom.xhr) {
  //     this.custom.xhr.withCredentials = this.withCredentials || false

  //     if (this.responseType) {
  //       this.custom.xhr.responseType = this.responseType
  //     }
  //   }
  //   this.proxy_send(...arguments)
  // }

  // function XHR2ExpressReqWrap(respond) {
  //   return function(options) {
  //     let result = null
  //     if (respond instanceof Function) {
  //       const { body, type, url } = options
  //       // https://expressjs.com/en/4x/api.html#req
  //       result = respond({
  //         method: type,
  //         body: JSON.parse(body),
  //         query: param2Obj(url)
  //       })
  //     } else {
  //       result = respond
  //     }
  //     return Mock.mock(result)
  //   }
  // }

  for (const i of mocks) {
    Mock.mock(new RegExp(i.url), i.type || 'get', i.response)
  }
}

