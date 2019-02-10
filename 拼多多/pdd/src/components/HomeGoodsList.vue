<template>
  <div class="homeGoodsList">
    <ul>
      <li v-for="(good, index) in HomeGoodsList" :key = index>
        <img v-lazy="good.thumb_url" alt="" class="left">
        <section class="content">
          <p class="content-title"><img :src="good.icon.url" alt="不打烊" v-if="good.icon"><span>{{good.goods_name}}</span></p>
          <p class="content-mall" v-if="good.ext">{{good.ext.mall}}</p>
          <p class="content-tag">
            <span v-for="(tag, key) in good.tag_list" :key = key :style= '{color: tag.text_color}'>{{tag.text}}</span>
          </p>
          <section class="bottom">
            <span class="price">￥{{good.group.price / 10}}</span>
            <span class="tip">{{good.sales_tip}}</span>
          </section>
        </section>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
import {mapState} from 'vuex';
export default {
  name: 'homeGoodsList',
  data() {
    return {

    }
  },
  computed: {
    ...mapState([
      'HomeGoodsList'
    ])
  },
  
}
</script>

<style scoped lang="stylus">
.homeGoodsList 
  width 100%
  padding .5rem
  box-sizing border-box
  margin-top 1rem 0
  margin-bottom 5rem
  ul 
    width 100%
    li   
      display flex 
      justify-content space-around
      background #fff
      border-radius .8rem
      margin-bottom .8rem
      padding: .8rem
      box-sizing border-box
      .left 
        width 17.2rem
        height 17.2rem
        border-radius .8rem
      .content 
        position relative
        width 20rem
        .content-title 
          font-size 1.4rem
          font-family '微软雅黑'
          img 
            width 4rem
            height 1.6rem
            vertical-align middle
            margin-right .5rem
          span  
            vertical-align middle
        .content-mall 
          color #9c9c9c
          font-size 1.3rem
          margin-top 1rem
        .content-tag 
          position absolute
          bottom 4rem 
          left 0
          font-size 1.2rem 
          font-family '微软雅黑'
          span  
            background-color rgba(255,87,6, 0.08)
            float left 
            margin-right 1.5rem
      .bottom   
        position absolute 
        left 0
        bottom 0
        .tip 
          font-size 1.4rem
          font-family '微软雅黑'
          color #9c9c9c
        .price 
          color #e02e24
          font-size 1.8rem
          font-family '微软雅黑'
          font-weight bolder
        

</style>
