const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const { tokenKey } = require('../config/token');

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

// 새로운 유저를 세이브 하기 전에 작동 next인자는 pre를 끝내고 save로 넘어가게 함
userSchema.pre('save', function (next) {
  const user = this;

  if (user.isModified('password')) {
    bcrypt.genSalt(saltRounds, (error, salt) => {
      if (error) return next(error);

      bcrypt.hash(user.password, salt, (error, hash) => {
        if (error) return next(error);
        user.password = hash;
        next();
      })
    })
  } else {
    next();
  }
});
//요청 된 비밀번호가 데이터베이스의 비밀번호와 일치하는지 확인
userSchema.methods.comparePassword = function (plainPassword, callBack) {
  //평문 비밀번호와 데이터베이스에 있는 암호화된 비밀번호 같은지 체크
  //평문도 암호화 해서 비교해봐야한다
  bcrypt.compare(plainPassword, this.password, (error, isMatch) => {
    if (error) return callBack(error);
    callBack(null, isMatch);
  })
}
//token 생성 tokenKey는 gitignore시킴
userSchema.methods.generateToken = function (callBack) {
  const user = this;
  //jsonwebtoken을 이용해서 token 생성하기
  const token = jwt.sign(user._id.toHexString(), tokenKey);
  user.token = token;
  user.save((error, user) => {
    if (error) return callBack(error)
    callBack(null, user)
  })
}

userSchema.statics.findByToken = function (token, callBack) {
  const user = this;
  //토큰을 decode
  jwt.verify(token, tokenKey, (error, decoded) => {
    //유저 아이디를 이용해서 유저를 찾은 후 클라이언트에서 가져온 토큰과
    //DB에 보관 된 토큰이 일치하는지 확인
    user.findOne({ "_id": decoded, "token": token }, (error, userInfo) => {
      if (error) return callBack(error);
      callBack(null, userInfo);
    })
  })
}

const User = mongoose.model('User', userSchema);

module.exports = { User }