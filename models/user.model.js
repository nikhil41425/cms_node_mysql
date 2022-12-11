const pool = require("../db");

module.exports = {
    userRegister: async (data, callback) => {
        pool.query(
            `select * from cms.user where email = ?`,
            [data.email],
            (err, result) => {
                if (err) {
                    callback(err);
                } else if (result.length <= 0) {
                    pool.query(
                        `insert into cms.user(name,email,password,mobile,status,role) values(?,?,?,?,'false','user')`,
                        [
                            data.name,
                            data.email,
                            data.password,
                            data.mobile,
                            data.status,
                            data.role,
                        ],
                        (err, result) => {
                            if (err) {
                                callback(err);
                            }
                            callback(null, result);
                        }
                    );
                } else {
                    callback(null, result);
                }
            }
        );
    },
    userLogin: async (data, callback) => {
        let query = `select * from user where email = ?`
        pool.query(query, [data.email], (err, result) => {
            if (err) {
                callback(err)
            } else {
                callback(null, result[0])
            }
        })
    },
    forgetPassword:async(data,callback)=>{
        let query = `select * from user where email = ?`
        pool.query(query, [data.email], (err, result) => {
            if (err) {
                callback(err)
            } else {
                callback(null, result[0])
            }
        })
    },
    changePassword:async(email,data,callback)=>{
      let query = `select * from user where email = ? and password = ?`
      pool.query(query,[email,data.oldPassword],(err,result)=>{
        if(err){
           callback(err)
        }else if(result.length > 0){
            let query = `update user set password = ? where email = ?`
           pool.query(query,[data.newPassword,email],(err,result)=>{
            if(err){
                callback(err)
            }else{
                callback(null,result)
            }
           })
        }else{
            callback(null,result)
        }
      })
    },
    getUsers:async(callback)=>{
        let query = `select * from user where role = 'user';`
 
        pool.query(query,[],(err,result)=>{
         if(err){
             callback(err)
         }else{
             callback(null,result)
         }
        })
     }
};
