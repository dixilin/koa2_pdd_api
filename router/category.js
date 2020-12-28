const categoryRouter = require('koa-router')()
const sqlQuery = require('../db/db')

categoryRouter.get('/api/categoryList', async (ctx) => {
  let sqlStr = `SELECT * FROM category_list`
  const result = await sqlQuery(sqlStr)
  if (result && result.length) {
    result.forEach((item) => {
      if (item.items) {
        item.items = JSON.parse(item.items)
      }
    })
    ctx.body = {
      success_code: 200,
      data: result
    }
  }
})

module.exports = categoryRouter