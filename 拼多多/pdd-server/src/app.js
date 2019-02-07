import express from 'express';
import path from 'path'
// 引入路由
import indexRouter from './../router/index'
import captchaRouter from './../router/captcha'
import userRouter from './../router/user'

import bodyParser from 'body-parser'

// 引入session
import session from 'express-session'


const app = express();

// 服务器端解决跨域
app.all("*", function(req, res, next) {
  if (!req.get("Origin")) return next();
  // use "*" here to accept any origin
  res.set("Access-Control-Allow-Origin","http://localhost:8080");
  res.set("Access-Control-Allow-Methods", "GET");
  res.set("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
  res.set("Access-Control-Allow-Credentials", true);
  // res.set('Access-Control-Allow-Max-Age', 3600);
  if ("OPTIONS" === req.method) return res.sendStatus(200);
  next();
});

app.use(express.static(path.join(__dirname, '../public')));

// 设置session
app.use(session({
  secret: '123456',
  cookie: {maxAge: 1000*60*60*24},
  resave: false,
  saveUninitialized: true
}));

// 处理请求头的body数据
app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

// 请求一些goods数据
app.use(indexRouter);

// 获取验证码
app.use(captchaRouter);

// 登陆注册等功能
app.use(userRouter);

app.listen(1688,()=>{
  console.log('服务器运行成功');
  
});
