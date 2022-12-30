require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()


const db = require('./db')
const userRoute = require('./routes/user.route')
const category = require('./routes/category.route')
const product = require('./routes/product.route')
const bill = require('./routes/bill.route')

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())


app.use("/api/v1/user",userRoute)
app.use("/api/v1/category",category)
app.use("/api/v1/product",product)
app.use("/api/v1/bill",bill)

const PORT = process.env.PORT

app.listen(PORT,()=>{
    console.log( `Server Listening to port : ${PORT}`)
})