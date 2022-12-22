const pool = require('../db')


module.exports = {
    addProduct : async(data,callback)=>{
         let query = `insert into product (name,categoryId,description,price,status) values(?,?,?,?,'true')`
         pool.query(query,[data.name,data.categoryId,data.description,data.price],(err,result)=>{
            if(err){
                callback(err)
            }else{
                callback(null,result)
            }
         })
    },
    getProduct : async(callback)=>{
        let query = `select p.id,p.name,p.description,p.status,c.id as categoryId , c.name as categoryName from product as p inner join category as c where p.categoryId = c.id`
        pool.query(query,[],(err,result)=>{
           if(err){
               callback(err)
           }else{
               callback(null,result)
           }
        })
   },
   getProductByCategoryId : async(id,callback)=>{
    let query = `select id,name from product where categoryId = ? and status = 'true'`
    pool.query(query,[id],(err,result)=>{
        console.log(result);
       if(err){
           callback(err)
       }else{
           callback(null,result[0])
       }
    })
  },
  getProductById : async(id,callback)=>{
    let query = `select id , name,description,status from product where id = ?`
    pool.query(query,[id],(err,result)=>{
       if(err){
           callback(err)
       }else{
           callback(null,result[0])
       }
    })
  },
  updateProduct : async(data,callback)=>{
    let query = `update product set name = ? ,categoryId = ? , description = ? , price = ? where id = ? `
    pool.query(query,[data.name,data.categoryId,data.description,data.price,data.id],(err,result)=>{
       if(err){
           callback(err)
       }else{
           callback(null,result)
       }
    })
  },
  updateProductStatus : async(data,callback)=>{
    let query = `update product set status = ? where id = ? `
    pool.query(query,[data.status,data.id],(err,result)=>{
       if(err){
           callback(err)
       }else{
           callback(null,result)
       }
    })
  },
  deleteProduct : async(data,callback)=>{
    let query = `delete from product where id = ? `
    pool.query(query,[data.id],(err,result)=>{
       if(err){
           callback(err)
       }else{
           callback(null,result)
       }
    })
  }

}