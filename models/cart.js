const sqlQuery = require('../db/db')
const moment = require('moment')
module.exports = {
  async getCart(user_phone) {
    if(!user_phone){
      return {
        status: 'fail',
        msg: '查询购物车列表失败'
      }
    }
    let sql = `SELECT cart.goods_id,goods_name,count,normal_price,thumb_url FROM cart LEFT JOIN goods_info ON cart.goods_id=goods_info.goods_id WHERE cart.user_phone='${user_phone}'`
    const res = await sqlQuery(sql)
    return {
      status:'success',
      data:res
    }
  },
  async addCart(params) {
    const {
      user_phone,
      goods_id,
      count
    } = params
    let sqlStr = `SELECT * FROM cart WHERE user_phone='${user_phone}' AND goods_id='${goods_id}'`
    const res = await sqlQuery(sqlStr)
    if (!res.length) {
      const str1 = `INSERT INTO cart (user_phone,goods_id,create_date,count) VALUE (?,?,?,?)`
      const data = [user_phone,goods_id,moment().format('YYYY-MM-DD'),1]
      await sqlQuery(str1,data)
    } else if (res.length === 1) {
      const str2 = `UPDATE cart SET count=count+${count},update_date='${moment().format('YYYY-MM-DD')}' WHERE goods_id='${goods_id}'`
      await sqlQuery(str2)
    }
    return {
      status: 'success',
      msg: '添加购物车成功'
    }
  },

  async deleteCart(user_phone, goods_id){
    const returnData = {
      status: 'fail',
      msg: '删除失败'
    }
    if(!user_phone){
      return returnData
    }
    let sql = `DELETE FROM cart WHERE goods_id='${goods_id}'`
    const res = await sqlQuery(sql)
    if(res){
      return {
        status: 'success',
        msg: '删除成功'
      }
    }else{
      return returnData
    }
  }
}