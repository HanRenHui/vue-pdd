<template>
  <div class="tab-item" @click="changeRul(path)">
    <img :src="imgSrc" alt="">
    <span :class="{selected: select}">{{title}}</span> 
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'TabItem',
  props: {
    imgSrc: String,
    select: Boolean,
    title: String,
    path: String
  },
  methods: {
    // 改变路由
     changeRul(path){
      this.$router.replace(path);
    }
  }
}
</script>

<style scoped lang="stylus">
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
</style>
