const recommendRouter = require('koa-router')()
const sqlQuery = require('../db/db')

recommendRouter.get('/api/recommendList', async (ctx) => {
  const pageSize = ctx.query.pageSize || 20
  const pageIndex = ctx.query.pageIndex || 0
  let sqlStr = `SELECT * FROM goods_info INNER JOIN goods_detail ON goods_info.goods_id=goods_detail.id LIMIT ${pageIndex},${pageSize}`
  const result = await sqlQuery(sqlStr)
  if (result) {
    result.forEach((item) => {
      if (item.tag_list) {
        item.tag_list = JSON.parse(item.tag_list)
      }
    })
    ctx.body = {
      success_code: 200,
      data: result
    }
  }
})

module.exports = recommendRouter