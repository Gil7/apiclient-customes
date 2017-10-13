<template>
  <div class="row">
    <v-loader :loading="loading" v-if="loading"></v-loader>
    <div class="col s12" v-else>
      <div class="row">
        <div class="col s12 m6 l3">
        <v-infor-card url="/sales/today"
        title="Total en ventas hoy"
        :info="totalOfSales" withButton="true"></v-infor-card>
        </div>
        <div class="col s12 m6 l3">
          <v-infor-card url="/rentals/today"
          title="Total en rentas hoy"
          :info="totalofRentals" withButton="true"></v-infor-card>
        </div>
        <div class="col s12 m6 l3">
          <v-infor-card
          title="Rentas por devolver"
          :info="productsOnRental" url="/rentals/toreturn" withButton="true"></v-infor-card>
        </div>
        <div class="col s12 m6 l3">
          <v-infor-card title="Ganancias hoy" :info="totalGain" ></v-infor-card>
        </div>
      </div>
    </div>
    <div class="col s12 m4">
      <ul class="collection with-header">
          <li class="collection-header"><h4><i class="material-icons">equalizer</i>Con mas ventas hoy</h4></li>
          <li class="collection-item" v-for="item in sales"><div>{{item.name}}<a href="#!" class="secondary-content">{{item.total}}</a></div></li>
      </ul>
    </div>
    <div class="col s12 m4">
      <ul class="collection with-header">
          <li class="collection-header"><h4><i class="material-icons">equalizer</i>Con mas rentas hoy</h4></li>
          <li class="collection-item" v-for="item in rentals"><div>{{item.name}}<a href="#!" class="secondary-content">{{item.total}}</a></div></li>
      </ul>
    </div>
    <div class="col s12 m4">
      <ul class="collection with-header">
          <li class="collection-header"><h4><i class="material-icons">equalizer</i>Por terminar</h4></li>
          <li class="collection-item" v-for="item in products"><div>{{item.name}}<a href="#!" class="secondary-content">{{item.stock}}</a></div></li>
      </ul>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
import Bar from './charts/Bar.vue'
import Card from './daydata/info-card.vue'
import loader from './loading.vue'
export default {
  components: {
    'v-bar': Bar,
    'v-infor-card' : Card,
    'v-loader': loader
  },
  created () {
    this.getStatistics()

  },
  data () {
    return {
      loading: false,
      sales: [],
      rentals: [],
      products: [],
      gainSalesTotal: [],
      gainRentalsTotal: [],
      productOnRental:0
    }
  },
  methods: {
    getStatistics () {
      this.loading = true
      axios.get(this.apiUrl + '/statistics', {headers:{Authorization: 'Bearer ' + this.token}})
      .then(response => {
        this.loading = false
        this.gainSalesTotal = response.data.gainSalesTotal[0].total
        this.gainRentalsTotal = response.data.gainRentalsTotal[0].total
        this.productOnRental = response.data.productOnRental
        this.sales = response.data.sales
        this.rentals = response.data.rentals
        this.products = response.data.products

        console.log('sales:' , this.gainSalesTotal)
        console.log('rentals:' , this.gainRentalsTotal)
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
    token () {
      return this.$store.getters.token
    },
    mysales () {
      return this.sales
    },
    myrentals () {
      return this.rentals
    },
    lowStock () {
      return this.products
    },
    productsOnRental () {
      return this.productOnRental
    },
    totalGain () {
      const ren = this.gainSalesTotal === null ? 0.00 : this.gainSalesTotal
      const sal = this.gainRentalsTotal === null ? 0.00 : this.gainSalesTotal
      return parseFloat(sal) + parseFloat(ren)
    },
    totalofRentals () {
      return this.gainRentalsTotal
    },
    totalOfSales () {
      return this.gainSalesTotal
    }
  },

}
</script>
