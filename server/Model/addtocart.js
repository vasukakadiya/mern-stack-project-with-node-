const mongoose =require('mongoose')

const cartSchema=new mongoose.Schema({
    userid:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"users"
    },
    pid:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"products"
    },
    quantity:{
        type:Number
    }
})

module.exports=mongoose.model("carts",cartSchema)
