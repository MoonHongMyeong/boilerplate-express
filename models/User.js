const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    minlength: 5
  },
  role: {
    type: Number,
    default: 1,
  },
  image: String,
  token: {
    type: String,
  },
  //토큰을 사용할 수 있는 기간
  tokenExp: {
    type: Number,
  }
})

const User = mongoose.model('User', userSchema);

module.exports = { User }