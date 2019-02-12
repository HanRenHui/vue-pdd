const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/pdd');

let cartSchema = new mongoose.Schema({
  user_id: String,
  goods_id: String,
  goods_name: String,  
  thumb_url: String,
  price: String, 
  buy_count: Number, 
  is_pay: Boolean
});
let cart = mongoose.model('cart', cartSchema);

export default cart;