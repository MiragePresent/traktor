import {
  SET_USER
} from './types'

export default {
  [SET_USER] (state, user) {
    Object.assign(state.user, user)
  }
}
