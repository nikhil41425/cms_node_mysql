const mysql = require('mysql')

const connection = mysql.createConnection({
    port:process.env.DB_PORT,
    user:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    host:process.env.DB_HOST,
    database:process.env.DB_NAME
})

connection.connect((err)=>{
    if(err){
        throw err
    }
    console.log(`Connected to DB`);
})

module.exports = connection

