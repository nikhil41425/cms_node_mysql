let pool = require("../db")

module.exports = {
    getDetails : async(callback)=>{
        let categoryCount;
        let productCount;
        let billCount;
        let query = `select count(id) as categoryCount from category`;
        pool.query(query,(err,result)=>{
            if(err){
                callback(err)
            }else{
                categoryCount = result[0].categoryCount;
                let query = `select count(id) as productCount from product`
                pool.query(query,(err,result)=>{
                    if(err){
                        callback(err)
                    }else{
                        productCount = result[0].productCount
                        let query = `select count(id) as billCount from bill`;
                        pool.query(query,(err,result)=>{
                            if(err){
                                callback(err)
                            }else{
                                billCount = result[0].billCount
                                let data = {
                                    category : categoryCount,
                                    product : productCount,
                                    bill : billCount
                                }
                                callback(null,data)
                            }
                        })
                    }
                })
            }
        })
    }
}
