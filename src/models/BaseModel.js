import {only} from '../tools/helpers'
import * as validators from 'vuelidate/lib/validators'

export default class BaseModel {
  constructor () {
    // Set default properties
    this._init()
  }

  fields () {
    return {
      valid: false
    }
  }

  getData () {
    return only(this, Object.keys(this.fields()))
  }

  clear () {
    for (let fieldName in this.fields()) {
      this._clearField(fieldName)
    }
  }

  rules () {
    return {}
  }

  validations () {
    const rules = this.rules()
    const validations = {}

    for (let field in rules) {
      validations[field] = {}
      for (let rule in rules[field]) {
        validations[field][rules[field][rule]] = validators[rules[field][rule]]
      }
    }

    return {model: validations}
  }

  getErrors ($v, field) {
    const errors = []
    const rules = this.rules()[field]

    if (typeof $v.model !== 'undefined' && typeof $v.model[field] !== 'undefined') {
      if ($v.model[field].$dirty) {
        for (let i in rules) {
          if (!$v.model[field][rules[i]]) {
            errors.push(`error ${rules[i]}`)
          }
        }
      }
    }
    return errors
  }

  _init () {
    // Init attributes with default values
    Object.assign(this, this.fields())
    this._saveDefaultState(this.fields())
  }

  _saveDefaultState (state) {
    this._defaultState = state
  }

  _clearField (fieldName) {
    this[fieldName] = this._defaultState[fieldName]
  }
}
