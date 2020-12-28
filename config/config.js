module.exports = {
  env: 'dev',
  db: {
    host: '127.0.0.1', //数据库地址
    port: 3306,
    user: 'root', //账号
    password: '123456', //密码
    database: 'practice_pdd', //库名
    charset: 'utf8',
    multipleStatements: true //允许执行多条语句
  },
  msgConfig: {
    account: 'C93796936',
    password: '4481255519b34cedc8af0846206581c7'
  },
  tokenConfig: {
    secretKey: 'lin', //token密钥
    expiresIn: '4h' //有效时间
  }
}
