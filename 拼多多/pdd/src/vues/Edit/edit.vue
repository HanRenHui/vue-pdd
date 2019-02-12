<template>
  <div class="edit">
    <CommonHeader title='编辑个人信息' path="/set"/>
    <ul>
      <myCell title="手机号" :data='phone'/>
      <myCell title="昵称" :data='name || User.name'/>
      <myCell title="性别" :data='sex || User.gender' :handleClick='handleClick'/>
      <myCell title="地址" :data="address || User.address"/>
      <myCell title="生日" :data="birthday || User.birthday"/>
      <myCell title="个性签名" data="此人比较高冷！"/>
    </ul>
    <mt-actionsheet
      :actions="actions"
      v-model="sheetVisible"
    />
    <div :class="{normol: !canSave, saveButton: canSave}" @click="save()">保存一下</div>
  </div>
</template>

<script type="text/ecmascript-6">
import CommonHeader from '@/components/CommonHeader'
import { mapState } from 'vuex'
import myCell from './myCell'
import { req_edit_info } from '@/api/index.js'
import { MessageBox, Toast  } from 'mint-ui'
export default {
  data() {
    return {
      actions: [
        {name: '男', method: this.edit_sex},
        {name: '女', method: this.edit_sex}
      ],
      sheetVisible: false,
      name: '',
      sex: '',
      address: '',
      birthday: ''
    }
  },
  computed: {
    ...mapState([
      'User'
    ]),
    canSave(){
      return this.name !== '' 
        || this.sex !== '' 
        || this.address !== '' 
        || this.birthday !== '';
    },
    phone() {
      let temparr = this.User.phone.split('');
      let newArr = [];
      temparr.forEach((num, index) => {
        if(index >= 3 && index <= 7){
          num = "*";
        }
        newArr.push(num);
      });
      return newArr.join('');
    }
  },
  methods: {
    handleClick() {
      this.sheetVisible = true;
    },
    edit_sex({name}){
      this.sex = name;
    },
    reset(){
      this.name = "";
      this.sex = "";
      this.address = "";
      this.birthday = "";
    },
    // 保存个人信息
    async save() {
      if(this.canSave){
        // 编写后台接口修改信息
        let result = await req_edit_info({
          _id: this.User._id,
          sex: this.sex,
          address: this.address,
          birthday: this.birthday,
          name: this.name
        });
        
        let { status, data} = result;
        if(status === 200){
         Toast({
          message: data.message,
          position: 'top',
          duration: 1000
        });
  
        // 修改userinfo
        this.$store.dispatch('rewriteUserInfo', {
          _id: data._id,
          name: data.name,
          phone: this.User.phone,
          address: data.address,
          gender: data.sex
        });
          // 保存成功，将信息重置
        this.reset();
        }
      }else {
        MessageBox('提示', '未修改任何信息');
      }
    }
  },
  components: {
    CommonHeader,
    myCell
  },
 

}
</script>

<style scoped lang="stylus">
button(bgColor) 
  position fixed
  left 0 
  bottom 0
  background bgColor
  width 100% 
  height 5rem
  color #fff 
  font-family "微软雅黑"
  text-align center
  line-height 5rem
  font-size 2rem
.edit 
  width 100%
  height 100%
  background #f5f5f5
  ul 
    width 100%
    margin-top 2rem 
  .saveButton 
    button(#e02e24);
    &:active 
      background red
  .normol 
    button(gray);

</style>
