<template lang="html">
  <div class="">
    <div class="progress" v-if="loading">
        <div class="indeterminate"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['loading']
}
</script>

<style lang="css">
</style>
