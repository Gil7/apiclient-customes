import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import AuthGuard from './auth-guard'
//components
Vue.use(Router)
import Products from '../components/products/Products.vue'
import EditProduct from '../components/products/edit-product.vue'
import CreateProduct from '../components/products/create-product.vue'
import Cart from '../components/Cart.vue'
import Sales from '../components/sales/Sales.vue'
import SalesToday from '../components/sales/sales-today.vue'
import Rentals from '../components/rentals/Rentals.vue'
import RentalsToday from '../components/rentals/rentals-today.vue'
import RentalsToReturn from '../components/rentals/toReturn.vue'
import Users from '../components/users/Users.vue'
import EditUser from '../components/users/edit-user.vue'
import DetailSale from '../components/sales/detail-sale.vue'
import Dashboard from '../components/Dashboard.vue'
import Login from '../components/Login.vue'
export default new Router({
  routes: [
    {
      path :'/',
      component: Login,
    },
    {
      path :'/dashboard',
      component: Dashboard,
      beforeEnter: AuthGuard
    },
    {
      path :'/users',
      component: Users,
      beforeEnter: AuthGuard
    },
    {
      path :'/users/:id',
      component: EditUser,
      props: true,
      beforeEnter: AuthGuard
    },
    {
      path :'/products',
      component: Products,
      beforeEnter: AuthGuard
    },
    {
      path :'/products/create',
      component: CreateProduct,
      beforeEnter: AuthGuard
    },
    {
      path :'/products/:id',
      name:'editproduct',
      props: true,
      component: EditProduct,
      beforeEnter: AuthGuard
    },
    {
      path :'/detailsale/:id',
      props:true,
      name:'detailsale',
      component: DetailSale,
      beforeEnter: AuthGuard
    },
    {
      path :'/sales',
      component: Sales,
      beforeEnter: AuthGuard
    },
    {
      path :'/sales/today',
      component: SalesToday,
      beforeEnter: AuthGuard
    },
    {
      path :'/rentals',
      component: Rentals,
      beforeEnter: AuthGuard
    },
    {
      path :'/rentals/today',
      component: RentalsToday,
      beforeEnter: AuthGuard
    },
    {
      path :'/rentals/toreturn',
      component: RentalsToReturn,
      beforeEnter: AuthGuard
    },
    {
      path :'/cart',
      component: Cart,
      beforeEnter: AuthGuard
    }
  ],
  mode: 'history'
})
