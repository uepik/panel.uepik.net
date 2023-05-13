import { createStore } from 'vuex'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'

axios.defaults.baseURL = `${import.meta.env.RENDER_API_URL}` || 'http://localhost:3030'

const store = createStore({
  state: {
    isAuth: false,
    user: {},
    company: {},
    transactions: []
  },
  getters: {
    isAuth: (state) => state.isAuth,
    user: (state) => state.user,
    company: (state) => state.company,
    transactions: (state) => state.transactions
  },
  mutations: {
    setAuthStatus(state, status) {
      state.isAuth = status
    },
    setTransactionsList(state, transactions) {
      state.transactions = transactions
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
    login({ commit, dispatch }, credentials) {
      return new Promise((resolve, reject) => {
        axios.post('/auth', credentials)
          .then(response => {
            commit('setUserData', response.data.user)
            commit('setAuthStatus', true)
            dispatch('getTransactions')
            resolve(response.status)
          })
          .catch(error =>  reject(error))
      })
    },
    logout({ commit }) {
      commit('setUserData', {})
      commit('setAuthStatus', false)
    },
    getTransactions({ commit, state }) {
      return new Promise((resolve, reject) => {
        axios.get(`/transactions/${state.user._id}`)
          .then(response => {
            console.log(response.data)
            commit('setTransactionsList', response.data)
            resolve(response.data)
          })
          .catch(error =>  reject(error))
      })
    }
  },
  modules: {},
  plugins: [createPersistedState()]
})

export default store