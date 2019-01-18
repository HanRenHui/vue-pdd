<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div 
        class="swiper-slide" 
        v-for = "(img, index) in CarouImg" 
        :key = index
      >
        <img :src="img" alt="">
      </div>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</template>

<script type="text/ecmascript-6">
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.css'
import {mapState} from 'vuex'
export default {
  name: 'Carousel',
  data() {
    return {

    }
  },
  mounted() {
  
   
  },
  watch: {
    CarouImg() {
      this.$nextTick(()=>{
          let mySwiper = new Swiper('.swiper-container', {
            autoplay: true,//可选选项，自动滑动,
            pagination: {
                el: '.swiper-pagination',
              },
          })
      });
    }
  },
  computed: {
    ...mapState([
      'CarouImg'
    ])
  }
}
</script>

<style scoped lang="stylus">
img 
  width 100%
  height 100%
</style>
