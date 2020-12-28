const koa = require('koa')
const app = new koa()
const router = require('./router')

//中间件，use
const middleware = require('./middleware')
middleware(app)

router(app)

app.listen(3333, () => {
  console.log('server is running at http://localhost:3333')
})