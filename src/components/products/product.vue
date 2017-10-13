<template lang="html">
  <div class="">
    <v-loader :loading="loading"></v-loader>
    <div class="col" :class="{'hide': confirmRental}">
      <div class="center col s12" style="margin-bottom:20px">
        <input type="search" id="search" name="" value="" v-model="search" v-on:keyup="searching">
        <label for="seach" class="active">Bucar</label>
      </div>
      <div v-if="search">
        Resultados
        <table class="responsive-table highlight  bordered" v-if="search">
          <thead class="grey">
            <tr>
              <th>Nombre</th>
              <th>Descripcion</th>
              <th>Precio venta</th>
              <th>Precio renta</th>
              <th>Stock</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(product, index) in results" :key="product.id">
              <td>{{product.name}}</td>
              <td>{{product.description}}</td>
              <td>${{product.price}}</td>
              <td>${{product.rental}}</td>
              <td v-if="product.stock == 0"><span class="red-text">No disponible</span></td>
              <td v-else><span class="green-text">{{product.stock}}</span></td>
              <td>
                <router-link :to="'/products/'+product.id" class="orange btn-floating light" v-if="getType==='products'">
                  <i class="material-icons">edit</i>
                </router-link>
                <button :disabled="product.stock == 0" class="orange btn-floating light" v-else-if="getType==='sales'" @click="newSale(product, index)">
                  <i class="material-icons">add_shopping_cart</i>
                </button>
                <button :disabled="product.stock == 0" class="orange btn-floating light" v-else="getType==='rentals'" @click="newRental(product, index)">
                  <i class="material-icons">local_offer</i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <table class="responsive-table highlight  bordered" v-if="!search">
        <thead class="grey">
          <tr>
            <th>Nombre</th>
            <th>Descripcion</th>
            <th>Precio venta</th>
            <th>Precio renta</th>
            <th>Stock</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product,index) in products" :key="product.id">
            <td>{{product.name}}</td>
            <td>{{product.description}}</td>
            <td>${{product.price}}</td>
            <td>${{product.rental}}</td>
            <td v-if="product.stock == 0"><span class="red-text">No disponible</span></td>
            <td v-else><span class="green-text">{{product.stock}}</span></td>
            <td>
              <router-link :to="'/products/'+product.id" class="orange btn-floating light" v-if="getType==='products'">
                <i class="material-icons">edit</i>
              </router-link>
              <button :disabled="product.stock == 0" class="orange btn-floating light" v-else-if="getType==='sales'" @click="newSale(product, index)">
                <i class="material-icons">add_shopping_cart</i>
              </button>
              <button :disabled="product.stock == 0" class="orange btn-floating light" v-else="getType==='rentals'" @click="newRental(product, index)">
                <i class="material-icons">local_offer</i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="center col s12">
        <ul class="pagination" v-if="!showForm">
          <li v-bind:class="{'active': index == currentPage}" v-for="index in paginate.last_page"><a @click="loadUrl(index)">{{index}}</a></li>
        </ul>
      </div>
    </div>

    <!-- Confirm rental -->
      <div v-if="confirmRental">
        <div class="row">
        <div class="col s12 m12">
          <div class="card grey">
            <div class="card-content white-text">
              <span class="card-title center">{{productToRental.name}}</span>
              <p style="margin-bottom:20px" class="center">
                Precio de renta: {{productToRental.rental}}
              </p>
              </div>
              <div class="car-action grey">
                <form class="form col s12" @submit.prevent="onConfirmRental">
                  <div class="input-field col s12">
                    <label for="quantity" class="active">Cantidad</label>
                    <input type="number" v-model="rentalquantity">
                  </div>
                  <div class="input-field col s12">
                    <label for="quantity" class="active">Fecha de entrega</label>
                    <input type="date" v-model="limitDate">
                  </div>
                  <p v-if="rentalquantity>productToRental.stock" class="red-text">
                    Sólo hay {{productToRental.stock}} en stock
                  </p>
                  <div class="center">
                    <input type="submit" class="btn green" value="Confirmar" v-if="rentalquantity<productToRental.stock">
                    <button type="button" class="btn btn red" name="button" @click="confirmRental = !confirmRental">Cancelar</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>


  </div>
</template>

<script>
import axios from 'axios'
import loader from '../loading.vue'
export default {
  props: ['typeList'],
  components: {
    'v-loader': loader
  },
  created () {
    this.getProducts()
  },
  data () {
    return {
      search: '',
      productToRental: null,
      confirmRental: false,
      limitDate: '',
      rentalquantity:0,
      products: [],
      results:[],
      sizes: [],
      showForm: false,
      paginate:null,
      currentPage: 1,
      loading: false
    }
  },
  methods: {
    editForm () {
      this.$emit('editForm')
    },
    searching () {
      if (this.search != '') {
        axios.get(this.apiUrl + '/products/search/' + this.search, {headers: {Authorization: 'Bearer ' + this.token}})
          .then(response => {
            this.results = response.data
          })
          .catch(error => {
            console.log(error)
          })
      }
      console.log(this.search)
    }
    ,
    loadUrl (index) {
      if (this.currentPage != index) {
        this.currentPage = index
        axios.get(this.apiUrl + '/products?page='+index,{headers: {Authorization: 'Bearer ' + this.token}})
        .then(response => {
          this.products = response.data.products.data
          this.paginate = response.data.paginate
        })
        .catch(error => {
          console.log(error)
        })
      }
    },
    getProducts () {
      this.loading = true
      axios.get(this.apiUrl + '/products',{headers: {Authorization: 'Bearer ' + this.token}})
      .then(response => {
        this.loading = false
        this.products = response.data.products.data
        this.paginate = response.data.paginate
      })
      .catch(error => {
        this.loading = false
        console.log(error)
      })
    },
    newSale (product, index) {
      axios.post(this.apiUrl + '/sales', {
        product_id: product.id,
        quantity: 1,
        price: product.price
      },{headers: {Authorization: 'Bearer ' + this.token}})
      .then(response => {
        console.log(response.data)
        this.products[index].stock = response.data.product.stock
        alert('venta hecha correctamente')
      })
      .catch(error => {
        console.log(error)
      })
    },
    newRental (product, index) {
      this.productToRental = product
      this.productToRental.currentIndex = index
      this.confirmRental = !this.confirmRental
    },
    onConfirmRental () {
      axios.post(this.apiUrl + '/rentals', {
        return: this.limitDate,
        product_id: this.productToRental.id,
        quantity: this.rentalquantity,
        price: this.productToRental.rental
      },{headers: {Authorization: 'Bearer ' + this.token}})
      .then(response => {
        console.log(response.data)
        this.products[this.productToRental.currentIndex].stock = response.data.product.stock
        this.confirmRental = !this.confirmRental
        alert('Renta agregada correctamente.')
      })
      .catch(error => {
        console.log(error)
      })
    }
  },
  computed: {
    getType () {
      return this.typeList
    },
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
