import express from 'express'
import user from '../moudels/userMoudel'


let tempUser = {};

const sms_util = require('./../util/sms_util');

const router = express.Router();

// 账号密码登陆方式
router.post('/api/login/login_code', (req, res)=>{
  // 验证码不正确
  if(req.body.captcha == 'undefined' || req.body.captcha !== req.session.captcha){
    return res.json({
      error_code: 0,
      message: '验证码验证失败'
    });
  }
  // 从session中删除验证码
  delete req.session.cpatcha;
  
  user.findOne({name: req.body.name}, (error, doc)=>{
    console.log(doc.password);
    
    // 如果已经注册过
    if(doc){
      if(req.body.password !== doc.password){
      //   // 密码错误
        res.json({
          err_code: 1,
          message: '密码输入错误'
        });
      }else {
        req.session.userId = doc._id;
        
        res.json({
          status: 200,
          message: '登陆成功',
          _id: doc._id,
          name: doc.name || '',
          phone: doc.phone || ''
        });
      }
    }else {
      
      // 如果没注册过
      user.create(
        {name: req.body.name, password: req.body.password}
      );
      req.session.userId = doc._id;
      res.json({
        status: 200,
        message: '首次登陆，成功注册',
        _id: doc._id,
        name: doc.name || '',
        phone: doc.phone || ''
      });

    }
  });
  

});

// 获取手机验证码
router.get('/api/phone_code', (req, res)=>{
  // 获取手机号
  
  let phone = req.query.phone;

  // 获取随机验证码
  let random_code = sms_util.randomCode(6);

  // 发送随机验证码到手机
  // sms_util.sendCode(phone, random_code, success => {
  //   if(success){
  //     tempUser[phone] = random_code;
  //     res.json({
  //       status: 200,
  //       message: '验证码已发送'
  //     });
  //   }else {
  //     res.json({
  //       err_code: 2,
  //       message: '短信验证码发送失败'
  //     });
  //   }
  // });

  // 模拟短信发送, 还不是因为没钱
  setTimeout(()=>{
    tempUser[phone] = random_code;
    
    res.json({
      status: 200,
      message: '验证码已发送',
      random_code
    });
  },2000);
});
 
// 手机号码登陆
router.post('/api/login/phone', (req, res) => {
  let phone = req.body.phone;
  let code = req.body.code;

  // 判断验证码是不是正确
  if(code !== tempUser[phone]){
    
    return res.json({
      err_code: 3,
      message: '手机验证码错误'
    });
  }
  // 该验证码用过一次就不能用了
  delete tempUser[phone];

  user.findOne({phone: req.body.phone}, (err, doc)=> {
    if(doc){
      req.session.userId = doc._id;
      res.json({
        _id: doc._id,
        status: 200,
        message: '登陆成功',
        phone: req.body.phone,
        name: doc.name || ''
      });
    }else {
      console.log(-1);
      
      user.create({
        phone: req.body.phone,
      }, (err,doc)=>{
      req.session.userId = doc._id;
        res.json({
          status: 200,
          message: '首次手机登录，注册成功',
          phone: req.body.phone,
          name: doc.nama || '',
          _id: doc._id
        });
      });
      
    }
  });
});

// 判断用户最近是否已经登陆
router.get('/api/islogin', (req, res) => {
  let id = req.session.userId;
  user.findOne({_id: id}, (err, doc)=>{
    if(doc){
      // 如果查到，说明最近有登陆
      res.json({
        _id: doc._id,
        name: doc.name,
        phone: doc.phone
      });
    }else {
      delete req.session.userId;
    }
  });
});

// 退出登录
router.get('/api/edit_login', (req, res)=> {
  // 删除session里保存的id
  delete req.session.userId;
  res.json({
    status: 200,
    message: '退出成功'
  });
});
export default router;