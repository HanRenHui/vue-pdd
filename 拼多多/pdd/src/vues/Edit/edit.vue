<template>
  <div class="edit">
    <CommonHeader title='编辑个人信息' path="/set"/>
    <ul>
      <myCell title="手机号" :data='phone'/>
      <myCell title="昵称" :data='User.name'/>
      <myCell title="性别" :data='User.gender' :handleClick='handleClick'/>
      <myCell title="地址" :data="User.address"/>
      <myCell title="生日" :data="User.birthday"/>
      <myCell title="个性签名" data="此人比较高冷！"/>
    </ul>
    <mt-actionsheet
      :actions="actions"
      v-model="sheetVisible"
    />
  </div>
</template>

<script type="text/ecmascript-6">
import CommonHeader from '@/components/CommonHeader'
import { mapState } from 'vuex'
import myCell from './myCell'
export default {
  data() {
    return {
      actions: [
        {name: '男', method: this.editGender},
        {name: '女', method: this.editGender}
      ],
      sheetVisible: false
    }
  },
  computed: {
    ...mapState([
      'User'
    ]),
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
    editGender({name}) {
      let sex = name;
      console.log(sex);
      // 编写后台接口修改性别
    }
  },
  components: {
    CommonHeader,
    myCell
  }

}
</script>

<style scoped lang="stylus">
.edit 
  width 100%
  height 100%
  background #f5f5f5
  ul 
    width 100%
    margin-top 2rem
    


</style>
