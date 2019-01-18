<template>
  <div class="cart" v-if="User._id">
    我是购物车
  </div>
  <login_select v-else/>
</template>

<script type="text/ecmascript-6">
import login_select from './../Login/Login_select';
import {mapState} from 'vuex'
export default {
  name: 'Cart',
  data() {
    return {

    }
  },
  components: {
    login_select
  },
  computed: {
    ...mapState([
      'User'
    ])
  }
}
</script>

<style scoped lang="stylus">
.cart 
  width 100%
  height 100%
  background blue
</style>
