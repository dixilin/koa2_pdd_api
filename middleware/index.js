const bodyParser = require('koa-bodyparser')
const path = require('path')
const static = require('koa-static')
// const cors = require('koa2-cors')
const ip = require('ip')
const catchError = require('./mi-error') // 引入请求错误中间件

const koaJwt = require('koa-jwt');
const SECRET = require('../config/config').tokenConfig.secretKey //密钥，不能丢

// const miLog = require('./mi-log')//日志

module.exports = (app) => {
  app.use(catchError)
  
  app.use(koaJwt({
    secret: SECRET
  }).unless({
    path: [/^((?!\/api))/,/!^\/api\//,/^\/api\/login/, /^\/api\/getCaptcha/, /^\/api\/register\//, /^\/api\/home/, /^\/api\/categoryList/] //无需验证的接口
  }))
  // app.use(cors())

  // app.use(miLog({
  //   env: app.env,  // koa 提供的环境变量
  //   projectName: 'koa2-practice',
  //   appLogLevel: 'debug',
  //   dir: 'logs',
  //   serverIp: ip.address()
  // }))

  // 指定 public目录为静态资源目录，用来存放 js css /koa2/images 等
  app.use(static(path.resolve(__dirname, "../public")))
  app.use(bodyParser())
}