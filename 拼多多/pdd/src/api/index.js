import ajax from './ajax.js';

const BASE_URL = '/local_api';


// 请求底部tab数据
const requireTabData = ()=> ajax(BASE_URL + '/api/tabImg');

// 请求轮播图图片数据
const requireCarData = () => ajax(BASE_URL + '/api/carouslImg');

// 请求hotnav的数据
const requireHotNav = ()=> ajax(BASE_URL + '/api/hotnav');

// 请求gooidsList
const requireGoodsList = ()=> ajax(BASE_URL + '/api/homegoods');

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


const PDD_URL = '/api'

// 请求推荐列表
const requireRecommend = (params, callback)=> ajax(PDD_URL + '/proxy/api/api/barrow/query', params, callback);


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
  edit_login
};