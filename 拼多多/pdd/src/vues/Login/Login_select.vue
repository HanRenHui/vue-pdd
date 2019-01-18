<template>
  <div class="login-select">
    <p>选择登陆方式</p>
    <router-link to='/login' tag="button">手机登录</router-link>
    <img src="https://cdn.yangkeduo.com/assets/img/login_footer.png" class="logo" alt="">
    <img src="http://pinduoduoimg.yangkeduo.com/base/brand_PICC.png" class="bottom" alt="">
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'LoginSelect',
  data() {
    return {

    }
  },
  components: {

  }
}
</script>

<style scoped lang="stylus">
center_top(top)
  position absolute
  top top
  left 50%
  transform translateX(-50%)
center_bottom(bottom)
  position absolute
  left 50%
  transform translateX(-50%)
  bottom bottom
.login-select 
  position fixed
  left 0
  top 0
  width 100%
  height 100%
  z-index 1000
  background #f5f5f5

  p
    color #151516
    center_top(20%)
    font-size 1.9rem
    font-family '微软雅黑'
  button 
    display block
    center_top(28%)
    width 80%
    height 4.5rem;
    background-color #f6a622;
    border-radius .5rem;
    color #fff;
    border none
    font-size 1.5rem;
  .logo
    center_bottom(5rem)
    width 14rem
  .bottom
    center_bottom(3rem)
    width 10rem
</style>
