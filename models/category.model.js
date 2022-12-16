let pool = require("../db")

module.exports = {
    addCategory : async(data,callback)=>{
          let query = `insert into category (name) values(?)`
          pool.query(query,[data.name],(err,result)=>{
            if(err){
                callback(err)
            }else{
                callback(null,result)
            }
          })
    },
    getCategory : (callback)=>{
        let query = `select * from category order by name`
        pool.query(query,[],(err,result)=>{
            if(err){
                callback(err)
            }else{
                callback(null,result)
            }
        })
    },
    updateCategory : (data,callback)=>{
        let query = `update category set name = ? where id = ?`
        pool.query(query,[data.name,data.id],(err,result)=>{
            if(err){
                callback(err)
            }else{
                callback(null,result)
            }
        })
    }
}