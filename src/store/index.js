import { createStore } from 'vuex'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'

const store = createStore({
  state: {
    isAuth: false,
    user: {},
    company: {}
  },
  getters: {
    isAuth: (state) => state.isAuth,
    user: (state) => state.user,
    company: (state) => state.company
  },
  mutations: {
    setAuthStatus(state, status) {
      state.isAuth = status
    },
    setUserData(state, loginResponse) {
      const { _id, firstLastName, email, createdAt, photo } = loginResponse
      const { company } = loginResponse
  
      state.user = {
        _id,
        firstLastName,
        email,
        createdAt,
        photo
      }

      state.company = company
    }
  },
  actions: {
    login({ commit }, credentials) {
      return new Promise((resolve, reject) => {
        axios.post('http://localhost:3030/auth', credentials)
          .then(response => {
            commit('setUserData', response.data.user)
            commit('setAuthStatus', true)
            resolve(response.status)
          })
          .catch(error =>  reject(error))
      })
    },
    logout({ commit }) {
      commit('setUserData', {})
      commit('setAuthStatus', false)
    }
  },
  modules: {},
  plugins: [createPersistedState()]
})

export default store