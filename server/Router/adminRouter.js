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
const admin=require('../Model/admin')

const razorpay=require('razorpay')
const crypto = require('crypto');
const adminRouter=express.Router()

const storages=multer.diskStorage({
    destination:(req,file,cb)=>{
            cb(null,'public/upload/')
    },
    filename:(req,file,cb)=>{
            cb(null,file.originalname)
    }
})

const uploadp=multer({storage:storages})



adminRouter.post("/addproduct",uploadp.single('pimg'),async (req,res)=>{
    


    const  indicator = req.body.indicator.split(',').map(item => item.trim()).filter(item => item.length > 0);
    const  sideeffect = req.body.sideeffect.split(',').map(item => item.trim()).filter(item => item.length > 0);

  

    const data=new products({
        name:req.body.name,
        img:req.file.filename,
        pro_cat:req.body.pro_cat,
        pro_subcat:req.body.pro_subcat,
        price:req.body.price,
        description:req.body.description,
        company:req.body.company,
        indicator:indicator,
        sideeffect:sideeffect
    })

     const result=await data.save()

     console.log(result)

    if(req.file)
    {
        res.send({status:"true"})
    }else
    {
        res.send({status:"failk"})

    }
})


adminRouter.get("/userdata",authentication,async (req,res)=>{
    let data=await users.find().select('_id name email address city age zip contactno gender ')
    res.send(data)
})

adminRouter.get("/productdata",authentication,async (req,res)=>{
    let data=await products.find()
    res.send(data)

    
})

adminRouter.get("/dashboarddata",async (req,res)=>{
    let totalProduct=await products.countDocuments({name:{$ne:null}})
    let totalUsers=await users.countDocuments({email:{$ne:null}})
    let totalCat=await psubcat.countDocuments({subcatname:{$ne:null}})
    let totalOrder=await order.countDocuments({orderid:{$ne:null}})
    let totalPending=await order.countDocuments({ostatus:{$ne:'completed'}})

     let totalCom=await order.countDocuments({ostatus:'completed'})





    console.log({totalComp:totalCom})
    res.send({totalProduct:totalProduct,totalUsers:totalUsers,totalCat:totalCat,totalOrder:totalOrder,totalPending:totalPending,totalCom:totalCom})
})

adminRouter.post("/updateproduct",uploadp.single('pimg'),async (req,res)=>{
    console.log(req.body)
    console.log(req.body.ck)
  

    const  indicator = req.body.indicator.split(',').map(item => item.trim()).filter(item => item.length > 0);
    const  sideeffect = req.body.sideeffect.split(',').map(item => item.trim()).filter(item => item.length > 0);


   


  


    if(req.file)
    {
        let update=await products.updateOne({_id:req.body.id},{ $set:{
            name:req.body.name,
             img:req.file.filename,
            pro_cat:req.body.pro_cat,
            pro_subcat:req.body.pro_subcat,
            price:req.body.price,
            description:req.body.description,
            company:req.body.company,
            indicator:indicator,
            sideeffect:sideeffect
        }})

     console.log(update)
        res.send({status:"true"})
    }else
    {
        let update=await products.updateOne({_id:req.body.id},{ $set:{
            name:req.body.name,
            //  img:req.file.filename,
            pro_cat:req.body.pro_cat,
            pro_subcat:req.body.pro_subcat,
            price:req.body.price,
            description:req.body.description,
            company:req.body.company,
            indicator:indicator,
            sideeffect:sideeffect
        }})

     console.log(update)

        res.send({status:"failk",update})

    }

  
})
adminRouter.delete("/deleteproduct/:id",authentication,async (req,res)=>{


    let data=await products.deleteOne({_id:req.params.id})
console.log(data)
    res.send(data)
})

adminRouter.post("/updatestatus",async (req,res)=>{

    console.log(req.body)
    let data=await order.updateOne({_id:req.body.orderid},{$set:{ostatus:req.body.status}})
    res.json(data)
    console.log(data)
})

adminRouter.get("/verifyuser",authentication,(req,res)=>{
    res.send({st:"okk"})
})

adminRouter.post("/login/admin",async (req,res)=>{
    const data=await admin.findOne({email:req.body.aemail,password:req.body.apassword});
    if(data)
    {
        let token=jwt.sign({email:data.email,adminId:data._id},process.env.JWT_SECRET_KEY,{expiresIn:"30m"});

        res.send({status:"success",adtoken:token,exp:30});

    }
    else{
        res.send({msg:"invalid"})
    }
})

adminRouter.get("/api/cat",authentication,async (req,res)=>{
    const data= await pcat.find();

    res.send(data)
})

adminRouter.get("/api/medicine-category",authentication,async (req,res)=>{
    const cat=await pcat.findOne({catname:"Medicine"})
    const data=await psubcat.find({pcatname:cat._id})
    res.send(data)
})

adminRouter.get("/api/wellness-category",authentication,async (req,res)=>{
    const cat=await pcat.findOne({catname:"Wellness"})
    const data=await psubcat.find({pcatname:cat._id})
    res.send(data)
})

adminRouter.get("/api/orderdata",async (req,res)=>{
    let data=await order.find().populate('userid','_id name email contactno address').populate('product.productid','name img price').sort({odate:-1})
console.log(data)
    res.send(data)
})

adminRouter.get("/api/personal-category",async (req,res)=>{
    const cat=await pcat.findOne({catname:"Personal-care"})
    const data=await psubcat.find({pcatname:cat._id})
    res.send(data)
})

adminRouter.post('/addcategory',authentication,async (req,res)=>{
    console.log(req.body)
    let data=new psubcat({subcatname:req.body.subcategory,pcatname:req.body.cat})

    data =await data.save()
    console.log(data)
    res.send(data)
})

adminRouter.get('/deletecat/:id',async (req,res)=>{

    let data  =await psubcat.deleteOne({_id:req.params.id})

   res.send(data)
    console.log(data)
})

adminRouter.post('/editsubcat',async (req,res)=>{
    let data=await psubcat.updateOne({_id:req.body.id},{$set:{subcatname:req.body.subcat}})
    console.log(data)
    res.send(data)
})

module.exports=adminRouter

