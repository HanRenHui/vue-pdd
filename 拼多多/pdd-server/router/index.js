import express from 'express';
const router = express.Router();

// 返回tab数据
router.get('/api/tabImg', (req,res,next)=>{
  
  let data = require('./../data/imgUrl.json');
  res.json(data);
});

// 返回轮播图图片数据
router.get('/api/carouslImg', (req,res,next)=>{
  let data = require('./../data/carousel.json');
  res.json(data);
});

// 返回hotnav的数据
router.get('/api/hotnav',(req,res,next)=>{
  let data = require('./../data/hotnav.json');
  res.json(data);
});

// 返回首页goodlist
router.get('/api/homegoods',(req,res,next)=> {
  let data = require('./../data/HomeShopList.json');
  res.json(data);
});

// 返回搜索页数据
router.get('/api/searchList', (req, res, next)=> {
  let data = require('./../data/search.json');
  res.json(data);
});

export default router;