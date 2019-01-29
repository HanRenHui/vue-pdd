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
// import Tab from './components/TabBar'
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
  computed: {
  },
  watch: {
    '$route'(to, from){
      if(to.path === '/set'){
        this.transName = 'fold-left';
        this.displayFlag = true;
      }else if(from.path === '/set'){
        this.transName = 'fold-right';
      }else {
        this.transName = '';
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
.fold-left-enter-active {
  animation fold-left-in .3s 
}
.fold-left-leave-active {
  animation fold-left-out .3s
}
.fold-right-enter-active {
  animation fold-right-in .3s
}
.fold-right-leave-active {
  animation fold-right-out .3s
}

@keyframes fold-left-in {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
}
@keyframes fold-left-out {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}

@keyframes fold-right-in {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
}
@keyframes fold-right-out {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(100%);
  }
}



</style>