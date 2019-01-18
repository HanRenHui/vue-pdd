<template>
  <div class="center">
    <div class="center-header">
      <!-- 头部上边部分 -->
      <div class="center-header-top">
        <div class="center-header-top-left">
          <img src="./images/me_icon.png" alt="">
          <div class="center-header-top-left-me">
            <p v-if="User.phone">{{User.phone | userPhone}}</p>
            <p v-else>
              <!-- 17336624466 -->
                请填写电话号码
            </p>
          
            <span>勋章墙 ></span>
          </div>
        </div>
      
        <div class="center-header-top-right"><span>拼单返现 ></span> </div>

      </div>

      <!-- 头部下边部分 -->
      <div class="center-header-bottom">
        <div class="center-header-bottom-content">
          <span class="left">品牌卡折扣专场</span>
          <span class="right">玖姿65折抢</span>
        </div>
      </div>

    </div>
    <!-- 订单 -->
    <div class="center-dingdan clearfix">
      <div class="center-dingdan-title ">
        <div class="title-left">我的订单</div>
        <div class="title-right">查看全部 ></div>
      </div>
      <div class="center-dingdan-cont">
        <ul>
          <li>
            <i class="icon-3"></i>
            <span>待付款</span>
          </li>
          <li>
            <i class="icon-5"></i>
            <span>待分享</span>
          </li>
          <li>
            <i class="icon-10"></i>
            <span>待发货</span>
          </li>
          <li>
            <i class="icon-4"></i>
            <span>待收货</span>
          </li>
          <li>
            <i class="icon-2"></i>
            <span>待评价</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- 中间红颜色的 -->
    <div class="center-center">
      <ul>
        <li>
          <i class="icon-19"></i>
          <span>优惠券</span>
        </li>
        <li>
          <i class="icon-11"></i>
          <span>商品收藏</span>
        </li>
        <li>
          <i class="icon-26"></i>
          <span>店铺收藏</span>
        </li>
        <li>
          <i class="icon-20"></i>
          <span>历史浏览</span>
        </li>
        <li>
          <i class="icon-17"></i>
          <span>退款售后</span>
        </li>
      </ul>
    </div>

    <!-- 下边黄颜色的 -->
    <div class="center-main">
      <ul>
        <li>
          <i class="icon-7"></i>
          <span>官方客服</span>
        </li>
        <li>
          <i class="icon-8"></i>
          <span>我的评价</span>
        </li>
        <li>
          <i class="icon-12"></i>
          <span>收获地址</span>
        </li>
        <li>
          <i class="icon-18"></i>
          <span>邀请好友</span>
        </li>
        <li>
          <i class="icon-9"></i>
          <span>设置</span>
        </li>
      </ul>
    </div>

    <!-- 精选推荐 -->
    <div class="edit" @click="edit()">
      退出登录
    </div>
    <div class="center-recommend">
      <div class="recommend-title">
        
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {mapState} from 'vuex'
import { Toast, MessageBox } from 'mint-ui';
export default {
  name: 'center',
  data() {
    return {

    }
  },
  computed: {
    ...mapState([
      'User'
    ])
  },
  filters: {
    userPhone(phone){
      let tempArr = phone.split('');
      let newArr = [];
      tempArr.forEach((value, index)=>{
        if(index >= 3 && index <= 6){
          value = '*';
        }
        newArr.push(value)
      });
      return newArr.join('');
    }
  },
  methods: {
    edit(){
      MessageBox.confirm('您确定退出么?').then(action => {
         this.$store.dispatch('edit_login');
        Toast({
          message: '退出成功',
          position: 'top',
          duration: 1000,
        });
      });
     
    }
  }
}
</script>

<style scoped lang="stylus">
item()


.clearfix::before 
  content: ''
  display table
.center
  width 100%
  height 100%
  background #f5f5f5
  .center-header 
    padding 1rem 1rem 0 1rem
    background #fff
    .center-header-top
      display flex
      justify-content space-between
      width 100%
      .center-header-top-left
        display flex
        justify-content space-around
        align-items center
        width 63%

        img 
          border-radius 50%
          width 7rem
          height 7rem
        .center-header-top-left-me
          font-family '微软雅黑'
          p
            font-size 1.8rem
          span 
            color #9c9c9c
            font-size 1.4rem
      .center-header-top-right
        display flex
        font-size 1.4rem
        align-items center
        justify-content center
        font-family '微软雅黑'
        width 37%
        text-align center
        span
          display inline-block
          
          font-size 1.5rem
          border-radius 2rem
          width 9rem
          height 3rem
          line-height 3rem
          border 1px solid #9c9c9c
    .center-header-bottom
      width 100%
      height 5rem
      margin-top 1.5rem
      .center-header-bottom-content
        display flex
        justify-content space-between
        align-items center
        width 95%
        height 100%
        margin 0 auto 
        background url('https://pinduoduoimg.yangkeduo.com/personal/personal-entry-bg4.png') center center
        border-top-left-radius .8rem
        border-top-right-radius .8rem
        font-family '微软雅黑'
        .left
          color #ffe2c0
          font-size 1.4rem
          margin-left 2rem
        .right
          display inline-block
          margin-right 1.8rem
          width 8.8rem
          height 2.7rem
          color #3d3a4d
          background #ffe2c0
          border-radius 1rem
          text-align center
          line-height 2.7rem
          font-size 1.4rem
  .center-dingdan
    font-family '微软雅黑'
    background #fff
    width 100%
    .center-dingdan-title
      width 90%
      margin 1.5rem auto
      display flex
      justify-content space-between
      .title-left
        font-size 1.8rem
      .title-right 
        color: #999;
        font-size: 1.3rem
    .center-dingdan-cont
      width 100%
      height 7.5rem
      padding 0 0 1.5rem 0
      ul 
        display flex
        width 100%
        height 100%
        li 
          display flex
          flex-direction column
          justify-content space-around
          align-items center
          font-size 1.5rem
          width 20%
          height 100%
          color #58595b
          i   
            font-size 3.5rem
  .center-center
    font-family '微软雅黑'
    width 100%
    height 7.5rem
    margin 1.5rem 0
    background #fff
    padding 1.5rem 0
    ul 
      display flex
      width 100%
      height 100%
      li 
        display flex
        flex-direction column
        justify-content space-around
        align-items center
        font-size 1.5rem
        width 20%
        height 100%
        color #58595b
        i   
          font-size 3.5rem
  .center-main
    font-family '微软雅黑'
    width 100%
    height 7.5rem
    background #fff
    padding 1.5rem 0
    ul 
      display flex
      width 100%
      height 100%
      li 
        display flex
        flex-direction column
        justify-content space-around
        align-items center
        font-size 1.5rem
        width 20%
        height 100%
        color #58595b
        i   
          font-size 3.5rem
  .edit 
    width 100%
    height 4rem
    margin-top 2rem
    font-family '微软雅黑'
    color: #e02e24;
    background: #fff;
    text-align center
    line-height 4rem
    font-size 1.8rem
    font-weight bolder

</style>
