const mongoose=require('mongoose')

const orderSchema=new mongoose.Schema({
    userid:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"users"
    },
    product:[
        {
            _id: false, 
            productid:{     type:mongoose.SchemaTypes.ObjectId,
                        ref:"products"
                },
            quantity:{type:Number}
        }
    ],
    amount:{
        type:Number
    },
    status:{
        type:String
    },
    orderid:{
        type:String
       
    },
    paymentid:{
        type:String
    },
    ostatus:{
        type:String
    },address:{
        type:String
    },
    city:{
        type:String
    },
    state:{
        type:String
    },zip:{
        type:Number
    },
    odate:{
        type:Date
    }
})

module.exports=mongoose.model("orders",orderSchema)