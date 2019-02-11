<template>
  <div class="me">
    <LoginSelect v-if="!User._id" />
    <Center v-else/>
  </div>
</template>

<script type="text/ecmascript-6">
import LoginSelect from './../login/Login_select';
import Center from './Center';
import {mapState} from 'vuex';
export default {
  name: 'Me',
  data() {
    return {

    }
  },
  computed:{
    ...mapState([
      'User'
    ]),
  },
  components: {
    LoginSelect,
    Center
  }
}
</script>

<style scoped lang="stylus">
  .me 
    width 100%
    height 100%
    background #f4f4f4
</style>
