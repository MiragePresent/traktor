import {
  SET_USERNAME,
  SET_NAME,
  SET_EMAIL,
  INVALIDATE_DATA
} from './types'

export default {
  [SET_USERNAME] (state, username) {
    state.username = username
  },
  [SET_NAME] (state, name) {
    state.name = name
  },
  [SET_EMAIL] (state, email) {
    state.email = email
  },
  [INVALIDATE_DATA] (state) {
    state.username = null
    state.name = null
    state.email = null
  }
}
