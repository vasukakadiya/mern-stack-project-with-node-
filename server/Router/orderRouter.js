require('dotenv').config()
const express=require('express')
const mongoose=require('mongoose')
const users=require("../Model/users")
const jwt=require('jsonwebtoken')
const authentication=require("../middleware/authToken")
const multer=require('multer')
const products=require('../Model/products')
const pcat=require('../Model/pcat')
const psubcat=require('../Model/psubcat')
const carts=require('../Model/addtocart')
const order=require('../Model/orderDb')
const razorpay=require('razorpay')
const crypto = require('crypto');


const orderRouter=express.Router()

const razorpayObj=new razorpay({
    key_id:process.env.RZP_KEY,
    key_secret:process.env.RZP_SECRET,
})

orderRouter.get("/img",async (req,res)=>{
    const data=await products.find()
    res.send(data)
})




orderRouter.post("/cart",authentication,async (req,res)=>{
    console.log(req.body)
    let productAvailable=await carts.findOne({pid:req.body.pid,userid:req.user.userId})
    if(productAvailable)
        {
            console.log(productAvailable)
            let data=await carts.updateOne({pid:req.body.pid},{$set:{quantity:req.body.quantity+productAvailable.quantity}})
            console.log(data)
            res.send({st:"okk"})
           
           
            
        }
        else{
            let data=new carts({
                userid:req.user.userId,
                pid:req.body.pid,
                quantity:req.body.quantity
            })
            console.log(data)
            data =await data.save();
                res.send({st:"okk"})
            
        }
    })


orderRouter.get("/cartdata",authentication,async (req,res)=>{
    let data=await carts.find({userid:req.user.userId}).populate({path:"userid"}).populate({path:"pid",populate: {
        path: 'pro_subcat'
      }})
      console.log(data)

      let address=await users.find({_id:req.user.userId})
    res.send({data,address})
})

orderRouter.post("/qty",async (req,res)=>{
    let data=await carts.updateOne({_id:req.body.id},{$set:{quantity:req.body.quantity}})
    console.log(data)
    res.send(data)
})


orderRouter.post("/order",authentication,async (req,res)=>{
  

    const amount=req.body.amount

    const option={
        amount:amount*100,
        currency:'INR',
        receipt:"res_"+new mongoose.Types.ObjectId
    }
    console.log(option)
    

    try {
        const rzpOrder=await razorpayObj.orders.create(option)
     
    
        res.send(rzpOrder)
    } catch (error) {
        console.log(error)
    }


    
})

orderRouter.post('/verify-order',authentication,async(req,res)=>{
    console.log(req.body)
    const crypto = require('crypto');
    const hash = crypto.createHmac('sha256', process.env.RZP_SECRET)
        .update(req.body.orderid + "|" + req.body.paymentid)
        .digest('hex');

    if (hash === req.body.signature) {
        let newOrder = new order({
            userid: req.user.userId,
            product:req.body.product,
            amount: req.body.amount,
            status: "completed",
            orderid: req.body.orderid,
            paymentid:req.body.paymentid,
            ostatus:"pending",
            address:req.body.address,
            city:req.body.city,
            state:req.body.state,
            zip:req.body.zip,
            odate:req.body.odate

        });

        try{
            newOrder=await newOrder.save()
            res.send({success:true})
        }
        catch(err)
        {
            console.log(err)
            res.send({sucess:true})
        }
    }
    

})

orderRouter.get("/orderdata",authentication,async (req,res)=>{
    let data=await order.find({userid:req.user.userId}).populate('userid','_id name email contactno address').populate('product.productid','name img price').sort({odate:-1})
console.log(data)
    res.send(data)
})

orderRouter.delete("/cartdelete/:id",authentication,async (req,res)=>{
    console.log(req.params.id)
    console.log(req.user.userId)

    let data=await carts.deleteOne({userid:req.user.userId,pid:req.params.id})
console.log(data)
    res.send(data)
})

orderRouter.delete("/orderdelete/:id",authentication,async (req,res)=>{
    console.log(req.params.id)
    console.log(req.user.userId)

    let data=await order.deleteOne({userid:req.user.userId,_id:req.params.id})
console.log(data)
    res.send(data)
})

module.exports=orderRouter