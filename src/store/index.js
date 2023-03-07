import { createStore } from 'vuex'
import { useRouter } from 'vue-router'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'

const router = useRouter()

const store = createStore({
  state: {
    isAuth: false,
    user: {},
  },
  getters: {
    isAuth: (state) => state.isAuth,
    user: (state) => state.user
  },
  mutations: {
    setAuthStatus(state, status) {
      state.isAuth = status
    },
    setUserData(state, userDataPayload) {
      state.user = userDataPayload
    }
  },
  actions: {
    login({ commit }, credentials) {
      axios.post('http://localhost:3030/auth', credentials)
        .then(response => {
          commit('setUserData', response.data.user)
          commit('setAuthStatus', true)
        })
        .catch(error => {
          console.error('error: ', error)
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