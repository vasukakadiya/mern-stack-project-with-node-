const mongoose= require('mongoose')

const pcatSchema=new mongoose.Schema({
    catname:{
        name:String
    }
})

module.exports=mongoose.model("pcats",pcatSchema)