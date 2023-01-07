const {generateReport,getBills,deleteBill} = require('../models/bill.model')
const ejs = require('ejs')
const uuid = require('uuid')
const path = require('path')
const fs = require('fs')
const pdf = require('html-pdf')

module.exports = {
    generateReport : async(req,res)=>{
        let body = req.body
        body.createdBy = res.locals.email
        console.log(res.locals.email);
        body.uuid = uuid.v1()
        let productDetails = JSON.parse(body.productDetails)
       

        generateReport(body,(err,result)=>{
           if(!err){
              ejs.renderFile(path.join(__dirname,'','../report.ejs'),{
                productDetails:productDetails,
                name:body.name,
                email:body.email,
                contactNumber:body.contactNumber,
                paymentMethod:body.paymentMethod,
                totalAmount:body.totalAmount
              },(err,result)=>{
                if(err){
                    console.log(err);
                    return res.status(500).json({success:false,message:err})
                }else{
                    pdf.create(result).toFile('./generated_pdf/'+body.uuid+".pdf",(err,result)=>{
                        if(err){
                            return res.status(500).json({success:false,message:err})
                        }else{
                            return res.status(200).json({success:true,uuid:body.uuid})
                        }
                    })
                }
              })
           }else{
            return res.status(500).json({success:false,message:err})
           }
        })
    },

    getPdf : async(req,res)=>{
        const orderDetails = req.body;
        const pdfPath = './generated_pdf/'+orderDetails.uuid+'.pdf'
        console.log({pdfPath});
        if(fs.existsSync(pdfPath)){
            res.contentType("application/pdf");
            fs.createReadStream(pdfPath).pipe(res)
        }else{

            let productDetails = JSON.parse(orderDetails.productDetails)

            ejs.renderFile(path.join(__dirname,'','../report.ejs'),{
                productDetails:productDetails,
                name:orderDetails.name,
                email:orderDetails.email,
                contactNumber:orderDetails.contactNumber,
                paymentMethod:orderDetails.paymentMethod,
                totalAmount:orderDetails.totalAmount
              },(err,result)=>{
                if(err){
                    console.log(err);
                    return res.status(500).json({success:false,message:err})
                }else{
                    pdf.create(result).toFile('./generated_pdf/'+orderDetails.uuid+".pdf",(err,result)=>{
                        if(err){
                            return res.status(500).json({success:false,message:err})
                        }else{
                            res.contentType("application/pdf");
                            fs.createReadStream(pdfPath).pipe(res)
                        }
                    })
                }
              })
        }
    },
    getBills : async(req,res)=>{
        getBills((err,result)=>{
            if(!err){
                return res.status(200).json({success:true,data:result})
            }else{
                return res.status(500).json({success:false,err:err})
            }
        })
    },
    deleteBill : async(req,res)=>{
        let id = req.params.id;
        deleteBill(id,(err,result)=>{
            if(!err){
                if(result.affectedRows == 0){
                    return res.status(200).json({success:true,message:"Bill id not found"})
                }else{
                    return res.status(200).json({success:true,message:"Bill deleted successfully"})
                }
            }else{
                return res.status(500).json({success:false,err:err})
            }
        })
    }
}