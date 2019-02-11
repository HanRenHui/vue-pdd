<template>
  <div id="app">
    <transition :name="transName">
      <router-view :class="{layout: displayFlag}"/>
    </transition>
    <Tab
      v-if="$route.meta.showTab"
    />
  </div>
</template>

<script>
import Tab from './components/TabBar'

export default {
  name: 'App',
  data(){
    return {
      transName: '',
      displayFlag: false
    }
  },
  components: {
    Tab
  },
  mounted() {
    this.$store.dispatch('checkisLogin');
  },
  watch: {
    '$route'(to, from){
      // 个人页切到设置页
      if (from.path === '/me' && to.path === '/set') {
        this.transName = 'fold-left';
        this.displayFlag = true;
        // 设置页切到个人页
      } else if (from.path === '/set' && to.path === '/me') {

        this.transName = 'fold-right';

      } else  if(from.path === '/set' && to.path === '/edit') {

        this.transName = 'fold-left';

      } else if (from.path === '/edit' && to.path === '/set'){

        this.transName = 'fold-right';

      } else {
        // 其他的页面切换
        this.transName = 'fade';
        this.displayFlag = false;
      }
      
    }
  }
  
}
</script>
<style scoped lang="stylus">
 #app
  width 100%
  height 100%

.layout 
  position absolute
.fade-enter-active
  animation show 1.5s

@keyframes show 
  0% 
    opacity 0
  100%
    opacity 1
@keyframes hide 
  0%
    opacity 0
  100%
    opacity 1

.fold-left-enter-active 
  animation fold-left-in .3s 

.fold-left-leave-active 
  animation fold-left-out .3s

.fold-right-enter-active 
  animation fold-right-in .3s

.fold-right-leave-active 
  animation fold-right-out .3s


@keyframes fold-left-in 
  0% 
    transform translateX(100%)
  100% 
    transform translateX(0)
  

@keyframes fold-left-out 
  0% 
    transform translateX(0)
  100% 
    transform translateX(-100%)

@keyframes fold-right-in 
  0% 
    transform translateX(-100%)
  100% 
    transform translateX(0)
  
@keyframes fold-right-out 
  0% 
    transform translateX(0)
  100% 
    transform translateX(100%)
  




</style>