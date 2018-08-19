import {
  SET_USERNAME,
  SET_NAME,
  SET_EMAIL,
  SET_STATUS,
  INVALIDATE_DATA
} from './types'

export default {
  [SET_STATUS] (state, status) {
    state.status = status
  },
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
    state.status = false
    state.username = null
    state.name = null
    state.email = null
  }
}
