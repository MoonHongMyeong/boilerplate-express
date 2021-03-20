const { User } = require('../models/User');
//인증처리
let Auth = (req, res, next) => {
  //클라이언트의 쿠키에서 토큰을 가져온다.
  let token = req.cookies.x_auth;
  //토큰을 복호화 한 후 유저를 찾는다.
  User.findByToken(token, (error, user) => {
    if (error) throw error;
    //유저가 있으면 인증 완료
    //유저가 없으면 인증 불가
    if (!user) return res.json({ isAuth: false, error: true });

    req.token = token;
    req.user = user;
    next();
  })

}

module.exports = { Auth }