const sqlQuery = require('../db/db')
const moment = require('moment')
const {
  encrypt,
  decrypt
} = require("../utils/crypt"); //加密

const getToken = require('../utils/token')

const sendVerifyCode = require('../utils/messageVerify')

let verifyCode
module.exports = {
  async login(params, captchaText) {
    const {
      login_name,
      password,
      captcha
    } = params
    let sqlStr = `SELECT * FROM user WHERE user_name='${login_name}' OR phone='${login_name}'`
    const result = await sqlQuery(sqlStr);
    let responseData = {
      status: 'fail',
      msg: '账号或密码不正确'
    }
    if (!result || !result.length) {
      return responseData
    }
    const user_info = JSON.parse(JSON.stringify(result))[0]
    // 密码解密不正确
    if (!decrypt(password, user_info.password)) {
      return responseData
    }
    if (!captcha || captcha !== captchaText) {
      responseData.msg = '验证码不正确'
      return responseData
    }
    const token = getToken({
      user_name: user_info.user_name,
      id: user_info.id
    })
    return {
      user_name: user_info.user_name,
      nick_name: user_info.nick_name,
      phone: user_info.phone,
      avatar_url: user_info.avatar_url,
      gender: user_info.gender,
      signature: user_info.signature,
      birth: user_info.birth ? user_info.birth.slice(0, 10) : null,
      area: user_info.area,
      token,
      status: 'success',
      msg: '登录成功'
    }
  },
  async checkUserNameExist(userName) {
    let sqlStr = `SELECT * FROM user WHERE user_name = '${userName}'`
    const result = await sqlQuery(sqlStr);
    let data = {};
    if (result) {
      data.success_code = 200
      if (!result.length) {
        data.message = 'ok'
      } else {
        data.message = 'no'
      }
    }
    return data
  },

  async checkPhoneExist(phone) {
    let sqlStr = `SELECT * FROM user WHERE phone = '${phone}'`
    const result = await sqlQuery(sqlStr);
    let data = {};
    if (result) {
      data.success_code = 200
      if (!result.length) {
        data.message = 'ok'
      } else {
        data.message = 'no'
      }
    }
    return data
  },
  async getVerifyCode(phone) {
    try {
      const res = await sendVerifyCode(phone)
      verifyCode = res.code
      return res
    } catch (err) {
      return err
    }
  },
  async register(params) {
    const {
      user_name,
      phone,
      code
    } =
      params
    let sqlStr1 = `SELECT * FROM user WHERE phone = '${phone}' OR user_name = '${user_name}'`
    const res1 = await sqlQuery(sqlStr1);
    if (res1.length) {
      return {
        status: 'fail',
        msg: '当前用户已存在'
      }
    }
    if (verifyCode !== code) {
      return {
        status: 'fail',
        msg: '验证码不正确'
      }
    }
    try {
      const encryptPwd = encrypt(params.password)
      let sqlStr2 = `INSERT INTO user (user_name,password,phone,create_date) VALUE ('${user_name}','${encryptPwd}','${phone}','${moment().format('YYYY-MM-DD')}')`
      await sqlQuery(sqlStr2);
      return {
        status: 'success',
        msg: '注册成功'
      }
    } catch (e) {
      return {
        status: 'fail',
        msg: '注册失败'
      }
    }
  },

  async uploadAvatar(file, phone) {
    if (!file || !phone) {
      return {
        status: 'fail',
        msg: '上传失败'
      }
    }
    let sqlStr = `UPDATE user set avatar_Url='/uploads/avatar/${file.originalname}' WHERE phone='${phone}'`
    const res = await sqlQuery(sqlStr);
    if (JSON.parse(JSON.stringify(res)).affectedRows) {
      return {
        status: 'success',
        msg: '上传成功',
        url: `/uploads/avatar/${file.originalname}`
      }
    }
  },

  async updateBaseInfo(params) {
    const {
      phone
    } = params
    if (!phone) {
      return {
        status: 'fail',
        msg: '修改失败'
      }
    }
    delete params.phone
    let str = ``
    for (let k in params) {
      if (k === 'area') {
        str = `${str}${k}='${JSON.stringify(params[k])}',`
      } else {
        str = `${str}${k}='${params[k]}',`
      }
    }
    str = str.slice(0, -1)
    let sqlStr = `UPDATE user SET ${str} WHERE phone='${phone}'`
    await sqlQuery(sqlStr);
    return {
      status: 'success',
      msg: '修改成功'
    }
  }
}