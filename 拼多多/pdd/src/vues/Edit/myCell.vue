<template>
    <li class="myCell" @click="handleClick()">
      <span><i v-if="!data"></i>{{title}}</span>
      <span>{{data}}</span>
    </li>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'myCell',
  data() {
    return {

    }
  },
  props: {
    title: String,
    data: String,
    handleClick: Function
  },
  components: {

  }
}
</script>

<style scoped lang="stylus">
li 
  display flex 
  justify-content space-between
  align-items center 
  padding 0 1.5rem 
  box-sizing border-box
  width 100% 
  height 5rem 
  font-size 1.5rem
  background #fff
  border-bottom 1px solid #e0e0e0
  &:active 
    background #f5f5f5
  span  
    &:first-child 
      position relative
      font-family '微软雅黑'
      font-size 1.6rem
      i 
        position absolute
        top 50%
        right -2rem 
        transform translateY(-50%)
        display inline-block
        width .8rem 
        height .8rem
        background #e02e24
        border-radius 50%
    &:last-child 
      color gray
</style>
