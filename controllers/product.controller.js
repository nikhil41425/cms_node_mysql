const {addProduct,getProduct,getProductByCategoryId,getProductById,updateProduct,updateProductStatus,deleteProduct} = require('../models/product.model')

module.exports = {
    addProduct : async(req,res)=>{
        let body = req.body
        addProduct(body,(err,result)=>{
            if(!err){
                return res.status(200).json({success:true,message:"Product added successfully"})
            }else{
                return res.status(400).json({success:false,message:err})
            }
        })
    },
    getProduct : async(req,res)=>{
        getProduct((err,result)=>{
            if(!err){
                return res.status(200).json({success:true,data:result})
            }else{
                return res.status(400).json({success:false,message:err})
            }
        })
    },
    getProductByCategoryId : async(req,res)=>{
        let id = req.params.id
        getProductByCategoryId(id,(err,result)=>{
            if(!err){
                return res.status(200).json({success:true,message:result})
            }else{
                return res.status(400).json({success:false,message:err})
            }
        })
    },
    getProductById : async(req,res)=>{
        let id = req.params.id
        getProductById(id,(err,result)=>{
            if(!err){
                return res.status(200).json({success:true,message:result})
            }else{
                return res.status(400).json({success:false,message:err})
            }
        })
    },
    updateProduct : async(req,res)=>{
        let body = req.body
        updateProduct(body,(err,result)=>{
            if(!err){
                return res.status(200).json({success:true,message:"Product updated successfully"})
            }else{
                return res.status(400).json({success:false,message:err})
            }
        })
    },
    updateProductStatus : async(req,res)=>{
        let body = req.body
        updateProductStatus(body,(err,result)=>{
            if(!err){
                return res.status(200).json({success:true,message:"Product status updated successfully"})
            }else{
                return res.status(400).json({success:false,message:err})
            }
        })
    },
    deleteProduct : async(req,res)=>{
        let body = req.body
        deleteProduct(body,(err,result)=>{
            if(!err){
                return res.status(200).json({success:true,message:"Product deleted successfully"})
            }else{
                return res.status(400).json({success:false,message:err})
            }
        })
    }
}