<template lang="html">
  <div class="">
    <table class="responsive-table highlight  bordered">
      <thead class="grey">
        <tr>
          <th>Producto</th>
          <th>Fecha de renta</th>
          <th>Precio de renta</th>
          <th>Piezas</th>
          <th>Rentó</th>
          <th>Fecha de devolución</th>
          <th>Devuelto?</th>
          <th>Opciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in rentals" :key="product.id">
          <td>{{product.name}}</td>
          <td>{{product.created_at|}}</td>
          <td>${{product.price}}</td>
          <td>{{product.quantity}}</td>
          <td>{{product.nameClient}}</td>
          <td>{{product.return}}</td>
          <td>{{returned(product.returned)}}</td>
          <td>
            <button type="button" name="button" class="btn" @click="updateRental(index, product.id)">
              <i class="material-icons">check</i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  created() {
    this.getRentalsToday()
  },
  data () {
    return {
      rentals: []
    }
  },
  methods: {
    getRentalsToday () {
      axios.get(this.apiUrl + '/rentals', {headers:{Authorization: 'Bearer ' + this.token}})
      .then(response => {
        this.rentals = response.data
      })
      .catch(error => {
        console.log(error)
      })
    },
    updateRental (index, rental) {
      axios.put(this.apiUrl + '/rentals/' + rental,{},{headers:{Authorization:'Bearer '+ this.token}})
      .then(response => {
        alert('Producto marcado como devuelto')
        this.rentals.splice(index,1)
      })
      .catch(error => {
        console.log(error)
      })
    },
    returned (item) {
      return item == 1 ? 'Devuelto' : 'Aun no'
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
