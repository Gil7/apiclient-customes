<template lang="html">
  <div class="row">
    <div class="col s12" v-bind:class="{'hide':showForm}">
      <v-product :typeList="'products'"></v-product>
    </div>
    <div class="fixed-action-btn">
      <router-link to="/products/create" class="btn-floating btn-large waves-effect waves-light red">
        <i class="material-icons">add</i>
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import NewProduct from './create-product.vue'
import Product from './product.vue'
import CancelButton from './cancel-button.vue'
import EditProduct from './edit-product.vue'

export default {
  components: {
    'v-new-product': NewProduct,
    'v-product': Product,
    'v-cancel-button': CancelButton,
    'v-edit-product': EditProduct
  },
  data () {
    return {
      showForm: false,
      editForm: false,
    }
  },
  methods: {
    changeStateShow () {
      this.showForm = !this.showForm
    },
    changeStateEdit () {
      this.editForm = !this.editForm
    }
  },
  computed: {
    configHeaders () {
      return this.$store.getters.configHeaders
    }
  }
}
</script>

<style lang="css" scoped>

</style>
