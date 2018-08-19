import {
  SET_USERNAME,
  SET_NAME,
  SET_EMAIL,
  SET_STATUS,
  INVALIDATE_DATA
} from './types'

export default {
  setStatus ({ commit }, status) {
    commit(SET_STATUS, status)
  },
  setUsername ({ commit }, user) {
    commit(SET_USERNAME, user)
  },
  setName ({ commit }, name) {
    commit(SET_NAME, name)
  },
  setEmail ({ commit }, email) {
    commit(SET_EMAIL, email)
  },
  invalidateSession ({commit}) {
    commit(INVALIDATE_DATA)
  }
}
