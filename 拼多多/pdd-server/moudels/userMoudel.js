const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/pdd');

let userSchema = new mongoose.Schema({
  name: String,
  password: String,
  phone: String,
  gender: String,
  address: String,
  birthday: String,
  recentLogTime: {
    type: Date,
    default: Date.now
  },

});

let user = mongoose.model('user', userSchema);

export default user;