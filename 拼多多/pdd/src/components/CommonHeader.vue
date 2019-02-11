<template>
    <section class="set-header clearfix">
      <div class="middle">
        <div class="middle-content">{{title}}</div>
      </div>
      <div class="left">
        <span @click="$router.replace(path)"></span>
      </div>
      <!-- <div class="right">右边</div> -->
    </section>
</template>

<script type="text/ecmascript-6">
export default {
  name: "CommonHeader",
  data() {
    return {

    }
  },
  props: {
    path: String,
    title: String
  },
  components: {

  }
}
</script>

<style scoped lang="stylus">
 .set-header   
    width 100%
    height 5rem
    background #f5f5f5
    .middle   
      float left
      width 100%
      height 100%
      .middle-content 
        height 100%
        text-align center
        line-height 5rem
        margin 0 3rem
        font-size 1.8rem
        font-family '微软雅黑'
    .left   
      display flex
      align-items center;
      justify-content center
      float left
      margin-left -100%
      width 3rem
      height 100%
      padding-left 1rem
      span 
        width 2.3rem
        height 2.9rem
        background  url("./images/sprites.png") no-repeat -3.45rem 0
        background-size 30rem 
        
</style>
