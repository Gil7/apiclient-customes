<template>
  <div id="app" class="container">
    <v-navbar></v-navbar>
    <main>
        <router-view></router-view>
    </main>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
export default {
  components: {
    'v-navbar': Navbar
  }
}
</script>

<style>
header, main, footer {
     padding-left: 150px;
   }

   @media only screen and (max-width : 992px) {
     header, main, footer {
       padding-left: 0;
     }
   }
</style>
