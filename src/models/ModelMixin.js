import BaseModel from './BaseModel'

export default {
  data () {
    return {
      model: new BaseModel()
    }
  },
  validations () {
    return this.model.validations()
  },

  mounted () {
    console.log(this.model.validations())
  }
}
