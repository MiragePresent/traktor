import BaseModel from './BaseModel'

export default class RestorePassword extends BaseModel {
  fields () {
    return {
      email: this.$router.params.user_email
    }
  }
}
