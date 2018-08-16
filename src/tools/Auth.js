import store from '@/store'
import {
  CognitoUserPool,
  CognitoUserAttribute,
  AuthenticationDetails,
  CognitoUser
} from 'amazon-cognito-identity-js'
import {
  COGNITO_USER_POOL_ID,
  COGNITO_APP_CLIENT_ID
} from '../config.js'

export default {
  // Configs
  USER_NOT_CONFIRMED: 'UserNotConfirmedException',
  NAME_FIELD: 'name',

  // Check authentication
  handle () {
    let token = localStorage.getItem('token')
    if (token) {
      this.__actions.setToken(token)
      this.__actions.setName(localStorage.getItem('name'))
      this.__actions.setUsername(localStorage.getItem('username'))
    } else {
      // Invalidate user data
      this.__actions.invalidateSession()
    }
  },
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
  authenticate (data, onSuccess, onError) {
    let authData = new AuthenticationDetails({
      Username: data.email,
      Password: data.password
    })
    let cognitoUser = new CognitoUser({
      Username: data.email,
      Pool: this.__userPool()
    })

    cognitoUser.authenticateUser(authData, {
      onSuccess (result) {
        /* Use the idToken for Logins Map when Federating User Pools with identity pools or when passing
                through an Authorization Header to an API Gateway Authorizer */
        this.__actions.setToken(result.getAccessToken().getJwtToken())
        this.__actions.setUsername(cognitoUser.getUsername())
        this.__actions.setName(cognitoUser.getUsername())

        cognitoUser.getUserAttributes((error, result) => {
          if (error) {
            console.warn('User cannot be fetched')
          }
          for (let key in result) {
            if (result[key].getName() === this.NAME_FIELD) {
              this.__actions.setName(result[key].getValue())
            }
          }
        })
      },
      onFailure (error) {
        onError(error)
      }
    })
  },
  logout () {
    let cognitoUser = new CognitoUser({
      Username: this.getUsername(),
      Pool: this.__userPool()
    })
    cognitoUser.signOut()
    this.__actions.invalidateSession()
  },
  confirm (data, callback) {
    let cognitoUser = new CognitoUser({
      Username: data.email,
      Pool: this.__userPool()
    })
    cognitoUser.confirmRegistration(data.code, true, callback)
  },
  getUsername () {
    return this.__storeData.username
  },
  getName () {
    return this.__storeData.name
  },
  getToken () {
    return this.__storeData.token
  },
  isAuthenticated () {
    return !!this.getToken()
  },
  __userPool () {
    return new CognitoUserPool({
      UserPoolId: COGNITO_USER_POOL_ID,
      ClientId: COGNITO_APP_CLIENT_ID
    })
  },
  __registerAttributes ({name, phone, email}) {
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
  },
  __actions: {
    setToken: (token) => store.dispatch('auth/setToken', token),
    setUsername: (username) => store.dispatch('auth/setUsername', username),
    setName: (user) => store.dispatch('auth/setName', user),
    invalidateSession: () => store.dispatch('auth/invalidateSession')
  },
  __storeData: {
    token: store.getters['auth/token'],
    username: store.getters['auth/username'],
    name: store.getters['auth/name']
  }
}
