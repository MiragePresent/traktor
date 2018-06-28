import BaseModel from './BaseModel'

export default class Register extends BaseModel {
  fields () {
    return Object.assign(super.fields(), {
      name: '',
      email: '',
      phone: '',
      password: ''
    })
  }

  rules () {
    return {
      name: [ 'required', { minLength: 10 } ],
      email: [ 'required', 'email' ]
    }
  }
}
