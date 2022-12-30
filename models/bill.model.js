let pool = require("../db")

module.exports = {
    generateReport : async(data,callback)=>{
         let query = `insert into bill (name , email , uuid , contactNumber, paymentMethod , total , productDetails , createdBy) values (?,?,?,?,?,?,?,?)`

         pool.query(query,[data.name,data.email,data.uuid,data.contactNumber,data.paymentMethod,data.totalAmount,data.productDetails,data.createdBy],(err,result)=>{
            if(err){
                callback(err)
            }else{
                callback(null,result)
            }
         })
    }
}