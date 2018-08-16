import {
  SET_USERNAME,
  SET_NAME,
  SET_TOKEN,
  INVALIDATE_DATA
} from './types'

export default {
  setUsername ({ commit, state }, user) {
    localStorage.setItem('user', user)
    commit(SET_USERNAME, user)
  },
  setName ({ commit, state }, user) {
    localStorage.setItem('user', user)
    commit(SET_NAME, user)
  },
  setToken ({ commit, state }, token) {
    localStorage.setItem('token', token)
    commit(SET_TOKEN, token)
  },
  invalidateSession ({commit}) {
    localStorage.removeItem('token')
    localStorage.removeItem('name')
    localStorage.removeItem('username')
    commit(INVALIDATE_DATA)
  }
}
