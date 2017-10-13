<template lang="html">
  <div class="">
    <v-loader :loading="loading"></v-loader>
    <table class="responsive-table highlight  bordered">
      <thead class="grey">
        <tr>
          <th>Producto</th>
          <th>Fecha de venta</th>
          <th>Precio de venta</th>
          <th>Piezas</th>
          <th>Vendedor</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in sales" :key="product.id">
          <td>{{product.name}}</td>
          <td>{{product.created_at|}}</td>
          <td>${{product.price}}</td>
          <td>{{product.quantity}}</td>
          <td>{{product.nameClient}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'
import loader from '../loading.vue'

export default {
  components: {
    'v-loader':loader
  },
  created() {
    this.getSalesToday()
  },
  data () {
    return {
      loading:false,
      sales: []
    }
  },
  methods: {
    getSalesToday () {
      this.loading = true
      axios.get(this.apiUrl + '/sales/today', {headers:{Authorization: 'Bearer ' + this.token}})
      .then(response => {
        this.loading = false
        this.sales = response.data.sales
      })
      .catch(error => {
        this.loading = false
        console.log(error)
      })
    }
  },
  computed: {
    apiUrl () {
      return this.$store.getters.apiUrl
    },
    token() {
      return this.$store.getters.token
    }
  }
}
</script>

<style lang="css">
</style>
