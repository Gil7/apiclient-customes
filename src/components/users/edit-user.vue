<template lang="html">
  <div class="">
    <form @submit.prevent="updateUser">
      <div class="input-field col s4">
        <label class="active" for="name">Nombre</label>
        <input type="text" id="name" v-model="user.name">
      </div>
      <div class="input-field col s8">
        <label class="active" for="lastname">Apellidos</label>
        <input type="text" id="lastname" v-model="user.lastname">
      </div>
      <div class="input-field col s6">
        <label class="active" for="username">Username</label>
        <input type="text" name="" id="username" v-model="user.username">
      </div>
      <div class="input-field col s6">
        <label class="active" for="phone">Telefono</label>
        <input type="tel" name="" id="phone" v-model="user.phone">
      </div>
      <div class="input-field col s6">
        <label class="active" for="email">Email</label>
        <input type="email" name="" id="email" v-model="user.email">
      </div>
      <!--div class="input-field col s6">
        <label class="active" for="password">Contraseña para el usuario</label>
        <input type="password" id="email" v-model="user.password">
      </div-->
      <div class="input field col s12">
        <p>Administrador?</p>
        <input type="checkbox" id="test5" v-model="user.isAdmin"/>
        <label class="active" for="test5"></label>
      </div>
      <div class="center">
        <button type="submit" class="btn blue">
          <i class="material-icons">add</i>
          Actualizar
        </button>
        <router-link to="/users" class="btn red">Cancelar</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  props: ['id'],
  created () {
    this.getUser()
  },
  data () {
    return {
      user: {
        name:'',
        lastname: '',
        username: '',
        isAdmin: false,
        phone: '',
        email: '',
      }
    }
  },
  methods: {
    updateUser () {
      console.log('ok')
      axios.put(this.$store.getters.apiUrl + '/users/' + this.id, this.user,{headers: {Authorization: 'Bearer ' + this.token}})
      .then(response => {
        console.log(response.data)
        this.user = response.data
        alert('Usuario actualizado correctamente')
      })
      .catch(error => {
        console.log(error)
        alert('Ha surgido un error, vuelve a intertarlo')
      })
    },
    getUser() {
      axios.get(this.$store.getters.apiUrl + '/users/' + this.id,{headers: {Authorization: 'Bearer ' + this.token}})
      .then(response => {
        this.user = response.data
      })
      .catch(error => {
        console.log(error)
      })
    }
  },
  computed: {
    token () {
      return this.$store.getters.token
    }
  }
}
</script>

<style lang="css">
</style>
