const jwt = require('jsonwebtoken');

const tokenConfig = require('../config/config').tokenConfig //密钥，不能丢

/*
 *params:  user_info[用户信息]  setExpires [传入过期时间]
 */
module.exports = (user_info,setExpires) => { //创建token并导出
  const token = jwt.sign(user_info, tokenConfig.secretKey, {
    expiresIn: setExpires ? setExpires : tokenConfig.expiresIn
  });
  return token;
};