const express=require('express')
const users=require("../Model/users")
const jwt=require('jsonwebtoken')
const authentication=require("../middleware/authToken")
const multer=require('multer')
const products=require('../Model/products')
const pcat=require('../Model/pcat')
const psubcat=require('../Model/psubcat')
const carts=require('../Model/addtocart')


const productRouter=express.Router();

productRouter.get("/productdata/:id",async (req,res)=>{
    const data=await products.find({_id:req.params.id}).populate({path:'pro_subcat'})
    res.send(data)
})

productRouter.get("/medicinehome",async (req,res)=>{
    const cat=await pcat.findOne({catname:"Medicine"})
    const data=await products.find({pro_cat:cat._id})
    res.send(data)
})

productRouter.get("/medicine",async (req,res)=>{
    const cat=await pcat.findOne({catname:"Medicine"})
    const data=await products.find({pro_cat:cat._id}).populate({path:'pro_cat'}).populate({path:'pro_subcat'})
    res.send(data)
})
productRouter.get("/wellness",async (req,res)=>{
    const cat=await pcat.findOne({catname:"Wellness"})
    const data=await products.find({pro_cat:cat._id}).populate({path:'pro_cat'}).populate({path:'pro_subcat'})
    res.send(data)
})

productRouter.get("/personal-care",async (req,res)=>{
    const cat=await pcat.findOne({catname:"Personal-care"})
    const data=await products.find({pro_cat:cat._id}).populate({path:'pro_cat'}).populate({path:'pro_subcat'})
    res.send(data)
})

productRouter.get("/catdata",async (req,res)=>{
    const cat=await pcat.findOne({catname:"Medicine"})
    const data=await products.find({pro_cat:cat._id}).populate({path:'pro_cat'}).populate({path:'pro_subcat'})
    res.send(data)
})

productRouter.get("/medicine-category",async (req,res)=>{
    const cat=await pcat.findOne({catname:"Medicine"})
    const data=await psubcat.find({pcatname:cat._id})
    res.send(data)
})

productRouter.get("/wellness-category",async (req,res)=>{
    const cat=await pcat.findOne({catname:"Wellness"})
    const data=await psubcat.find({pcatname:cat._id})
    res.send(data)
})

productRouter.get("/personal-category",async (req,res)=>{
    const cat=await pcat.findOne({catname:"Personal-care"})
    const data=await psubcat.find({pcatname:cat._id})
    res.send(data)
})

productRouter.get("/cat",async (req,res)=>{
    const data= await pcat.find();

    res.send(data)
})

productRouter.get("/category",async (req,res)=>{
    const data= await psubcat.find();

    res.send(data)
})

productRouter.get("/category/:id",async (req,res)=>{
  
    
    const data= await psubcat.find({pcatname:req.params.id});

    res.send(data)
})

module.exports = productRouter
