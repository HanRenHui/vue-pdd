<template>
  <scroll class="scroller" :upCallback="upCallback" ref="mescroll" warpId="index_scroll"
          id="index_scroll"  v-if="User._id">
  <div class="recommend">
      <div class="rec-item" v-for="(good, index) in ReqList" :key=index>
        <img :src="good.hd_thumb_url" alt="">
        <p>{{good.goods_name}}</p>
        <span class="tag" v-for="(tag, item) in good.tag_list" :key= item>
          {{tag.text}}
        </span>
        <div class="item-bottom">
          <div class="item-b-left">
            <span class="price">￥{{good.price/100}}</span>
            <span class="sales_tip">{{good.sales_tip}}</span> 
          </div>
          <button class="item-b-right">发现 ></button>
        </div>
      </div>
      
  </div>
  </scroll>

  <login_select v-else/>
</template>

<script type="text/ecmascript-6">
import {mapState} from 'vuex';
import login_select from './../Login/Login_select';
import axios from 'axios'
  import Scroll from './../../components/mescroll/Scroll';

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
          'offset': (page.num-1) * page.size,
          'count': page.size,
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
  .recommend 
    width 100%
    background #f5f5f5
    font-family "微软雅黑"
    margin-bottom 4.8rem
    display flex
    flex-wrap wrap
    justify-content space-between
    .rec-item
      width 49.5%
      background #fff
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
        display flex
        justify-content space-between
        margin .5rem 0
        .item-b-left
          .price 
            color red
            font-weight bolder
            font-size 1.3rem
            margin 0 .5rem 
          .sales_tip
            color #ccc
        .item-b-right
          border 1px solid #ccc
          background #fff
          color #000
          border-top-left-radius 1rem
          border-bottom-left-radius 1rem
          width 6rem
          height 2.5rem
</style>
