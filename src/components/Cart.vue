<template lang="html">
  <div class="row">
    <h3 class="green-text center">Detalle de compra</h3>
    <div class="" v-if="products.length > 0">
      <form class="form">
        <div class="">
            <label for="nameClient">Nombre del cliente</label>
            <input type="text" name="" id="nameClient" value="" v-model="nameClient">

        </div>
      </form>
      <table class="responsive-table highlight striped bordered">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Total</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in products" :key="product.id">
            <td>{{product.name}}</td>
            <td>{{product.price}}</td>
            <td>{{product.quantity}}</td>
            <td>{{product.quantity * product.price}}</td>
            <td>
              <button type="button" name="button" @click="add(product, index)">
                <i class="material-icons">add</i>
              </button>
              <button type="button" name="button" @click="substract(product, index)">
                <i class="material-icons">indeterminate_check_box</i>
              </button>
              <button type="button" name="button" @click="removeItem(index)">
                <i class="material-icons">delete_forever</i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      total: ${{total}}
      <div class="center-align">
        <button type="button" name="button" class="btn green" @click="makeSale">Realizar compra</button>
        <button type="button" name="button" class="btn red" @click="cancelSale">Cancelar venta</button>
      </div>
    </div>
    <div class="" v-else>
      <h5 class="red-text center">
        <i class="material-icons">remove_shopping_cart</i>
        No hay productos agregados</h5>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      nameClient: ''
    }
  },
  methods:{
    removeItem (index) {
      this.$store.dispatch('removeItem', index)
    },
    add (product,index) {
      this.$store.dispatch('addUnityToitem', index)
    },
    substract (product, index) {
      this.$store.dispatch('substractUnityToitem', index)
    },
    cancelSale () {
      this.$store.dispatch('cancelSale')
    },
    makeSale () {
      this.$store.dispatch('makeSale', this.nameClient)
    }
  },
  computed:{
    products () {
      return this.$store.getters.products
    },
    total () {
      let amount = 0.0
      this.$store.getters.products.forEach((product) => {
        amount += product.quantity * product.price
      })

      return amount
    }
  }
}
</script>

<style lang="css">
</style>
