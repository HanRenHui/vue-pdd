import axios from 'axios';


/**
 * 对服务器发起请求
 * url: 请求地址
 * params: 数据
 * type: 请求方式
 */
export default function (url, params = {}, type = "GET"){
  let promise;
  return new Promise((resolve,reject)=>{
    if("GET" === type){
      // 处理get请求
      params = parseDate(params);
      url =  url + "?" + params;
      promise = axios.get(url);
    }else {
      // 处理post请求
      promise = axios.post(url,params);
    }

    promise.then(response => {
      resolve(response);
    });

  });
}

/**
 * 用于get请求时，格式化数据格式
 * name=hrh&age=18
 */
function parseDate(data){
  let temp = [];
  Object.keys(data).forEach(key=>{
    temp.push(`${key}=${data[key]}`);
  });
  return temp.join('&');

}