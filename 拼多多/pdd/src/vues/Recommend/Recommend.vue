<template>
  <scroll class="scroller" :upCallback="upCallback" ref="mescroll" warpId="index_scroll"
          id="index_scroll"  v-if="User._id">
    <div class="recommend">
      <!-- <keep-alive> -->
        <div class="rec-item" v-for="(good, index) in ReqList" :key=index>
          <img v-lazy="good.hd_thumb_url" alt="">
          <p>{{good.goods_name}}</p>
          <span class="tag" v-for="(tag, item) in good.tag_list" :key= item>
            {{tag.text}}
          </span>
          <div class="item-bottom">
            <div class="item-b-left">
              <span class="price">￥{{good.price/100}}</span>
              <span class="sales_tip">{{good.sales_tip}}</span> 
            </div>
            <span class="item-b-right" @click="addCart(good)">＋</span>
          </div>
        </div>
      <!-- </keep-alive> -->
    </div>  
  </scroll>

  <login_select v-else/>
</template>

<script type="text/ecmascript-6">
import {mapState} from 'vuex';
import login_select from './../Login/Login_select';
import Scroll from './../../components/mescroll/Scroll';
import { req_add_cart } from '@/api/index.js'
import { Toast } from 'mint-ui'

export default {
  name: 'Recommend',
  data() {
    return {
     
    }
  },
  components: {
    login_select,
    Scroll
  },
  mounted() {
    this.dataList = this.ReqList;
  },
  methods: {
    upCallback (page) {
      const SIZE = 20;
      this.$store.dispatch('recommendList', {
        params: {
          'app_name': 'rectab_sim_gyl',
          'offset': (page.num-1) * SIZE,
          'count': SIZE,
        },
        callback: {
          'scb': (result) => {
            console.log('成功');
            this.$refs.mescroll.endSuccess(result.length);
          },
          'ecb': (err) => {
            console.log('失败');
            this.$refs.mescroll.endErr();
          }
        }
      }); 
    },
    // 添加购物车
    async addCart(good) {

      good.userId = this.User._id;
      let params = good;

      let result = await req_add_cart(params);
      let { status, data} = result;
      if(status === 200){
        Toast({
          message: data.message
        }); 
        if(data.status === 200) {
           // cartNum 加一
          this.$store.dispatch('incCartNum');  
        }
        // 重新获取购物车数据
        this.$store.dispatch('getCart', this.User._id);

      }
    }
  
  },
  computed: {
    ...mapState([
      'ReqList',
      'User'
    ])
  }
}
</script>

<style scoped lang="stylus">
  .ball-outer .ball-inner 
    position absolute
    transition all 1s
    width 2rem
    height 4rem
    background #e02e24
  .ball-outer
    transition-timing-function ease
  .ball-inner 
    transition-timing-function ease
  .recommend 
    width 100%
    background #f5f5f5
    font-family "微软雅黑"
    margin-bottom 4.8rem
    display flex
    flex-wrap wrap
    justify-content space-between
    .rec-item
      position relative
      width 49.5%
      background #fff
      height 30rem
      p 
        padding .5rem
        box-sizng border-box
        font-size 1.3rem
        width 100%
        height 1.4rem
        overflow hidden
        margin-bottom .8rem
      img 
        width 100%
      .tag 
        color: rgb(255, 87, 6)
        background-color: rgba(255, 87, 6, 0.08)
        font-size 1.2rem
        margin-left 1rem
      .item-bottom 
        position absolute
        width 100%
        left 0
        bottom 1rem
        display flex
        justify-content space-between
        .item-b-left
          height 3rem 
          line-height 3rem
          .price 
            color red
            font-weight bolder
            font-size 1.3rem
            margin 0 .5rem 
          .sales_tip
            color #ccc
        .item-b-right
          width 2rem
          height 2rem
          border-radius 50%
          background #e02e24
          color #fff
          text-align center
          line-height 2rem
          font-size 1.8rem
          font-weight bolder
          margin-right 1rem
          &:active 
            background red
          &:active 
            background red
            outline none
</style>
