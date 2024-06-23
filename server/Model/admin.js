const mongoose=require('mongoose')

const adminschema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    contactno:{
        type:Number,
        require:true
    }

});

module.exports=mongoose.model("admins",adminschema);