<template>
  <div class="Login">
    <img src="https://cdn.yangkeduo.com/assets/img/login_footer.png" class="login_logo" alt="">
    <div class="login-title">
      <a href="javascrip:;" :class="{current: checked}" @click="change(true)">短信登陆</a>
      <a href="javascrip:;" :class="{current: !checked}" @click="change(false)">密码登陆</a>
    </div>
    <form action="" method="POST">
      <!-- 手机号验证 -->
      <div v-if="checked" class="phone_login">
        <div class="phone_login_box">
          <input 
            type="text" 
            placeholder="请输入手机号..." 
            maxlength="11" ref="phone_code" 
            v-model="phone" name="phone" 
          >
          <button v-if="count==0" :class="{canUse: can}" @click.prevent="get_code()" >获取验证码</button>
          <button v-else>已发送({{count}})s</button>
        </div>
        <input 
          type="text" 
          class="phone_text_code" 
          placeholder="请输入短信验证码...." 
          maxlength='6' 
          v-model="client_code" 
          name="phone_code" 
        >
        <p class="lawyer">
          温馨提示：未注册的手机号，登录时将自动注册，且代表已同意 <span style="color: #e02e24">服务协议与隐私政策</span>
        </p>
      <input type="submit" value="登陆" class="login" @click.prevent='login()'>
      </div>
      <!-- 密码验证  -->
      <div v-else class="pwd_login">
        <input 
            type="text" 
            placeholder="请输入用户名..."  
            v-model="username" 
            name="name" 
        >
        <div class="password-box">
          <input 
            v-if="hide"
            type="password" 
            placeholder="请输入密码..."  
            v-model="password" 
            name="password" 
          > 
          <input 
            v-else
            type="text" 
            placeholder="请输入密码..."  
            v-model="password" 
            name="password" 
          > 
          <img v-if="hide" src="./images/hide_pwd.png" @click="hide=false" alt="">
          <img v-else src="./images/show_pwd.png" @click="hide=true" alt="">
        </div>
        <div class="captcha-box">
          <input 
            type="text" 
            placeholder="请输入验证码..."  
            v-model="captcha" 
            name="name" 
            class="captcha"
          >
          <img src="http://localhost:1688/api/getCaptcha" ref="captcha" @click="changeCaptcha()" alt="">
        </div>
      <input type="submit" value="登陆" class="login" @click.prevent='loginPwd()'>       

      </div>
    </form>
    <input type="submit" value="返回" class="back" @click.prevent='back()'>
   

  </div>

</template>

<script type="text/ecmascript-6">
import { Toast } from 'mint-ui';

import {mapState} from 'vuex';

import {
  requireTextCode, 
  phone_login, 
  pwd_login,
} from '@/api/index.js'


