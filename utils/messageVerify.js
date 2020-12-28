const IHuyi = require("ihuyi106");

const {
  account,
  password
} = require('../config/config').msgConfig

const {
  generateRandomCode
} = require('./common')

const sendVerifyCode = (mobile) => {
  const code = generateRandomCode()
  const content = `您的验证码是：${code}。请不要把验证码泄露给其他人。`
  const iHuyi = new IHuyi(account, password)
  return new Promise((resolve, reject) => {
    iHuyi.send(mobile, content, (err, smsId) => {
      if (err) {
        reject({
          status: 'fail',
          msg: err.message
        })
      } else {
        resolve({
          status: 'success',
          msg: "SMS sent, and smsId is " + smsId,
          code
        })
      }
    })
  })
}

module.exports = sendVerifyCode