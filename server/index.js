require('dotenv').config()
const express=require('express')
const cors=require('cors')

const jwt=require('jsonwebtoken')
const razorpay=require('razorpay')
require('./Db/connect')
const users=require('./Model/users')
const products=require('./Model/products')
const pcat=require('./Model/pcat')
const psubcat=require('./Model/psubcat')
const carts=require('./Model/addtocart')
const order=require('./Model/orderDb')
const admin=require('./Model/admin')
// const bodyparser=require('body-parser')
const app=express();

app.use(cors());
const multer=require('multer')
// const mware=multer()
const router=require('./Router/userrouter')
const productRouter=require('./Router/productRouter')
const authentication = require('./middleware/authToken')

// app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.json())


const orderRouter = require('./Router/orderRouter')
const adminRouter = require('./Router/adminRouter')




app.use(express.json())

app.use(router)
app.use(productRouter)
app.use(orderRouter)
app.use(adminRouter)


app.use(express.static('public'))




    app.listen(process.env.PORT);