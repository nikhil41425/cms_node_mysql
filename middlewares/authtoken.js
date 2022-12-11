const jwt = require('jsonwebtoken')

module.exports = {
    authToken : async(req,res,next)=>{
       let token = req.headers.token

       if(token){
        jwt.verify(token,process.env.ACCESS_TOKEN,(err,decoded)=>{
            if(err){
                return res.status(401).json({success:false,message:"Invalid Token"})
            }else{
                res.locals=decoded;
                next()
            }
        })
       }else{
        return res.status(401).json({success:false,message:"Access Denied !! Token Required"})
       }
    }
}