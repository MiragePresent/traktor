import * as validators from 'vuelidate/lib/validators'

export default class ValidationRule {
  constructor (rule) {
    this.valid = true
    this.name = this._getName(rule)
    this.handler = this.valid ? this._getHandler(rule) : null
  }

  _getName (rule) {
    if (typeof rule === 'string') {
      return rule
    } else if (typeof rule === 'object') {
      return Object.keys(rule)[0]
    }
    return this.__notValid()
  }

  _getHandler (rule) {
    console.log('getting rule :', rule)
    if (typeof rule === 'string') {
      // console.log(rule, this.name, validators[this.name]);
      return validators[this.name]
    } else if (typeof rule === 'object') {
      let args = Object.values(rule)[0]
      if (typeof args === 'object') {
        return validators[this.name](...args)
      } else {
        return validators[this.name](args)
      }
    }
    return this.__notValid()
  }

  __notValid () {
    this.valid = false
  }
}
