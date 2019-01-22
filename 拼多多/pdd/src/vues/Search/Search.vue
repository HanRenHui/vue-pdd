<template>
  <div class="search" v-if="!showSearchPanel">
    <div class="header">
      <div class="header-content">
        <img src="./images/search.png" alt="">
        <span>搜索一下</span>
      </div>
    </div>
    <section class="search-main">
      <section class="search-main-left">
        <ul>
          <li class="current"><a href="javscript:;">女装</a></li>
          <li><a href="javscript:;">鞋包</a></li>
          <li><a href="javscript:;">男装</a></li>
          <li><a href="javscript:;">内衣</a></li>
          <li><a href="javscript:;">食品</a></li>
          <li><a href="javscript:;">百货</a></li>
          <li><a href="javscript:;">美妆</a></li>
          <li><a href="javscript:;">手机</a></li>
          <li><a href="javscript:;">电器</a></li>
          <li><a href="javscript:;">家纺</a></li>
          <li><a href="javscript:;">家具</a></li>
          <li><a href="javscript:;">电脑</a></li>
          <li><a href="javscript:;">充值</a></li>
          <li><a href="javscript:;">水果</a></li>
          <li><a href="javscript:;">运动</a></li>
          <li><a href="javscript:;">家装</a></li>
          <li><a href="javscript:;">汽车</a></li>
          <li><a href="javscript:;">海淘</a></li>
          <li><a href="javscript:;">健康</a></li>
        </ul>
      </section>
      <section class="search-main-right">
        <div class="content" ref="content">
          <div v-for="(list, index) in SearchList" :key = index class="list">
            <div class="search-main-header">
              <span>{{list.name}}</span>
              <span>查看更多</span>
            </div>
            <ul>
              <li v-for="(good, key) in list.items" :key=key>
                <img v-lazy="good.icon" alt="">
                <span>{{good.title}}</span>
              </li>
            </ul>
          </div>
        </div> 
      </section>
    </section>
  </div>
  <div class="searchPanel" v-else>
    <div class="searchPanel-header">
      <div class="header-left">
        <span></span>
        <input type="text">
      </div>
      <div class="header-right">
        <button>取消</button>
      </div>
    </div>
    <div class="searchPanel-recently">
      
    </div>
    <div class="searchPanel-hot">
      <div class="hot-header">
        <img src="./images/热门.png" alt=""><span>热门搜索</span>
      </div>
      <ul class="hot-content clearfix">
        <li v-for="(search, index) in HotSearch" :key = index>
          {{search}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {mapState} from 'vuex';
import BScroll from 'better-scroll'
import {requireSearchHot} from '@/api/index.js'
export default {
  name: 'Search',
  data() {
    return {
      showSearchPanel: true,
      HotSearch: []
    }
  },
  mounted(){
    // 请求热门搜索的数据
    this.hotSearch()
    this.$store.dispatch('searchList');
    let left = new BScroll('.search-main-left');
    this.right = new BScroll('.search-main-right');
    let content = this.$refs.content;
    let lists = content.children;

    
  },
  methods: {
    async hotSearch(){
      const result = await requireSearchHot();
      if(result.status === 200){
        let data = result.data; 
        this.HotSearch = data.items;
        console.log(this.HotSearch);
        
      }
    }
  },
  computed: {
    ...mapState([
      'SearchList'
    ])
  },
  watch: {
    
  }
}
</script>

<style scoped lang="stylus">
.clearfix::after 
 content ''
 display block 
 clear both
.search 
  width 100%
  height 100%
  .header
    position fixed
    left 0
    top 0
    background #fff
    width 100%
    height 6.4rem
    border-bottom 1px solid #eeeeee
    .header-content
      display flex
      justify-content center
      align-items center
      position absolute
      left 50%
      top 50%
      transform translate(-50%, -50%)
      width 90%
      height 4.2rem
      background #f5f5f5
      border-radius .8rem
      img 
        width 1.8rem
        margin-right 1rem
      span 
        font-size: 1.6rem;
        color: #9c9c9c;
  .search-main 
    width 100%
    height 100%
    display flex
    box-sizing border-box
    padding-top 6.4rem
    .search-main-left 
      width 25%
      height 100%
      overflow hidden
      ul
        display flex
        flex-direction column
        li 
          height 5.2rem
          text-align center
          line-height 5.2rem
          width 100%
          background: #f4f4f4
          a
            color #58595B
            font-size 1.6rem
            text-decoration none
            font-family '微软雅黑'
          &.current 
            background #fff
            a 
              color #E02E24
              border-left 3px solid #e02e24
              padding 0 3rem
    .search-main-right
      width 75%
      height 100%
      padding 1.3rem
      box-sizing border-box
      overflow hidden
      .list 
        .search-main-header 
          display flex
          justify-content space-between
          align-items center
          height 4.4rem
          span  
            font-size 1.4rem
            color #999
        ul 
          display flex
          flex-wrap wrap
          li
            display flex
            flex-direction column
            justify-content center
            align-items center
            width 33.3%
            font-family: "Microsoft Yahei";
            color #666
            font-size 1.3rem
            margin-bottom 1.3rem
            img 
              width 90%

.searchPanel 
  width 100%
  height 100%
  .searchPanel-header 
  
    display flex
    justify-content space-around
    align-items center;
    width 100%
    height 5.5rem
    border-bottom 1px solid #eee
    .header-left 
      display flex
      justify-content center
      align-items center
      width 32.6rem
      height 75%
      border-radius .8rem
      background #ededed
      
      span  
        display inline-block
        background url("./images/搜索.png") no-repeat center center
        background-size 2.5rem 2.5rem
        width 2.5rem
        height 2.5rem
      input 
        width 26rem
        height 55%
        outline none 
        border none 
        background #ededed
        font-size 1.6rem
        margin-left 1rem
    .header-right 
      button 
        font-size 1.8rem
        background transparent
        border none 
        outline none
        color: #9c9c9c;
  .searchPanel-hot 
    box-sizing border-box
    padding 0 1.5rem
    .hot-header 
      margin-top 2.5rem
      img 
        width 2rem
        vertical-align middle
        margin-right 1.2rem
      span 
        font-size: 1.5rem;
        color: #9c9c9c;
        vertical-align middle
    .hot-content  
      padding 0 1.5rem
      box-sizing border-box 
      li  
        margin-right 1rem
        margin-top 1.3rem
        float left
        padding .8rem 1rem 
        background-color: #f4f4f4;
        color: #58595b;
        font-size 1.4rem
        font-family '微软雅黑'
        border-radius 1.6rem
</style>
