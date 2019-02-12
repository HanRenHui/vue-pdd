<template>
  <div :class="{'tab-item': true, showNum: showNum}" @click="changeRul(path)">
    <img :src="imgSrc" alt="">
    <span :class="{selected: select}">{{title}}</span> 
    <i v-if="showNum && $store.state.cartNum">{{$store.state.cartNum}}</i>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'TabItem',
  props: {
    imgSrc: String,
    select: Boolean,
    title: String,
    path: String,
    showNum: Boolean,
    Num: Number
  },
  methods: {
    // 改变路由
     changeRul(path) {
      this.$router.replace(path);
    }
  }
}
</script>

<style scoped lang="stylus">
  .showNum 
    position relative
  .tab-item 
    display flex
    flex-direction column
    justify-content space-around
    align-items center
    width 20%
    height 100%
    font-size 1.3rem
    z-index 200
  img 
    width 2.5rem
  .selected 
    color red
  i 
    position absolute
    top -0.5rem 
    right 1rem
    width 2rem
    height 2rem
    border-radius 50%
    background #e02e24
    text-align center
    line-height 2rem
    color #fff
</style>
