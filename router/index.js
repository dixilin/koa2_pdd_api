const router = require('koa-router')()
const homeRouter = require('./home')
const recommendRouter = require('./recommend')
const categoryRouter = require('./category')
const userRouter = require('./user')
const cartRouter = require('./cart')


module.exports = (app) => {
  router.use(homeRouter.routes())
  router.use(recommendRouter.routes())
  router.use(categoryRouter.routes())
  router.use(userRouter.routes())
  router.use(cartRouter.routes())
  
  app.use(router.routes()).use(router.allowedMethods())
}