export default {
  name: 'Login',
  data() {
    return {
      checked: true   ,
      count: 0,
      // 记录电话号码
      phone: '',
      // 记录验证码
      client_code: '',
      username: '',
      password: '',
      captcha: '',
      hide: true
    }
  },
  methods: {
    // 切换登陆方式
    change(flag){
      this.checked = flag;
      
    },
    // 获取短信验证码
    async get_code(){
      // 满足手机号验证条件时,才能请求验证码
      if(this.can){
        // 弹窗
        Toast({
          message: '验证码发送成功',
          position: 'middle',
          duration: 1000,
        });

        // 倒计时
        this.count = 60;
        let timer = null;
        timer = setInterval(()=>{
          this.count--;
          if(this.count === 0){
            clearInterval(timer);
          }
        },1000);

        // 后台请求
        let result = await requireTextCode({phone: this.phone});
        if(result.status === 200){
          let data = result.data;
          console.log(data);
          
          this.server_code = data.random_code;
        }
      }
    },

    // 手机验证码登陆方式
    async login(){
      if(!this.phone || !this.client_code ){
         Toast({
          message: '手机号或验证码不能为空',
          position: 'bottom',
          duration: 1000,
        });
        return ;
      }
      let result = await phone_login({phone: this.phone, code: this.client_code});
      if(result.status === 200){
        let data = result.data;
        let message = data.message;
        Toast({
          message,
          position: 'top',
          duration: 1000,
        });
         // 更新state中的个人信息
        this.$store.dispatch('rewriteUserInfo', {
          _id: data._id,
          name: data.name,
          phone: data.phone,
          address: data.address,
          gender: data.gender
        });
        // 路由跳转
        this.$router.back();
      }

    },

    // 监听返回按钮
    back(){
      this.$router.back();
    },

    // 更换图片验证码
    changeCaptcha(){
      this.$refs.captcha.src = 'http://localhost:1688/api/getCaptcha?time=' + new Date();
    },

    // 密码方式登录
    async loginPwd(){
      if(!this.username || !this.password || !this.captcha){
        Toast({
          message: '请输入完整信息',
          position: 'middle',
          duration: 1000,
        });
      }
      let result = await pwd_login({
        name: this.username,
        password: this.password,
        captcha: this.captcha
      });

      if(result.status === 200){
        let data = result.data;
        Toast({
          message: data.message,
          position: 'middle',
          duration: 1000,
        });
        if(!data.status){
          return ;
        }
        // 更新state中的个人信息
        this.$store.dispatch('rewriteUserInfo', {
          _id: data._id,
          name: data.name,
          phone: data.phone
        });
        // 路由跳转
        this.$router.back();
        
      }
    }
  },
  components: {
    
  },
  computed: {
    can(){
      return  /^1[34578]\d{9}$/.test(this.phone);
    },
    ...mapState([
      'User'
    ])
  }
}
</script>

<style scoped lang="stylus">
input()
  width 33rem
  height 4.8rem
  box-sizing border-box
  padding 0 1rem
  font-size 1.5rem
  border 1px solid #ddd
  border-radius .4rem
  outline none
button 
  outline none

.Login 
  .login_logo 
    display block
    margin 8rem auto 3em auto
    width 20rem
  .login-title
    display flex
    justify-content space-around
    font-family '微软雅黑'
    margin: 0 auto
    width 20rem
    a 
      font-size 1.4rem
      color #000
      text-decoration none
      padding .8rem 0
      &.current
        color red
        font-weight bolder
        border-bottom 2px solid #e02e24
  .phone_login  
    width 100%
    margin-top 2rem
    width 33rem
    position relative
    left 50%
    transform translateX(-50%)
    .phone_login_box
      position relative
      left 50%
      transform translatex(-50%)
      width 33rem
      height 4.8rem
      text-align center
      .canUse 
        color #e02e24
        font-weight bolder
      input 
        input()
      button 
        position absolute
        top 50%
        transform translateY(-50%)
        right 1rem
        background transparent
        border none
        color #ccc
        font-size 1.4rem
    .phone_text_code 
      input()
      margin-top 2rem
    .lawyer
      width 33rem
      height 4.8rem
      margin-top 2rem
      font-size 1.4rem
      font-family '微软雅黑'
  .pwd_login
    width 100%
    margin-top 2rem
    width 33rem
    position relative
    left 50%
    transform translateX(-50%)
    .password-box
      position relative
      width 100%
      height 4.8rem
      margin-top 2rem
      img 
        position absolute 
        top 50%
        transform translateY(-50%)
        right 1rem
        width 2.5rem
    input 
      input()
    .captcha-box
      position relative;
      width 100%
      height 100%
      margin-top 2rem
      img 
        position absolute 
        height 4.8rem
        top 0
        right 0
  .login, .back
    display: block;
    width: 33rem;
    height: 42px;
    border-radius: 4px;
    color: #fff;
    text-align: center;
    font-size: 16px;
    line-height: 42px;
    font-family '微软雅黑'
  .login
    margin 3rem auto 0 auto;
    background #e02e24;
    border 0;
  .back
    margin 1rem auto;
    background #fff
    color #e02e24
    border 1px solid #e02e24
</style>
