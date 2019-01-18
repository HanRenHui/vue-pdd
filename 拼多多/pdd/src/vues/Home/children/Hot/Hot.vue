<template>
  <div class="hot">
    <!-- 轮播图 -->
    <Carousel />
    <!-- 展示橱窗 -->
    <HotNav/>
    <img class="ad" src="//t00img.yangkeduo.com/goods/images/2019-01-11/e3a1b04383cb58b89c3dee39054a371a.gif?imageMogr2/strip%7CimageView2/2/w/1300/q/80" alt="">
    <!-- homegoodsList  -->
    <GoodsLists />
  </div>
</template>

<script type="text/ecmascript-6">
  import Carousel from "@/components/Carousel";
  import HotNav from '@/components/HotNav'
  import GoodsLists from '@/components/HomeGoodsList'
export default {
  name: 'Hot',
  data() {
    return {

    }
  },
  mounted() {
    // 请求轮播图数据
    this.$store.dispatch('reqCarou');
  // 请求hotnav的数据
    this.$store.dispatch('reqHotNav');
    // 请求goodslist数据
    this.$store.dispatch('goodsList');
  },
  components: {
    Carousel,
    HotNav,
    GoodsLists
  }
}
</script>

<style scoped lang="stylus">
.hot 
  width 100%
  background-color #e02e24
  .ad 
    width 100%
</style>
