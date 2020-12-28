const homeRouter = require('koa-router')()
const {
  homeNav,
  homeShopList,
  homecasual
} = require('../models/home')

homeRouter.get('/api/homeNav', async (ctx, next) => {
  ctx.body = await homeNav()
})

homeRouter.get('/api/homeShopList', async (ctx, next) => {
  ctx.body = await homeShopList()
})

homeRouter.get('/api/homecasual', async (ctx, next) => {
  ctx.body = await homecasual()
})


module.exports = homeRouter