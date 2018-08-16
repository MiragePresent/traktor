import {
  SET_USERNAME,
  SET_NAME,
  SET_TOKEN,
  INVALIDATE_DATA
} from './types'

export default {
  [SET_USERNAME] (state, user) {
    state.user = user
  },
  [SET_NAME] (state, user) {
    state.user = user
  },
  [SET_TOKEN] (state, token) {
    state.token = token
  },
  [INVALIDATE_DATA] (state) {
    state.username = null
    state.name = null
    state.token = null
  }
}
