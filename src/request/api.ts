import request from './index'
import { ILoginForm, IEditHotList, IbanUser, IAnswerInt, IRole, IListQuery} from '@/type/type'


// 本地网址
// const testURL = 'https://localhost:8081'
// 服务器网址
const testURL = 'https://www.twivbas.com:8081'

// 登录
export const loginApi = (data: ILoginForm) => {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

// 获取用户信息
export const getUserInfoApi = (data: { token: string}) => {
  return request({
    url: '/user/info',
    method: 'post',
    data
  })
}

// 获取热榜
export const getHotList = () => {
  return request({
    url: `${testURL}/getHotList`,
    method: 'get'
  })
}

// 编辑热榜
export const editHotList = (data:IEditHotList) => {
  return request({
    url: `${testURL}/editHotList`,
    method: 'post',
    data
  })
}

// 获取所有知知用户
export const getUsers = () => {
  return request({
    url: `${testURL}/getUsers`,
    method: 'get'
  })
}

// 封禁知知用户权限
export const banUser = (data: IbanUser) => {
  return request({
    url: `${testURL}/banUser`,
    method: 'put', 
    data
  })
}

// 获取所有问题及回答
export const getQuestions = () => {
  return request({
    url: `${testURL}/getQuestions`,
    method: 'get'
  })
}

// 删除回答
export const delAnswer = (answer_id: string) => {
  return request({
    url: `${testURL}/delAnswer/${answer_id}`,
    method: 'delete'
  })
}

// 修改问题
export const editQuestion = (data: IAnswerInt) => {
  return request({
    url: `${testURL}/editQuestion`,
    method: 'post',
    data
  })
}


// role mocked api
export const getRoutesApi = () => {
  return request({
    url: '/routes',
    method: 'get'
  })
}

export const getRolesApi = () => {
  return request({
    url: '/roles',
    method: 'get'
  })
}

export const addRoleApi = (data: IRole) => {
  return request({
    url: '/role',
    method: 'post',
    data
  })
}

export const updateRoleApi = (id: string, data: IRole) => {
  return request({
    url: `/role/${id}`,
    method: 'put',
    data
  })
}

export const deleteRoleApi = (id: string) => {
  return request({
    url: `/role/${id}`,
    method: 'delete'
  })
}

export const fetchList = (query: IListQuery) => {
  return request({
    url: '/article/list',
    method: 'get',
    params: query
  })
}
