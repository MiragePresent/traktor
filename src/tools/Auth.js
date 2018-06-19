import {
  CognitoUserPool,
  CognitoUserAttribute
  // CognitoUser
} from 'amazon-cognito-identity-js'
import {
  COGNITO_USER_POOL_ID,
  COGNITO_APP_CLIENT_ID
} from '../config.js'

export default {
  register (data, callback) {
    this.__userPool()
      .signUp(
        data.email,
        data.password,
        this.__registerAttributes(data),
        null,
        callback
      )
  },
  __userPool () {
    return new CognitoUserPool({
      UserPoolId: COGNITO_USER_POOL_ID,
      ClientId: COGNITO_APP_CLIENT_ID
    })
  },
  __registerAttributes ({ name, phone, email }) {
    return [
      new CognitoUserAttribute({
        Name: 'email',
        Value: email
      }),
      new CognitoUserAttribute({
        Name: 'phone_number',
        Value: phone
      }),

      new CognitoUserAttribute({
        Name: 'name',
        Value: name
      })
    ]
  }
}
