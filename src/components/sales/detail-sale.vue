<template>
  <div class="row">
      <h3>Cliente: {{sale.nameClient}}</h3>
      <table class="bordered highlight centered responsive-table">
        <thead>
          <tr>
            <th>Articulo</th>
            <th>Cantidad</th>
            <th>Precio de unitario</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in sale.products" :key="product.id">
            <td>{{product.name}}</td>
            <td>{{product.pivot.quantity}}</td>
            <td>{{product.pivot.price}}</td>
            <td>{{product.pivot.quantity * product.pivot.price}}</td>
          </tr>
        </tbody>
      </table>
      Total de la venta : {{total}}
  </div>
</template>

<script>
import axios from 'axios'
export default {
  props: ['id'],
  data () {
    return {
      sale: null
    }
  },
  created () {
    this.getDetailSale()
  },
  methods: {
    getDetailSale () {
      axios.get(this.apiUrl  + '/sales/' + this.id)
        .then(response => {
          this.sale = response.data
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  computed: {
    total () {
      let total = 0.0
      this.sale.products.forEach(function (product) {
        total += product.pivot.price * product.pivot.quantity
      })
      return total
    },
    apiUrl () {
      return this.$store.getters.apiUrl
    }
  }
}
</script>
<style scoped>

</style>
