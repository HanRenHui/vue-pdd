import ajax from './ajax.js';

// const BASE_URL = '/local_api';
const BASE_URL = 'http://localhost:1688';


// 请求底部tab数据
const requireTabData = ()=> ajax(BASE_URL + '/api/tabImg');

// 请求轮播图图片数据
const requireCarData = () => ajax(BASE_URL + '/api/carouslImg');

// 请求hotnav的数据
const requireHotNav = ()=> ajax(BASE_URL + '/api/hotnav');



// 请求搜索列表数据
const requireSearchList = ()=> ajax(BASE_URL + '/api/searchList');


// 请求短信验证码
const requireTextCode = (params) => ajax(BASE_URL + '/api/phone_code',params);

// 手机号方式登录请求
const phone_login = (params) => ajax(BASE_URL + '/api/login/phone', params, 'POST');

// 账号密码方式登陆
const pwd_login = (params) => ajax(BASE_URL + '/api/login/login_code', params, 'POST');

// 自动登陆
const is_login = () => ajax(BASE_URL + '/api/islogin');

// 退出登录
const edit_login = ()=> ajax(BASE_URL + '/api/edit_login');

// 修改个人信息
const req_edit_info = (params) => ajax(BASE_URL + '/api/editinfo', params, 'POST');

const PDD_URL = '/api';

// 请求推荐列表
const requireRecommend = (params, callback)=> ajax(PDD_URL + '/proxy/api/api/barrow/query', params, callback);

// 请求搜索页热门搜索列表

const requireSearchHot = ()=> ajax(PDD_URL + '/proxy/api/search_hotquery', {
  pdduid: 1846284283948,
  is_back: 1
});

// 请求gooidsList

const requireGoodsList = ()=> ajax(PDD_URL + '/proxy/api/api/alexa/v1/goods', {
  list_update_time: true,
  platform: 1,
  assist_allowed: 1,
  page: 1,
  size: 40,
  list_id: 'ie8GyC7r0M',
  antiContent: '0alAfxnUXy1809dVzdnxkDhdgTKeTtKGu-_aNX_xK4B4eUX0AwhjSjwKAcaHBob6SWXefsOs8j6QscVGyt88-_eyD-mibyLJ6SPPArQB-BuS_umbIcZ3bKQTv4bqs5ouLfAF30hMkNms7aKPEmjDATkYFKzmnw4DyuTkN9W7cxXQ-PYMPTKg8xkY654BlWpy0JSdzRMLeFL4zR19dDS0DDs4l6WPiTNS8WEoncTZyZP-QlPNYqPQCJ6fywXww_5WvaUjgQSQkJH-zeaPSpdHvPfv8B_4mjvg5pQfmNSan9AhFQAIKu6jmHi8ObVNPaiJTbiGOj5HvEBo1uUD4JtvrnMmMaapEkeWGHU5tzdzsX4zdIyqyCuUsMpzGZsDBB3PtDme83dUQ6ZNBKbW5Zomy4Flx98YB3X1oQBiSGFRNmBpXxZ_dCce_bDXrpwPubOa1OBWLWnHvhwUqQD3ByNFmL-Zbhby3LLPvdzs7-eKjOL8OQ88khKhitQ5yE',
  pdduid: '1846284283948'
});


// 请求详情页

export {
  requireTabData,
  requireCarData,
  requireHotNav,
  requireGoodsList,
  requireRecommend,
  requireSearTitle,
  requireTextCode,
  phone_login,
  pwd_login,
  is_login,
  edit_login,
  requireSearchList,
  requireSearchHot,
  req_edit_info
};