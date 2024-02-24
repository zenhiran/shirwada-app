const mysql = require('mysql');

const config = require('../config/config.json');

const pool = mysql.createPool({
  host: config.host,
  user: config.user,
  database: config.database,
  password: config.password,
});


// pool.connect((err)=>{
//   if(err) throw err;
//   else console.log("DB IS CONNECTED!");
// })

module.exports = pool;


// let sql = 'INSERT INTO users (NAME,PASSWORD,EMAIL,TITLE) VALUES ("nm", "password", "hey@gmail.com","man")';
// conn.query(sql ,(err) =>{
//   if(err) throw err;
//   else console.log("Execute!");
// });


//module.exports = conn.createQuery('INSERT INTO users (NAME,PASSWORD,EMAIL,TITLE) VALUES (?, ?, ?)',
//["nm", "user.password", "hey@gmail.com","man"]);
