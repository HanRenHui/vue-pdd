import express from 'express';
import svgCaptcha from 'svg-captcha'

const router = express.Router();

router.get('/api/getCaptcha',(req,res,next)=>{
  
  // 生成随即验证码
  let captcha = svgCaptcha.create({
    size: 4,
    ignoreChars: '0o1i',
    noise: 5,
    color: true
  });

  // 保存验证码到session
  
  req.session.captcha = captcha.text.toLowerCase();
  // console.log(req.session);
  
	// 将验证码返回给客户端
	res.type('svg');
  res.status(200).send(captcha.data);
});

export default router;