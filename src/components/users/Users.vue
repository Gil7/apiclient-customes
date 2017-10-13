<template>
  <div class="row">
      <div class="users" :class="{'hide':createForm}">
        <h1>Usuarios</h1>
        <table class="bordered highlight centered responsive-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellidos</th>
              <th>Nombre de usuario</th>
              <th>Email</th>
              <th>Tipo de usuario</th>
              <th>Telefono</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user,index) in users" :key="user.id">
              <td>{{user.name}}</td>
              <td>{{user.lastname}}</td>
              <td>{{user.username}}</td>
              <td>{{user.email}}</td>
              <td>{{isAnAdmin(user)}}</td>
              <td>{{user.phone}}</td>
              <td>
                <a @click="deleteUser(index, user.id)" class="red-text">
                  <i class="material-icons">delete_forever</i>
                </a>
                <router-link :to="'/users/' + user.id">
                  <i class="material-icons">edit</i>
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="createUser" :class="{'hide':!createForm}">
        <form @submit.prevent="createUser">
          <div class="input-field col s4">
            <label for="name">Nombre</label>
            <input type="text" id="name" v-model="name">
          </div>
          <div class="input-field col s8">
            <label for="lastname">Apellidos</label>
            <input type="text" id="lastname" v-model="lastname">
          </div>
          <div class="input-field col s6">
            <label for="username">Username</label>
            <input type="text" name="" id="username" v-model="username">
          </div>
          <div class="input-field col s6">
            <label for="phone">Telefono</label>
            <input type="tel" name="" id="phone" v-model="phone">
          </div>
          <div class="input-field col s6">
            <label for="email">Email</label>
            <input type="email" name="" id="email" v-model="email">
          </div>
          <div class="input-field col s6">
            <label for="password">Contraseña para el usuario</label>
            <input type="password" id="email" v-model="password">
          </div>
          <div class="input field col s12">
            <p>Administrador?</p>
            <input type="checkbox" id="test5" v-model="isAdmin"/>
            <label for="test5"></label>
          </div>
          <div class="center">
            <button type="submit" class="btn green">
              <i class="material-icons">add</i>
              Registrar
            </button>
            <button type="button" class="btn red" @click="createForm = !createForm" name="button">
              <i class="material-icons">closed</i>
              Cancelar
            </button>
          </div>
        </form>
      </div>
      <div class="fixed-action-btn">
        <button type="button" class="btn-floating btn-large waves-effect waves-light red" @click="createForm=!createForm" v-if="!createForm">
          <i class="material-icons">add</i>
        </button>
      </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  created () {
    this.getUsers()
  },
  data () {
    return {
      users: [],
      name:'',
      lastname: '',
      username: '',
      password:'',
      isAdmin: false,
      phone: '',
      email: '',
      createForm: false
    }
  },
  methods: {
    getUsers () {
      axios.get(this.$store.getters.apiUrl + '/users', {headers: {Authorization: 'Bearer ' + this.token}})
        .then(response => {
          if (response.data.success) {
            this.users = response.data.users
          }
        })
        .catch(err => {
          alert(err)
        })
    },
    createUser (){
      axios.post(this.$store.getters.apiUrl + '/users', {
        name:this.name,
        lastname: this.lastname,
        username:this.username,
        email:this.email,
        password:this.password,
        isAdmin:this.isAdmin,
        phone:this.phone
      },{headers: {Authorization: 'Bearer ' + this.token}})
      .then(response => {
        this.users.push(response.data.user)
        alert('Usuario creado correctamente')
        this.createForm = !this.createForm
      })
      .catch(error => {
        console.log(error)
        alert('Ha surgido un error, vuelve a intentarlo')
      })
    },
    deleteUser (index, user) {
      axios.delete(this.$store.getters.apiUrl + '/users/' + user,{headers: {Authorization: 'Bearer ' + this.token}})
      .then(response => {
        console.log(response.data)
        if(response.data.success){
          this.users.splice(index, 1)
          alert('Usuario eliminado correctamente')
        }
      })
      .catch(error => {
        console.log(error)
        alert('Ha surgido un error, vuelve a intentarlo')
      })
    },
    isAnAdmin (user) {
      return user.isAdmin === 1 ? 'Administrador' : 'Normal'
    }
  },
  computed: {
    token () {
      return this.$store.getters.token
    }
  }
}
</script>
<style scoped>

</style>
