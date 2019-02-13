
import express from 'express'
import cart from '../moudels/cartMoudle'

let router = express.Router({});

// 


// 添加购物车
router.post('/api/addCart', (req, res) => {
  let { 
    userId, 
    goods_id, 
    goods_name,
    thumb_url, 
    price
   } = req.body;

   // 看购物车里有没有，有的话count加一， 没有的话再添加
   cart.findOne({user_id: userId, goods_id}, (err, doc) => {
      if(!doc) {
        // is_pay: false,
        cart.create({user_id: userId, goods_id, goods_name, thumb_url, price,  is_pay: false, checked: false, buy_count: 1, }, (err, doc)=> {
          return res.json({
            status: 200,
            message: '加入购物车成功'
          });
        });
      
      } else {
        
        
        cart.updateOne({user_id: userId, goods_id}, {$inc: {"buy_count": 1}}, (err, rawResponse) => {
          if(err) console.error(err);
          return res.json({
            status: 304,
            message: '数量更新成功'
          });
        });
      }
     
   });
  
 
  
})

// 获取购物车数量
router.get('/api/cartcount', (req, res) => {
  let user_id = req.query.userId;
  
  cart.count({user_id: user_id}, (err, count) => {
    res.json({
      status: 200,
      count
    });
  });
 
});


// 获取购物车数据
router.get('/api/cartdata', (req, res) => {
  let user_id = req.query.userId;
  cart.find({user_id}, (err, doc)=> {
    if(err) throw new Error;
    res.json({
      status: 200,
      data: doc
    });
  })
}) 

// 根据id删除某一购物车数据
router.get('/api/delcart', (req, res) => {
  let {goods_id, user_id} = req.query;
  cart.deleteOne({goods_id, user_id}, (err)=> {
    if (err) throw new Error(err);
    res.json({
      status: 200,
      message: '删除成功'
    });
  });
  
})
// 更新商品数量
router.get('/api/setcount', (req, res) => {
  
  let {goods_id, user_id, flag} = req.query;
  let change = flag ? 1 : -1;
  console.log(`flag=${flag}`, `change=${change}`);
  
  cart.update({goods_id, user_id}, {$inc: {buy_count: change}}, err => {
    if(err) throw new Error(err);
  });
  if(!flag){
    cart.find({goods_id, user_id}, (err, count)=>{
      // 如果count为零， 则删除
      if(count <= 0) {
        cart.deleteOne({goods_id, user_id});
      }
    })
  }
  res.end();
})

export default router;