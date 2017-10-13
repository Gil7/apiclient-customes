<template lang="html">
  <div class="">
    <div class="card pink">
      <div class="card-content white-text">
        <span class="card-title">{{title}}:</span>
        <span v-if="info"> {{info}}</span>
      </div>
      <div class="card-action">
        <router-link :to="{ path: url }" class="btn" v-if="withButton">Detalles</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['info', 'title', 'url','withButton'],
}
</script>

<style lang="css">
</style>
