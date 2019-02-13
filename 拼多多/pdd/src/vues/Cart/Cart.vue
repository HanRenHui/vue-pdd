<template>
  <div class="cart" v-if="User._id">
  <div class="header">
      <a href="" class="icon_back"></a>
      <h3>购物车</h3>
      <a href="" class="icon_menu"></a>
    </div>
    <!--安全提示-->
    <div class="jd_safe_tip">
      <p class="tip_word">
        您正在安全购物环境中，请放心购物
      </p>
    </div>
    <!--中间的列表-->
    <main class="jd_shopCart_list">
      <section>
        <div class="shopCart_list_con" v-for="(goods, index) in cartGoods" :key="index">
          <div class="list_con_left">
            <a
              href="javascript:;"
              :class="{cart_check_box:true, checked: goods.checked}"
              @click='changeChecked(index)'
            ></a>
          </div>
          <div class="list_con_right">
            <div class="shop_img">
              <img :src="goods.thumb_url"
                   alt="">
            </div>
            <div class="shop_con">
              <a href="">{{goods.goods_name}}</a>
              <p class="shop_price"></p>
              <div class="shop_deal">
                <div class="shop_deal_left">
                  <span @click="Count(index, false, goods)">-</span>
                  <input type="tel" value="1" readonly='readonly' v-model='goods.buy_count'>
                  <span @click="Count(index, true, goods)">+</span>
                </div>
                <div class="shop_deal_right" @click="deleteOne(goods, index)">
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    <!--底部通栏-->
    <div id="tab_bar">
      <div class="tab-bar-left">
        <a
          href="javascript:;"
          :class="{cart_check_box: true, checked: checkAll}"
          @click="allCheck()"
        ></a>
        <span style="font-size: 16px;">全选</span>
        <div class="select-all">
          合计：<span class="total-price">{{money}}</span>
        </div>
      </div>
      <div class="tab-bar-right">
        <a href="#" class="pay">去结算</a>
      </div>
    </div>
  </div>
  <login_select v-else/>
</template>

<script type="text/ecmascript-6">
import login_select from './../Login/Login_select';
import {mapState} from 'vuex'
import {MessageBox} from 'mint-ui'
export default {
  name: 'Cart',
  data() {
    return {
      allCheckFlag: false
    }
  },
  components: {
    login_select
  },
  computed: {
    ...mapState([
      'User',
      'cartGoods'
    ]),
    checkAll: {
      get(){
        let flag = true;
        this.cartGoods.forEach((good, index)=>{
          if(!good.checked){
            flag = false;
          }
        });
        return flag;
      }
    },
    money: {
      get() {
        let total = 0;
        this.cartGoods.forEach(good => {
          if(good.checked) {
            total += good.price*good.buy_count;
          }
        });
        return `￥${total.toFixed(2) / 10} 元`;
      }
    }
  },
  watch: {
   
  },

  methods: {

    // 数量改变
    Count(index, flag, goods) {
      
      this.$store.dispatch('resetCount', {index, flag, user_id: this.User._id, goods_id: goods.goods_id});
    },

    // 删除一件商品
    deleteOne(goods, index) {
      MessageBox.confirm('您确定删除该商品么!').then(action => {
          let goods_id = goods.goods_id;

       this.$store.dispatch('deleteGood', {goods_id, user_id: this.User._id, index});  
      });
    },
    // 改变选中状态
    changeChecked(index) {
      this.$store.dispatch('check', index);
    },
    // 全选
    allCheck() {
      this.allCheckFlag = !this.allCheckFlag;
      this.$store.dispatch('selectAll', this.allCheckFlag);
    },
  
  }
}
</script>
<style lang="stylus" scoped>
 .cart
    width 100%
    height 100%
    background-color #e0e0e0

    .header
      width: 100%;
      height: 44px;
      background: #ececec;
      -webkit-background-size: 1px 44px;
      background-size: 1px 44px;
      border-bottom: 1px solid #e0e0e0;
      position: fixed;
      left: 0;
      top: 0;
      display flex
      justify-content center
      align-items center
      font-size 18px
      font-weight bolder
      color #E9232C
      z-index 999

    .jd_safe_tip
      margin-top 44px
      height 36px
      line-height 36px
      border-bottom: 1px solid #e0e0e0;
      background-color #fff
      text-align center

      .tip_word
        display inline-block
        font-size 14px
        padding-left 20px
        position relative

        &:before
          content ''
          width 18px
          height 18px
          background url("./images/safe_icon.png") no-repeat
          -webkit-background-size 18px 18px
          background-size 18px 18px
          position absolute
          top 9px
          left 0

    .jd_shopCart_list
      margin-bottom 64px
      background-color #e0e0e0

      section
        margin-top 15px
        border-top 1px solid #e0e0e0
        background-color #fff

        .shopCart_list_con
          padding: 10px 0
          border-bottom 1px solid #e0e0e0

          .list_con_left
            .cart_check_box
              float left
              background url("./images/shop-icon.png") no-repeat
              -webkit-background-size 50px 100px
              background-size 50px 100px
              width 20px
              height 20px
              margin-top 17px
              margin-left 7px
            .checked
              background-position -25px 0
          .list_con_right
            overflow: hidden;
            padding: 0 7px;

            .shop_img
              float left

              img
                width 80px
                height 80px
                display block

            .shop_con
              overflow hidden
              padding-left 7px

              & > a
                font-size 14px
                color #666
                line-height 20px
                height 40px
                overflow hidden
                display block
                text-decoration none

              .shop_price
                color #E9232C
                margin-top 5px

              .shop_deal
                margin-top 5px

                .shop_deal_left
                  float left

                  & > span
                    border 1px solid #e0e0e0
                    display inline-block
                    width 30px
                    height 25px
                    line-height 25px
                    text-align center
                    float left

                    &:first-child
                      border-top-left-radius 3px
                      border-bottom-left-radius 3px

                    &:last-child
                      border-top-right-radius 3px
                      border-bottom-right-radius 3px

                  input
                    border none
                    border-top 1px solid #e0e0e0
                    border-bottom 1px solid #e0e0e0
                    float left
                    width 50px
                    height 25px
                    text-align center

                .shop_deal_right
                  float right

                  & > span:first-child
                    background url('./images/delete_up.png') no-repeat
                    background-size 18px 4px
                    width 18px
                    height 4px
                    display block

                  & > span:last-child
                    background url('./images/delete_down.png') no-repeat
                    background-size 17px 17px
                    width 17px
                    height 17px
                    display block
                    margin-top -3px

    #tab_bar
      position: fixed
      left 0
      bottom 50px
      width 100%
      height 44px
      background-color #fff
      display flex
      justify-content space-between
      align-items center
      box-shadow 0 -5px 5px #e0e0e0
      border-bottom: 1px solid #e0e0e0

      .tab-bar-left
        display flex
        align-items center
        margin-left 7px

        .cart_check_box
          float left
          background url("./images/shop-icon.png") no-repeat
          -webkit-background-size 50px 100px
          background-size 50px 100px
          width 20px
          height 20px
          margin-top 4px
          margin-left 4px

        .checked
          background-position -25px 0

        .select-all
          margin-left 8px
          font-size 16px

      .tab-bar-right
        .pay
          width 90px
          height 44px
          background-color #E9232C
          display flex
          justify-content center
          align-items center
          font-size 18px
          color #fff
          text-decoration none
</style>


