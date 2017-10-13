<template lang="html">
  <div class="">
    <ul id="slide-out" class="side-nav fixed  orange lighten-5" v-if="isAuthenticated">
        <li><div class="user-view">
        <div class="background">
            <img src="http://materializecss.com/images/office.jpg">
        </div>
        <img class="circle" src="https://d30y9cdsu7xlg0.cloudfront.net/png/17241-200.png">
        <span class="white-text name">{{user.username}}</span>
        <span class="white-text email">{{user.email}}</span>
        </div></li>
        <li v-if="isAdmin">
            <router-link :to="{ path: '/dashboard' }"><i class="material-icons">cloud</i> Inicio</router-link>
        </li>
        <li v-if="isAdmin">
            <router-link :to="{ path: '/products' }"><i class="material-icons">store</i> Productos</router-link>
        </li>
        <li>
            <router-link :to="{ path: '/sales' }"><i class="material-icons">shopping_cart</i> Ventas</router-link>
        </li>
        <li>
            <router-link :to="{ path: '/rentals' }"><i class="material-icons">local_offer</i> Rentas</router-link>
        </li>
        <li v-if="isAdmin">
            <router-link :to="{ path: '/users' }"><i class="material-icons">group</i> Usuarios</router-link>
        </li>
        <li>
            <a @click="logout">
              <i class="material-icons">power_settings_new</i>
              Salir
            </a>
        </li>
    </ul>


  </div>
</template>

<script>
export default {
  created () {
    console.log(this.isAdmin, 'aquiiiii')
  },
  computed: {
    isAuthenticated () {
      return this.$store.getters.token
    },
    isAdmin () {
      if (this.isAuthenticated) {
        return this.$store.getters.user.isAdmin === 1 ? true : false
      } else {
        return false
      }
    },
    user () {
      return this.$store.getters.user
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('logout')
    }
  }
}
</script>

<style lang="css">
</style>
