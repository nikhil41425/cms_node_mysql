const {addCategory,getCategory,updateCategory} = require("../models/category.model")

module.exports = {
    
    addCategory : async(req,res)=>{
        try {
            let body = req.body;
            addCategory(body,(err,result)=>{
                if(!err){
                    return res.status(200).json({success:true,message:"Category added successfully"})
                }else{
                    if(err.sqlMessage){
                        return res.status(404).json({success:false,message:err.sqlMessage})
                    }else{
                        return res.status(404).json({success:false,message:err})
                    }
                    
                }
            })
        } catch (error) {
            console.log({error});
            return res.status(404).json({success:false,message:error})
        }
    },
    getCategory : (req,res)=>{
        try {
            getCategory((err,result)=>{
                if(!err){
                    return res.status(200).json({success:true,data:result})
                }else{
                    return res.status(404).json({success:true,message:err})
                }
            })
        } catch (error) {
            return res.status(404).json({success:true,message:error})
        }
    },
    updateCategory : (req,res)=>{
        try {
            let product = req.body
            updateCategory(product,(err,result)=>{
                if(!err){
                    if(result.affectedRows == 0){
                        return res.status(200).json({success:true,message:"Id not found"})
                    }else{
                        return res.status(200).json({success:true,message:"Category updated successfully"})
                    }
                    
                }else{
                    return res.status(404).json({success:true,message:err})
                }
            })
        } catch (error) {
            return res.status(404).json({success:true,message:error})
        }
    }
}