const mongoose=require('mongoose')

const psubcatSchema= new mongoose.Schema({
    subcatname:{type:String},
    pcatname:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"pcats"
    }
})

module.exports=mongoose.model("psubcats",psubcatSchema)