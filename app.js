require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()


const db = require('./db')
const userRoute = require('./routes/user.route')

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())


app.use("/api/v1/user",userRoute)

const PORT = process.env.PORT

app.listen(PORT,()=>{
    console.log( `Server Listening to port : ${PORT}`)
})