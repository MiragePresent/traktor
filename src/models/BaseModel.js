import {only} from '../tools/helpers'
import * as validators from 'vuelidate/lib/validators'
import VueApollo from 'vue-apollo'

export default class BaseModel {
  // Settings
  fields () {
    return {
      valid: false
    }
  }

  rules () {
    return {}
  }

  constructor (data = null) {
    // Set default properties
    this.init()
    // Load data to model
    if (data !== null) {
      this.load(data, true)
    }
  }

  find (id) {
    if (this.query()) {
      VueApollo.query({
        query: this.query(),
        variables: { id }
      })
    }
  }

  load (data, isDefault = false) {
    let filteredData = Object.assign(this.getData(), this.filterData(data))
    Object.assign(this, filteredData)

    // Save as default state
    if (isDefault) {
      this.saveDefaultState(filteredData)
    }
  }

  getData () {
    return only(this, Object.keys(this.fields()))
  }

  // Tools
  query () {
    return null
  }
  clear () {
    for (let fieldName in this.fields()) {
      this.clearField(fieldName)
    }
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

  // Protected methods
  init () {
    // Init attributes with default values
    Object.assign(this, this.fields())
    this.saveDefaultState(this.fields())
  }

  saveDefaultState (state) {
    this.defaultState = state
  }

  filterData (data) {
    return only(data, Object.keys(this.fields()))
  }

  clearField (fieldName) {
    this[fieldName] = this.defaultState[fieldName]
  }
}
