<template lang="html">
  <div class="">
    <ul class="collection with-header">
        <li class="collection-header"><h4>{{title}}</h4></li>
        <li class="collection-item" v-for="item in data"><div>Alvin<a href="#!" class="secondary-content"><i class="material-icons">send</i></a></div></li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['title','data']
}
</script>

<style lang="css">
</style>
