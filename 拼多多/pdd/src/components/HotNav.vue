<template>
  <div id="wrapper">
    <ul>
      <li>
        <div v-for='(item, index) in NavDate.item1' :key = index>
          <img :src="item.iconurl" alt="">
          <span>{{item.icontitle}}</span>
        </div>
      </li>
      <li>
        <div v-for='(item, index) in NavDate.item2' :key = index>
          <img :src="item.iconurl" alt="">
          <span>{{item.icontitle}}</span>
        </div>
      </li>

    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
import {mapState} from 'vuex';
import IScroll from 'iscroll';

export default {
  name: 'HotNav',
  mounted() {
    new IScroll('#wrapper',{
      scrollX: true
    });
    this.$el.addEventListener('touchmove',e=>{
      e.preventDefault();
    });
  },
  computed: {
    ...mapState([
      "NavDate"
    ])
  },
}
</script>

<style scoped lang="stylus">
#wrapper 
  position relative
  width 100%
  background-color #fff
  overflow hidden
  ul 
    width 64rem
    li
      display flex 
      width 100%
      height 100%
      div 
        display flex
        flex-direction column
        justify-content space-around
        align-items center
        width 8rem
        height 8rem
        img   
          width 4rem
        span 
          font-family '微软雅黑'
          font-size 1.3rem

      
</style>
