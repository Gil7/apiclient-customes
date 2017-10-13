<template lang="html">
  <div class="">
    <h3>Actualizar</h3>
    <form class="col s12" v-on:submit.prevent="updateProduct">
      <div class="row">
      <div class="input-field col s12">
        <input id="name" type="text" class="validate" v-model="product.name">
        <label for="name" class="active">Producto</label>
      </div>
      <div class="input-field col s12">
        <input id="description" type="text" class="validate" v-model="product.description">
        <label for="description" class="active">Descripción</label>
      </div>
      <div class="input-field col s4">
        <input id="price" type="number" class="validate" v-model="product.price" step="0.01">
        <label for="price" class="active">Precio</label>
      </div>
      <div class="input-field col s4">
        <input id="rental" type="number" class="rental" v-model="product.rental" step="0.01">
        <label for="rental" class="active">Precio de renta</label>
      </div>
      <div class="input-field col s4">
        <input id="stock" type="number" class="validate" v-model="product.stock">
        <label for="stock" class="active">Stock</label>
      </div>
      <div class="input field col s12">
        <p class="blue-text">Tallas disponibles:</p>
        <p v-for="size in helper" :key="size.id" class="col s2">
          <input  type="checkbox" :id="size.id" :value="size.id" v-model="sizesSelected"/>
          <label :for="size.id">{{size.description}}</label>
        </p>
      </div>
      <div class="input field col s12">
        <p class="blue-text">Agregar nueva talla?:</p>
        <p v-for="size in sizes" :key="size.id" class="col s2">
          <input :value="size.id" type="checkbox" :id="size.id" v-model="sizesSelected"/>
          <label :for="size.id">{{size.description}}</label>
        </p>
      </div>
      <div class="progress" v-if="loading">
          <div class="indeterminate"></div>
      </div>
      <div class="center-align" v-else>
        <input type="submit" value="Actualizar" class="btn green">
        <router-link to="/products" class="red btn">Cancelar</router-link>
      </div>
    </div>
    </form>
  </div>

</template>

<script>
import axios from 'axios'
export default {
  props: ['id'],
  created () {
    this.getSizes()
    axios.get(this.apiUrl + '/products/' + this.id,{headers: {Authorization: 'Bearer ' + this.token}})
    .then(response => {
      this.product = response.data
      this.helper = this.product.sizes
      let sizes = []
      response.data.sizes.forEach((el) => {
        this.sizesSelected.push(el.id)
        sizes.push(el.id)
      })
      return axios.post(this.apiUrl+'/newsizes',{sizes: sizes},{headers:{Authorization:'Bearer ' + this.token}})
    })
    .then((response) => {
      this.sizes = response.data
      console.log(response.data)
    })
    .catch(error => {
      console.log(error)
    })
  },
  data () {
    return {
      sizes:[],
      helper:[],
      loading: false,
      product: null,
      sizesSelected: [],
    }
  },
  methods: {
    getSizes () {
      axios.get(this.apiUrl + '/sizes', {headers: {Authorization: 'Bearer ' + this.token}})
      .then(response => {
        this.sizes = response.data
      })
      .catch(error => {
        console.log(error)
      })
    },
    updateProduct () {
      this.loading = true;
      axios.put(this.apiUrl + '/products/' + this.id, {
        name: this.product.name,
        description: this.product.description,
        price: this.product.price,
        rental: this.product.rental,
        stock:this.product.stock,
        sizes: this.sizesSelected
      }, {headers: {Authorization: 'Bearer ' + this.token}})
      .then(response => {
        this.loading = false;
        this.product = response.data
        alert('Producto actualizado correctamente.')

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
    apiUrl () {
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
