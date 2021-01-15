<template>
  <div>
    <nav-menu></nav-menu>
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<script>
import NavMenu from '../NavMenu'
export default {
  name: 'Index',
  components: {NavMenu}
}
</script>

<style scoped>

</style>
