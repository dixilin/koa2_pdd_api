const cartRouter = require('koa-router')()
const {
  addCart,
  getCart,
  deleteCart
} = require('../models/cart')

cartRouter.post('/api/addCart', async (ctx) => {
  ctx.body = await addCart(ctx.request.body)
})

cartRouter.get('/api/getCart', async (ctx) => {
  ctx.body = await getCart(ctx.query.user_phone)
})

cartRouter.post('/api/deleteCart', async (ctx) => {
  const {
    user_phone,
    goods_id
  } = ctx.request.body
  ctx.body = await deleteCart(user_phone, goods_id)
})

module.exports = cartRouter