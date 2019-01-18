<template>
  <div class="tab">
    <tab-item
      v-for="(url, index) in imgUrl"
      :key=index
      :imgSrc=imgSrc(index)
      :title=url.title
      :select=ischecked(index)
      :path=url.path
    />
  </div>
</template>

<script type="text/ecmascript-6">
import TabItem from './TabItem';
import {mapState} from 'vuex';
export default {
  name:"Tab",
  data() {
    return {
      
    }
  },
  components: {
    TabItem
  },
  mounted() {
    // this.$store.dispatch('reqTab');
    // console.log(this.$store.dispatch);
    this.$store.dispatch('reqTab');
    
  },
  methods: {
    // 判断哪个tab该变色
    ischecked(index){
      // console.log(this.$store.state.imgSrc);
      
      return this.$route.path.includes(this.imgUrl[index].path);
    },
    
    imgSrc(index){
      return this.ischecked(index) ? this.imgUrl[index].checkedSrc : this.imgUrl[index].normalSrc;
    },
  },
  computed: {
    ...mapState([
      'imgUrl'
    ])
  }
}
</script>

<style scoped lang="stylus">
  .tab 
    position fixed
    left 0
    bottom 0
    width 100%
    height 5rem
    display flex
    box-shadow 0 -2px 15px #ccc
    z-index 100
    background #fff
    font-family '微软雅黑'
    
</style>
