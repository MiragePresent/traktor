import store from '@/store'
import {
  CognitoUserPool,
  CognitoUserAttribute,
  AuthenticationDetails,
  CognitoUser
} from 'amazon-cognito-identity-js'
import { aws as awsConfig } from '../config.js'

export default {
  // Configs
  USER_NOT_CONFIRMED: 'UserNotConfirmedException',
  handle () {
    // Check authentication
    let cognitoUser = this.getUserPool().getCurrentUser()
    if (cognitoUser !== null) {
      cognitoUser.getSession(err => {
        if (!err) {
          // Set status as authenticated
          this.actions.setStatus(true)
          // Get user info
          cognitoUser.getUserAttributes((err, userData) => {
            if (!err) {
              for (let data of userData) {
                if (data.getName() === 'sub') {
                  this.actions.setUsername(data.getValue())
                } else if (data.getName() === 'name') {
                  this.actions.setName(data.getValue())
                } else if (data.getName() === 'email') {
                  this.actions.setEmail(data.getValue())
                }
              }
            }
          })
        }
      })
    }
  },
  register (data, callback) {
    this.getUserPool()
      .signUp(
        data.email,
        data.password,
        this.handleRegisterAttributes(data),
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
      Pool: this.getUserPool()
    })

    cognitoUser.authenticateUser(authData, {
      onSuccess (result) {
        /* Use the idToken for Logins Map when Federating User Pools with identity pools or when passing
        through an Authorization Header to an API Gateway Authorizer */
        this.actions.setToken(result.getAccessToken().getJwtToken())
        this.actions.setUsername(cognitoUser.getUsername())
        this.actions.setName(cognitoUser.getUsername())

        cognitoUser.getUserAttributes((error, result) => {
          if (error) {
            console.warn('User cannot be fetched')
          }
          for (let key in result) {
            if (result[key].getName() === this.NAME_FIELD) {
              this.actions.setName(result[key].getValue())
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
      Pool: this.getUserPool()
    })

    cognitoUser.signOut()
    this.actions.invalidateSession()
  },
  confirm (data, callback) {
    let cognitoUser = new CognitoUser({
      Username: data.email,
      Pool: this.getUserPool()
    })
    cognitoUser.confirmRegistration(data.code, true, callback)
  },
  getUsername () {
    return this.storeData.username()
  },
  getName () {
    return this.storeData.name()
  },
  isAuthenticated () {
    return this.storeData.status()
  },
  getUserPool () {
    if (typeof this.pool !== 'object') {
      this.pool = new CognitoUserPool({
        UserPoolId: awsConfig.poolId,
        ClientId: awsConfig.clientId
      })
    }

    return this.pool
  },
  handleRegisterAttributes ({name, phone, email}) {
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
  actions: {
    setStatus: (status) => store.dispatch('auth/setStatus', status),
    setEmail: (email) => store.dispatch('auth/setEmail', email),
    setUsername: (username) => store.dispatch('auth/setUsername', username),
    setName: (name) => store.dispatch('auth/setName', name),
    invalidateSession: () => store.dispatch('auth/invalidateSession')
  },
  storeData: {
    status: () => store.getters['auth/status'],
    email: () => store.getters['auth/email'],
    username: () => store.getters['auth/username'],
    name: () => store.getters['auth/name']
  }
}
