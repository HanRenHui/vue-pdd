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

import {
  requireTabData,
  requireCarData,
  requireHotNav,
  requireGoodsList,
  requireRecommend,
  is_login,
  edit_login,  
} from './../api/index';


export default {
  // 请求tab
  async reqTab({commit}){
    const tabDate = await requireTabData();
    if(tabDate.status === 200){
      let data = tabDate.data;
      commit(TAB_DATA, {data});
    }
  },
  // 请求轮播图图片
  async reqCarou({commit}){
    const CarouData = await requireCarData();
    
    if(CarouData.status === 200){
      let data = CarouData.data;
      commit(CAROU_IMG, {data});
    }
  },

  // 请求hotnav的数据
  async reqHotNav({commit}){
    const HotNavData = await requireHotNav();
    if(HotNavData.status === 200){
      let data = HotNavData.data;
      commit(HotNav, {data});
    }
  },
  //请求首页的goodslist
  async goodsList({commit}){
    const goods = await requireGoodsList();
    if(goods.status === 200){
      let data = goods.data;
      commit(GOODLSIT, {data});
    }
  },

  // 请求推荐列表
  async recommendList({commit}){
    const result = await requireRecommend();
    if(result.status === 200){
      let data = result.data;
      commit(RECLIST, {data});
    }
  },

  // 更新前端用户信息
  rewriteUserInfo({commit}, info){
    commit(REWRITE, info);
  },

  async checkisLogin({commit}){
    
    let result = await is_login();
    if(result.status === 200){
      let data = result.data;
      commit(AUTOLOGIN, {data});
    }
  },
  // 推出登陆
  async edit_login({commit}){
    let result = await edit_login();  
    if(result.status === 200){
      commit(EDIT);
    }
  },
  // 更新数量
  resetCount({commit}, {index, flag}){
    commit(CHANGECOUNT, {index, flag});
  },

  // 删除一件商品
  deleteGood({commit}, index){
    commit(DELETE, index);
  },

  // 更改选中状态
  check({commit}, index){
    commit(CHECKONE, index);
  },
  // 全选
  selectAll({commit}, allCheckFlag){
    commit(ALLSELECT, allCheckFlag);
  }

}