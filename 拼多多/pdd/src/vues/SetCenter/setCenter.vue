<template>
  <div class="setCenter">
    <!-- 头部导航 -->
    <CommonHeader title="设置" path = '/me'/>
  <!-- 个人信息 -->
    <section class="userInfo">
      <div class="userInfo-left">
        <div class="userInfo-l-left">
          <img src="./images/me_icon.png" alt="">
        </div>
        <div class="userInfo-l-right">
          <span v-if="User.name">{{User.name}}</span>
          <span v-else>请填写会员名</span>
          <span v-if="User.phone">{{User.phone | userPhone}}</span>
          <span v-else>请填写手机号</span>
        </div>
      </div>
      <div class="userInfo-right" @click="$router.replace('/edit')">编辑</div>
    </section>
    <!-- 账户安全 -->
    <section class="safe">
      账户与安全
    </section>
    <ul class="center-content">
      <li>
        <span>地区设置</span>
        <span style="color: gray">〉</span>
      </li>
      <li>
        <span>音效与通知</span>
        <span style="color: gray">〉</span>
      </li>
      <li>
        <span>隐私</span>
        <span style="color: gray">〉</span>
      </li>
      <li>
        <span>通用</span>
        <span style="color: gray">〉</span>
      </li>
    </ul>
    <ul class="bottom-content">
      <li>
        <span>问题反馈</span>
        <span style="color: gray">〉</span>
      </li>
      <li>
        <span>关于拼多多</span>
        <span style="color: gray">〉</span>
      </li>
    </ul>
    <!-- 退出 -->
    <section class="login_out" @click="edit()">退出当前账户</section>
  </div>
</template>

<script type="text/ecmascript-6">
import { MessageBox, Toast } from 'mint-ui'
import { mapState } from 'vuex'
import CommonHeader from '@/components/CommonHeader'

export default {
  data() {
    name: 'set-center'
    return {

    }
  },
  methods: {
    // 退出
    edit(){
      MessageBox.confirm('您确定退出么?').then(action => {
        this.$store.dispatch('edit_login');
        this.$router.replace('/me');
        Toast({
          message: '退出成功',
          position: 'top',
          duration: 1000,
        });
      });
    },
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
  components: {
    CommonHeader
  },
  computed: {
    ...mapState([
      'User'
    ])
  }
}
</script>

<style scoped lang="stylus">
padding()
  padding 0 1.5rem
  box-sizing border-box
base()
  font-size 1.7rem
  font-family '微软雅黑'
  margin 1.5rem 0
  height 4.5rem
  line-height 4.5rem
.clearfix::after
  content ''
  display block
  clear both
.setCenter 
  width 100%
  height 100%
  background #f5f5f5
  overflow hidden
    .right
      float left
      margin-left -3rem
      width 3rem
      height 100%
      background red
  .userInfo 
    display flex
    justify-content space-between 
    align-items center
    background #fff
    padding()
    height 8rem
    .userInfo-left 
      display flex 
      align-items center
      width 50%
      .userInfo-l-left 
        img 
          border-radius 50%
          width 6rem
          margin-right 1.5rem
      .userInfo-l-right 
        height 80%
        span 
          font-family '微软雅黑'
          &:first-child 
            font-size 1.5rem
          &:last-child 
            font-size 1.2rem 
            color gray
    .userInfo-right 
      font-size 1.7rem 
      color gray 
      font-family '微软雅黑'
      border 2px solid gray 
      padding 1rem 
      padding-top .6rem
      padding-bottom .6rem
      border-radius .8rem
      &:active 
        background-color #e0e0e0
  .safe
    background #fff 
    padding()
    base()
  .center-content, .bottom-content
    width 100%
    padding()
    background #fff
    li  
      display flex
      justify-content space-between
      width 100%
      base()
      border-bottom 1px solid #e0e0e0
  
  .login_out 
    position fixed
    left 0
    bottom 0
    width 100%
    height 5rem
    text-align center
    line-height 5rem
    color #fff
    background #e02e24
    font-size 1.5rem
    font-family '微软雅黑'

</style>
