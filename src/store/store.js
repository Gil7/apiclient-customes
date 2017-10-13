import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router/router'


Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    products: [],
    productsForRental: [],
    token: null,
    apiUrl:'https://gilbertomendez.000webhostapp.com/api',
    config: null,
    user: null,


  },
  mutations: {
    setToken (state, payload) {
      state.token = payload
    },
    setUser (state, payload) {
      state.user = payload
    },
    setHeaders (state, payload) {
      state.config = {
        headers: {
          'Authorization': 'Bearer ' + payload
        }
      }
    },
    logoutUser (state) {
      localStorage.clear()
      state.token = null
    }
  },
  actions: {
    loadTokenFromLocalStorage({commit} , payload){
        commit('setToken', payload)
    },
    loadUserFromLocalStorage({commit} , payload){
        commit('setUser', payload)
    },
    loginUser ({ commit, state }, payload) {
      axios.post(state.apiUrl + '/users/authenticate', payload)
        .then(response => {
          const token = response.data.token
          const user = response.data.user
          commit('setToken', token)
          commit('setUser', user)
          localStorage.setItem('jwt',token)
          console.log()
          localStorage.setItem('user', JSON.stringify(user))
          if (user.isAdmin === 1) {
            router.push('/dashboard')
          } else {
            router.push('/sales')
          }
        })
        .catch(error => {
          console.log(error)
          alert('Usuario y/o contraseña incorrecta.')
        })
    },
    logout ({commit}) {
      commit('logoutUser')
      router.push('/')
    }
  },
  getters: {
    token (state) {
      return state.token
    },
    user (state) {
      return state.user
    },
    apiUrl (state) {
      return state.apiUrl
    },
    configHeaders (state) {
      return state.config
    }
  }
})
