import { only } from '../tools/helpers'

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
  isValid () {
    return false
  }
  _init () {
    // Init attributes with default values
    Object.assign(this, this.fields())
  }
}
