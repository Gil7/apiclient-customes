<template>
  <div class="login row">
      <div class="img">
      </div>
      <h3 class="center">
        Entrar al sistema</h3>
      <form v-on:submit.prevent="onLogin" class="col s12 m8 offset-m2">
        <div class="row">
          <div class="input-field col s12">
            <input placeholder="" id="email" type="email" class="validate" v-model="email">
            <label for="email" class="active">
              <i class="material-icons">account_circle</i>
              First Name
            </label>
          </div>
          <div class="input-field col s12 ">
            <input v-if="!watchPassword" id="password" type="password" class="validate" v-model="password">
            <input v-else id="password" type="text" class="validate" v-model="password">
            <label for="password" class="active">
              <i class="material-icons">vpn_key</i>
              Password
            </label>
          </div>
          <p class="left">
            <input type="checkbox" class="filled-in" id="filled-in-box" v-model="watchPassword" />
            <label for="filled-in-box">Mostra Contraseña?</label>
          </p>

          <div class="center col s12">
            <button :disabled="isAValidForm"  type="submit" name="button" class="btn green btn-medium">
              <i class="material-icons">lock_open</i>
              Entrar
            </button>
          </div>

        </div>
      </form>
      <footer>
        <h2>Tienda de disfraces</h2>
      </footer>
  </div>
</template>

<script>

export default {

  data () {
    return {
      email: '',
      password: '',
      watchPassword: false,
      seePassword: false
    }
  },
  methods: {
    onLogin () {
      this.$store.dispatch('loginUser', { email: this.email, password: this.password })
    }
  },
  computed: {
    isAValidForm () {
      if (this.email) {
        return false
      } else {
        return true
      }
    }
  }
}
</script>
<style >
  footer{
    position: absolute;
    left: 0px;
    bottom:0px;
  }
  .img{
    position: fixed;
    left: 50px;
    bottom:40px;
    height: 75%;
    width: 25%;
    
  }
</style>
