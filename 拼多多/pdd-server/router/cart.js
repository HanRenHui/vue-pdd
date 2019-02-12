
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
  console.log(userId);

   let ispay= false;
   let buy_count = 1;

   // 看购物车里有没有，有的话count加一， 没有的话再添加
   cart.findOne({userId, goods_id}, (err, doc) => {
      if(!doc) {
        
        cart.create({user_id: userId, goods_id, goods_name, thumb_url, price, ispay, buy_count }, (err, doc)=> {
          console.log('加入购物车成功');
        });
      
      } else {
        
        console.log('数量更新成功');
        
        cart.update({userId, goods_id}, {$inc: {buyCount: 1}});
      }
     
   });
  
  res.json({
    status: 200,
    message: '加入购物车成功'
  });
  
})

export default router;