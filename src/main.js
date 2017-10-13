import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import { store } from './store/store'
import Navbar from './components/Navbar.vue'
import axios from 'axios'
import VueCharts from 'vue-chartjs'

new Vue({
  el: '#app',
  router,
  store,
  components: {
    'v-navbar': Navbar
  },
  render: h => h(App),
  created () {
    if (localStorage.getItem("jwt") === null) {
      router.push('/')
    } else {
      const jwt = localStorage.getItem('jwt')
      const user = JSON.parse(localStorage.getItem('user'))
      this.$store.dispatch('loadTokenFromLocalStorage', jwt)
      this.$store.dispatch('loadUserFromLocalStorage', user)
      if (user.isAdmin) {
        router.push('/dashboard')
      } else {
        router.push('/sales')
      }
    }
  }
})
