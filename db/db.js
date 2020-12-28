const mysql = require('mysql');
const options = require('../config/config').db
const conn = mysql.createConnection(options);

conn.connect(err => {
  if (err) {
    throw err;
  }
  console.log('数据库连接成功');
});

const sqlQuery = (sql, values) => {
  return new Promise((resolve, reject) => {
    conn.query(sql, values, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    })
  })
}

module.exports = sqlQuery;