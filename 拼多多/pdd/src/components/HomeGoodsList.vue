<template>
  <div class="homeGoodsList">
    <div class="goodList" v-for="(good, index) in HomeGoodsList" :key=index>
      <img :src="good.image_url" class="item-top" alt="">
      <p>{{good.goods_name}}</p>
      <div class="item-bottom">
        <div class="item-bottom-left">
          <span class="price">￥{{good.normal_price / 100}}</span>
          <span class="sales-tip">{{good.sales_tip}}</span>
        </div>
        <div class="item-bottom-right">
          <div class="group">
            <a href="javascript:;" v-for="(one, index) in good.bubble" :key = index>
              <img :src="one.avatar" class="bubble_avatar" alt="">
            </a>
          </div>
          <button>去拼单</button>
        </div>
      </div>
    </div>
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
  }
}
</script>

<style scoped lang="stylus">
.homeGoodsList 
  width 100%
  padding .5rem
  box-sizing border-box
  font-family '微软雅黑'
  margin-bottom 4rem
  .goodList 
    padding .5rem
    box-sizing border-box
    background-color #fff
    margin-bottom .5rem
    border-radius .5rem
    p
      font-size 1.5rem
    .item-top 
      width 100%
    .item-bottom 
      display flex
      justify-content space-around
      margin-top .5rem
      .item-bottom-left 
        .price 
          color red
          font-size 2rem
          font-weight bolder
          margin-right 1.5rem
        .sales-tip 
          font-size 1.4rem
      .item-bottom-right
        display flex
        .group 
          margin-right 1.5rem
          img 
            width 2.5rem
            border-radius 50%
        button 
          font-weight bolder
          font-size 1.5rem
          color #fff
          border-radius .8rem
          background #e02e24
          border none
          width 7rem
</style>
