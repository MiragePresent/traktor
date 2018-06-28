import { validationMixin } from 'vuelidate'
import { only } from '../tools/helpers'
import ValidationRule from '../tools/ValidationRule'
import ModelMixin from './ModelMixin'

export default class BaseModel {
  constructor () {
    // Set default properties
    this._init()
  }

  static mixins () {
    console.log('mixins method')
    return [ validationMixin, ModelMixin ]
  }

  fields () {
    return {
      valid: false
    }
  }

  rules () {
    return {}
  }

  validations () {
    return {
      model: this._processRules()
    }
  }

  getData () {
    return only(this, Object.keys(this.fields()))
  }

  getErrors (field, vuelidate) {
    let errors = []
    console.log(`getting field ${field}`)

    if (typeof vuelidate.model !== 'undefined') {
      console.log('exists model')
      if (!vuelidate.model[field].$dirty) {
        console.log('field is clear')
        return errors
      } else {
        for (let rule of this.rules()[field]) {
          if (typeof rule === 'object') {
            rule = Object.keys(rule)[0]
          }
          console.log(vuelidate.model[field])
          if (typeof vuelidate.model[field][rule] !== 'undefined') {
            console.log('hereafklasndl')
            !vuelidate.model[field][rule] && errors.push(`${rule} error`)
          }
        }
      }
    }
    return errors
  }

  isValid () {
    return false
  }

  _init () {
    // Init attributes with default values
    Object.assign(this, this.fields())
  }

  _processRules () {
    const rules = this.rules()
    const handlers = {}

    for (let fieldName in rules) {
      // Get validators from validation object data
      handlers[fieldName] = this._getFieldValidators(rules[fieldName])
    }
    return handlers
  }

  _getFieldValidators (data) {
    let validators = {}
    for (let i in data) {
      let rule = new ValidationRule(data[i])
      if (rule.valid) {
        validators[rule.name] = rule.hanler
      } else {
        // console.log(rule.handler);
      }
    }
    return validators
  }
}
