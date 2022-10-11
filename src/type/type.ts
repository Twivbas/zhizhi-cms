import { RouteRecordRaw } from 'vue-router'

export interface ILoginForm {
  username: string
  password: string
}

export interface IEditHotList {
  '_id': string
  'newAnswerCount': number
}

export interface IbanUser {
  user_id: string
  isAbleAnswer: boolean
  isAbleLike: boolean
}

export interface IAnswerInt {
  question_id?: string
  title?: string
  desc?: string
  answer_id?: string
}

export interface IRole {
  key: string
  name: string
  description: string
  routes: RouteRecordRaw[]
}

export interface ITreeData {
  path: string
  title?: string
  children?: ITreeData[],
  isLeaf?: boolean,
  meta?: {
    title?: string,
    hidden?: boolean
  }
}

export interface IListQuery {
  page: number
  limit: number
}
