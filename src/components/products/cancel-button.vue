<template lang="html">
  <div class="center">
      <button class="btn red" v-on:click="changeState">Cancelar</button>
  </div>
</template>

<script>
export default {
  data ( ) {
  },
  methods: {
    changeState () {
      this.$emit('changeState')
    }
  }
}
</script>

<style lang="css">
</style>
