<template>
  <div class="home">
    <ly-tab
      v-model="selectedId"
      :items="items"
      :options="options"
      @change="handleChange"
    >
    </ly-tab>
    <router-view />
  </div>
</template>

<script type="text/ecmascript-6">

export default {
  name: 'Home',
  data() {
    return {
      selectedId: 0,
      items: [
        {label: '热门'},
        {label: '女装'},
        {label: '内衣'},
        {label: '鞋包'},
        {label: '母婴'},
        {label: '百货'},
        {label: '男装'},
        {label: '手机'},
        {label: '电器'},
        {label: '食品'},
        {label: '美妆'},
        {label: '电脑'},
        {label: '运动'},
        {label: '家纺'},
        {label: '家装'},
        {label: '汽车'},
        {label: '家具'},
        {label: '水果'},
      ],
      // 二级路由路径数组
      secondRouteArr: [
        '/home/hot',
        '/home/clothes',
        '/home/InnerClothes',
      ],
      options: {
        activeColor: '#fff'
        // 可在这里指定labelKey为你数据里文字对应的字段
      },
    }
  },
  methods: {
    handleChange(item,index){
      this.$router.replace(this.secondRouteArr[index]);
    }
  },
  components: {

  }
}
</script>

<style scoped lang="stylus">
.home 
  width 100%
  height 100%

</style>
