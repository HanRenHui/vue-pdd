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
  ALLSELECT
} from './mutation-type';
import { log } from 'util';


export default {
  [TAB_DATA](state, {data}){
    state.imgUrl = data.imgUrl;
  },

  [CAROU_IMG](state, {data}){
    state.CarouImg = data.carImgUrl;
  },

  [HotNav](state, {data}){
    state.NavDate.item1 = data.data.item1;
    state.NavDate.item2 = data.data.item2;
  },

  [GOODLSIT](state, {data}){
    state.HomeGoodsList = data.goods_list;
  },

  [RECLIST](state, {data}){
    state.ReqList = state.ReqList.concat(data.data);
  },
  
  [REWRITE](state, info){
    state.User._id = info._id;
    state.User.name = info.name;
    state.User.phone = info.phone;
  },
  [AUTOLOGIN](state, {data}){
    state.User._id = data._id;
    state.User.name = data.name;
    state.User.phone = data.phone;
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
  }
}