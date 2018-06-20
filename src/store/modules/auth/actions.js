import {
  SET_USER
} from './types'

export default {
  saveUser ({ commit }, user) {
    commit(SET_USER, user)
  }
}
