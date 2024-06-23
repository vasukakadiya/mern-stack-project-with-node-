const mongoose=require('mongoose')



const productScheme= new mongoose.Schema({
    name:{
        type:String

    },
    img:{
        type:String
    },
    pro_cat:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"pcats"
    },
    pro_subcat:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"psubcats"
    },
    price:{
        type:Number
    },
    description:{
        type:String
    },
    company:{
        type:String

    },
    indicator:{
        type:Array
    },
    sideeffect:{
        type:Array
    }
        
})

module.exports=mongoose.model("products",productScheme)