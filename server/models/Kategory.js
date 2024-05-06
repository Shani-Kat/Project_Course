const mongoose=require("mongoose")
const kategorySchema=new mongoose.Schema({
    type:{
        type:String,
        required:true
    }
},{
timestamps:true
})
module.exports=mongoose.model('Kategory',kategorySchema)