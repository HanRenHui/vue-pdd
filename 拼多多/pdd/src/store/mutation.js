import {
  TAB_DATA,
  CAROU_IMG,
  HotNav,
  GOODLSIT,
  RECLIST,
  REWRITE,
  AUTOLOGIN,
  EDIT,
  CHANGECOUNT,
  DELETE,
  CHECKONE,
  ALLSELECT,
  GETSEARCHLIST,
  GETDETAIL,
  CARTCOUNT,
  ADDONE,
  GETCARTDATA
} from './mutation-type';

export default {
  [TAB_DATA](state, {data}){
    state.imgUrl = data.imgUrl;
  },

  [CAROU_IMG](state, {data}){
    state.CarouImg = data.carImgUrl;
  },

  [HotNav](state, {data}){
    // state.NavDate.item1 = data.data.item1;
    // state.NavDate.item2 = data.data.item2;
    state.NavDate = data.data;
  },

  [GOODLSIT](state, {data}){
    state.HomeGoodsList = data.goods_list;
  },

  [RECLIST](state, {data}){
    state.ReqList = state.ReqList.concat(data.data);
  },
  
  [REWRITE](state, info){
    state.User = info;
  },

  [AUTOLOGIN](state, {data}){
    
    state.User = data;
    
  },

  [EDIT](state){
    state.User = {};
  },

  [CHANGECOUNT](state, {index, flag}){
    if(flag){
      // 数量加一
      state.cartGoods[index].buy_count += 1; 
    }else{
      // 数量减一
      state.cartGoods[index].buy_count -= 1; 
      // 如果数量0==0，去掉该商品
      if(state.cartGoods[index].buy_count === 0){
        state.cartGoods.splice(index, 1);
      }
    }
  },
  
  [DELETE](state, index){

    state.cartGoods.splice(index, 1);
  },

  [CHECKONE](state, index){
    state.cartGoods[index].checked = !state.cartGoods[index].checked ;
  },

  [ALLSELECT](state, allCheckFlag){
    state.cartGoods.forEach((good, index)=>{
      good.checked = allCheckFlag;
    });
  },

  [GETSEARCHLIST](state, {data}){
    state.SearchList = data.data;
  },

  // [GETDETAIL](state, data){
  //   console.log(data);
    
  // },
  [CARTCOUNT](state, data) {
    state.cartNum = data;
  },
  [ADDONE](state) {
    state.cartNum = state.cartNum + 1;
  },

  [GETCARTDATA](state, data) {
    state.cartGoods = data;
    
  }
}