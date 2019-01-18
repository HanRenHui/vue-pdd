<template>
  <div id="app">
    <router-view/>
    <Tab
      v-if="$route.meta.showTab"
    />
  </div>
</template>

<script>
// import Tab from './components/TabBar'
import Tab from './components/TabBar'

export default {
  name: 'App',
  components: {
    Tab
  },
  mounted() {
    this.$store.dispatch('checkisLogin');
  },
  computed: {
  }
  
}
</script>
<style scoped lang="stylus">
 #app
  width 100%
  height 100%
</style>