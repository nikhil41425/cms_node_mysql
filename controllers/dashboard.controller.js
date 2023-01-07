const {getDetails} = require("../models/dashboard.model")

module.exports = {
    getDetails : async(req,res)=>{
 
        getDetails((err,result)=>{
            if(!err){
                return res.status(200).json({success:true,data:result})
            }else{
                return res.status(404).json({success:true,message:err})
            }
        })
    }
}
