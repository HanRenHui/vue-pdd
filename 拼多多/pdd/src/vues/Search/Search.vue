<template>
  <div class="search">
    <div class="header">
      <div class="header-content">
        <img src="./images/search.png" alt="">
        <span>搜索一下</span>
      </div>
    </div>
    <section class="search-main">
      <section class="search-main-left">
        <ul>
          <li class="current"><a href="javscript:;">女装</a></li>
          <li><a href="javscript:;">鞋包</a></li>
          <li><a href="javscript:;">男装</a></li>
          <li><a href="javscript:;">内衣</a></li>
          <li><a href="javscript:;">食品</a></li>
          <li><a href="javscript:;">百货</a></li>
          <li><a href="javscript:;">美妆</a></li>
          <li><a href="javscript:;">手机</a></li>
          <li><a href="javscript:;">电器</a></li>
          <li><a href="javscript:;">家纺</a></li>
          <li><a href="javscript:;">家具</a></li>
          <li><a href="javscript:;">电脑</a></li>
          <li><a href="javscript:;">充值</a></li>
          <li><a href="javscript:;">水果</a></li>
          <li><a href="javscript:;">运动</a></li>
          <li><a href="javscript:;">家装</a></li>
          <li><a href="javscript:;">汽车</a></li>
          <li><a href="javscript:;">海淘</a></li>
          <li><a href="javscript:;">健康</a></li>
        </ul>
      </section>
      <section class="search-main-right">

      </section>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
import {mapState} from 'vuex';

export default {
  name: 'Search',

  data() {
    return {
      
    }
  },
  components: {

  },
  computed: {
    title(){
      // return this.SearchTitle[parseInt(Math.random()* this.SearchTilte.length)];
      return this.SearchTitle;
    }
  },
  watch: {
    
  }
}
</script>

<style scoped lang="stylus">
.search 
  width 100%
  height 100%
  .header
    position fixed
    left 0
    top 0
    background #fff
    width 100%
    height 6.4rem
    border-bottom 1px solid #eeeeee
    .header-content
      display flex
      justify-content center
      align-items center
      position absolute
      left 50%
      top 50%
      transform translate(-50%, -50%)
      width 90%
      height 4.2rem
      background #f5f5f5
      border-radius .8rem
      img 
        width 1.8rem
        margin-right 1rem
      span 
        font-size: 1.6rem;
        color: #9c9c9c;
  .search-main 
    width 100%
    height 100%
    display flex
    box-sizing border-box
    padding-top 6.4rem
    .search-main-left 
      width 25%
      height 100%
      overflow hidden
      ul
        display flex
        flex-direction column
        li 
          height 5.2rem
          text-align center
          line-height 5.2rem
          width 100%
          background: #f4f4f4
          a
            color #58595B
            font-size 1.6rem
            text-decoration none
            font-family '微软雅黑'
          &.current 
            background #fff
            a 
              color #E02E24
              border-left 3px solid #e02e24
              padding 0 3rem
    .search-main-right
      width 75%
      height 100%
      background yellow
</style>
