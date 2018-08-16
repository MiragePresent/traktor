import BaseModel from './BaseModel'

export default class Login extends BaseModel {
  fields () {
    return Object.assign(super.fields(), {
      email: '',
      password: '',
      code: ''
    })
  }

  rules () {
    return {
      email: ['required'],
      password: ['required']
    }
  }
}
