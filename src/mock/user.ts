interface IConfig {
  body: string
}

const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'super administrator',
    avatar: '',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: '',
    name: 'Normal Editor'
  }
} 

export default [
  // user login
  {
    url: '/zhizhi-cms/user/login',
    type: 'post',
    response: (config: IConfig) => {
      const body = JSON.parse(config.body)
      const { username } = body

      // Element implicitly has an 'any' type because expression of type 'string' can't be used to index type ?
      const { token } = tokens[username as keyof typeof tokens]

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        }
      }

      return {
        code: 200,
        data: {
          token
        }
      }
    }
  },
  // get user info
  {
    url: '/zhizhi-cms/user/info',
    type: 'post',
    response: (config: IConfig) => {
      const body = JSON.parse(config.body)
      const { token } = body
      const info = users[token as keyof typeof users]
      
      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }
      return {
        code: 200,
        data: info
      }
    }
  },
]