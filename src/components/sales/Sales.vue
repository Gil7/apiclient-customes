<template>
  <div class="row">
      <v-products :typeList="'sales'"></v-products>
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
    axios.defaults.headers.common['Authorization'] = this.$store.getters.token
  },
  data () {
    return {
      rentals: []
    }
  },
  methods: {
    getRentals () {
      axios.get(this.apiUrl + '/sales')
        .then(response => {
          this.rentals = response.data
        })
        .catch(err => {
          alert(err)
        })
    },
    computed: {
      apiUrl () {
        return this.$store.getters.apiUrl
      }
    }
  }
}
</script>
<style scoped>
</style>
