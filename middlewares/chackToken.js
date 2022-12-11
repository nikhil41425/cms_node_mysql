

module.exports = {
    checkToken : async(req,res,next)=>{
        if(res.locals.role == 'user'){
             return res.status(401).json({status:false,message:"Only Admin can access this"})
        }else{
            next()
        }
    }
}