require('dotenv').config()
const express=require('express')
const users=require("../Model/users")
const jwt=require('jsonwebtoken')
const authentication=require("../middleware/authToken")
const multer=require('multer')

const router=express.Router();
router.post("/signup",async(req,res)=>{

    const check=await users.findOne({email:req.body.email})

    if(check)
        {
            res.send({status:"exists"})
        }
        else{
            const data=new users(req.body)
            const result=await data.save()
            console.log(result);
            if(result)
                {
                    res.send({status:"success"})
        
                }
                else{
                    res.send({status:"error"})
        
                }
        }

   
  
    })

router.get("/user",authentication,async (req,res)=>{
    let data=await users.find({_id:req.user.userId})
   
    // console.log(data)

    res.send(data);

})

router.post("/updateuser",authentication,async (req,res)=>{
    let data=await users.updateOne({_id:req.user.userId},{$set:req.body})
   
    // console.log(data)

    res.send(data);

})
router.get("/productpage",async (req,res)=>{
    const data=await users.find({})
    // console.log(data)

    res.send(data);

})

router.post("/login",async (req,res)=>{
    const data=await users.findOne({email:req.body.uemail,password:req.body.upassword});
    if(data)
    {
        let token=jwt.sign({email:data.email,userId:data._id},process.env.JWT_SECRET_KEY,{expiresIn:"30m"});

        res.send({status:"success",token:token,exp:30});

    }
    else{
        res.send({msg:"invalid"})
    }
})
// const storage=multer.diskStorage({
//     destination:(req,file,cb)=>{
//         cb(null,'public/upload/')
//     },
//     filename:(req,file,cb)=>{
//         cb(null,file.originalname)


//     }
// })

// const upload=multer({storage:storage})

// router.post("/upload",upload.single('u_file'),async (req,res)=>{
//     console.log(req.u_file)
//     console.log(req.body.name)
    
//     if(req.file)
//     {
//         res.send({status:"uploaded",url:req.file.filename})
//     }
//     else
//     {
//         res.send({status:"file is nopot uploadde"})
//     }
// })

module.exports=router;