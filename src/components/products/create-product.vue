<template lang="html">
  <div class="row">
    <div class="col" :class="{'s9':showForm,'hide':showForm}">
      <h3>Datos del producto</h3>
      <form class="col s12" v-on:submit.prevent="addProduct">
        <div class="row">
        <div class="input-field col s12">
          <input id="name" type="text" class="validate" v-model="name">
          <label for="name">Nombre del producto</label>
        </div>
        <div class="input-field col s12">
          <input id="description" type="text" class="validate" v-model="description">
          <label for="description">Descripcion</label>
        </div>
        <div class="input-field col s4">
          <input id="price" type="number" class="validate" v-model="price" step="0.01">
          <label for="price">Precio</label>
        </div>
        <div class="input-field col s4">
          <input id="rental" type="number" class="rental" v-model="rental" step="0.01">
          <label for="rental">Precio de renta</label>
        </div>
        <div class="input-field col s4">
          <input id="stock" type="number" class="validate" v-model="stock">
          <label for="stock">Stock</label>
        </div>

        <div class="input field col s12">
          <p class="blue-text">Tallas disponibles:</p>
          <p v-for="size in sizes" :key="size.id" class="col s2">
            <input :value="size.id" type="checkbox" v-bind:id="size.id" v-model="sizesSelected"/>
            <label :for="size.id">{{size.description}}</label>
          </p>
        </div>
        <div class="progress" v-if="loading">
            <div class="indeterminate"></div>
        </div>
        <div class="center-align" v-else>
          <input type="submit" value="Registrar" class="btn green">
          <router-link to="/products" class="btn red">Cancelar</router-link>
        </div>
      </div>
      </form>
    </div>
    <div class="col center" :class="{'hide':!showForm, 's12':!showForm}">
      <form @submit.prevent="createNewSize" class="col s12">
        <h5>Agregar talla:</h5>
        <div class="input-field col s12">

          <input type="text" id="newsize" v-model="newSize">
          <label for="newsize" class="active">Talla</label>
        </div>

          <button type="submit" name="button" class="btn">
            Agregar
          </button>
          <button class="btn red" @click="showForm=!showForm">
            Cancelar
          </button>

      </form>
    </div>
    <div class="fixed-action-btn horizontal">
    <a class="btn-floating btn-large red">
      <i class="large material-icons">mode_edit</i>
    </a>
    <ul>
      <li><a class="btn-floating red" @click="showForm=!showForm"><i class="material-icons">accessibility</i></a></li>
    </ul>
  </div>
  </div>

</template>

<script>
import axios from 'axios'
import CancelButton from './cancel-button.vue'
export default {
  components: {
    'v-cancel-button': CancelButton
  },
  created () {
    this.getSizes()
  },
  data () {
    return {
      showForm:false,
      newSize: '',
      loading: false,
      sizes: [],
      name: '',
      description: '',
      price: '',
      rental:'',
      sizesSelected:[],
      stock: ''
    }
  },
  methods: {
    createNewSize (){
      axios.post(this.apiUrl + '/sizes',{
        description: this.newSize
      },{headers:{Authorization:'Bearer ' + this.token}})
      .then(response=> {
        console.log(response.data)
        this.sizes.push(response.data)
        this.showForm = !this.showForm
        alert('Talla agregada correctamente.')
      })
      .catch(error => {
        console.log(error)
      })
    },
    getSizes () {
      axios.get(this.apiUrl + '/sizes', {headers: {Authorization: 'Bearer ' + this.token}})
      .then(response => {
        this.sizes = response.data
      })
      .catch(error => {
        console.log(error)
      })
    },
    addProduct () {
      this.loading = true;
      axios.post(this.apiUrl + '/products', {
        name: this.name,
        description: this.description,
        price: this.price,
        stock: this.stock,
        rental:this.rental,
        sizes: this.sizesSelected
      },{headers: {Authorization: 'Bearer ' + this.token}})
      .then(response => {
        this.loading = false;
        alert('Producto agregago correctamente.')
        this.$router.push('/products')
        clearForm()
      })
      .catch(error => {
        this.loading = false;
        console.log(error)
      })
    },
    clearForm () {
      this.name = ''
      this.description = '',
      this.stock = ''
      this.price = '',
      this.sizesSelected = []
    }
  },
  computed: {
    apiUrl (){
      return this.$store.getters.apiUrl
    },
    configHeaders () {
      return this.$store.getters.configHeaders
    },
    token () {
      return this.$store.getters.token
    }
  }
}
</script>

<style lang="css">
</style>
