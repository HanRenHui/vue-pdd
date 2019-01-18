import {
  TAB_DATA,
  CAROU_IMG,
  HotNav,
  GOODLSIT,
  RECLIST,
  REWRITE,
  AUTOLOGIN,
  EDIT
} from './mutation-type';


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
    state.ReqList = data.data;
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
  }
}