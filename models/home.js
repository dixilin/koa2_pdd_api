const sqlQuery = require('../db/db')

module.exports = {
  async homeNav() {
    let sqlStr = `SELECT * FROM home_nav`
    const result = await sqlQuery(sqlStr)
    if (result && result.length) {
      return {
        success_code: 200,
        data: result
      }
    }
  },
  async homeShopList() {
    let sqlStr = `SELECT * FROM home_shop_list`
    const result = await sqlQuery(sqlStr)
    if (result && result.length) {
      result.forEach((item) => {
        if (item.bubble) {
          item.bubble = JSON.parse(item.bubble)
        }
      })
      return {
        success_code: 200,
        data: result
      }
    }
  },
  async homecasual() {
    let sqlStr = `SELECT * FROM home_casual`
    const result = await sqlQuery(sqlStr)
    if (result && result.length) {
      return {
        success_code: 200,
        data: result
      }
    }
  }
}