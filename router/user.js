const userRouter = require('koa-router')()
const {
  login,
  checkUserNameExist,
  checkPhoneExist,
  getVerifyCode,
  register,
  uploadAvatar,
  updateBaseInfo
} = require('../models/user')
const svgCaptcha = require('svg-captcha')
const path = require('path')

const multer = require('@koa/multer')
//上传文件存放路径、及文件命名
const storage = multer.diskStorage({
  destination(_req, _file, cb) {
    cb(null, path.join(__dirname,'../public/uploads/avatar/'))
  },
  filename(_req, file, cb) {
    cb(null, `${file.originalname}`)
  }
})
const limits = {
  fields: 10, //非文件字段的数量
  fileSize: 500 * 1024, //文件大小 单位 b
  files: 1 //文件数量
}

const upload = multer({
  storage,
  limits
})

let captchaText = ''
userRouter.get('/api/getCaptcha', async (ctx) => {
  const captcha = svgCaptcha.create({
    noise: 3,
    color: true,
  });
  captchaText = captcha.text.toLowerCase()
  ctx.type = 'svg'
  ctx.body = captcha.data
});

userRouter.post('/api/login', async (ctx) => {
  const params = ctx.request.body
  ctx.body = await login(params, captchaText)
})

userRouter.get('/api/register/checkUserNameExist/:user', async (ctx) => {
  ctx.body = await checkUserNameExist(ctx.params.user)
})

userRouter.get('/api/register/checkPhoneExist/:phone', async (ctx) => {
  ctx.body = await checkPhoneExist(ctx.params.phone)
})
userRouter.get('/api/register/getVerifyCode/:phone', async (ctx) => {
  ctx.body = await getVerifyCode(ctx.params.phone)
})

userRouter.post('/api/register/register', async (ctx) => {
  const params = ctx.request.body
  ctx.body = await register(params)
})

userRouter.post('/api/uploadAvatar', upload.single('avatar_url'), async (ctx) => {
  ctx.body = await uploadAvatar(ctx.file, ctx.query.phone)
})

userRouter.post('/api/updateBaseInfo', async (ctx) => {
  ctx.body = await updateBaseInfo(ctx.request.body)
})

module.exports = userRouter