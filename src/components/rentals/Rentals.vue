<template>
  <div class="row">
      <v-products :typeList="rentals"></v-products>
  </div>
</template>
<script>
import axios from 'axios'
import Products from '../products/product.vue'
export default {
  components: {
    'v-products': Products
  },
  created () {

  },
  data () {
    return {
      rentals: []
    }
  },
  methods: {
    getRentals () {
      axios.get(this.apiUrl + '/rentals')
        .then(response => {
          this.rentals = response.data
        })
        .catch(err => {
          alert(err)
        })
    }
  },
  computed: {
    apiUrl () {
      return this.$store.getters.apiUrl
    }
  }
}
</script>
<style scoped>
</style>
