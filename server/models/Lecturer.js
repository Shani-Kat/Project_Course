
const mongoose=require("mongoose")
const lecturerSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        lowercase:true
    },
    phone:{
        type:String
    },
    active:{
        type:Boolean,
        default:true
    }
},{
timestamps:true
})
module.exports=mongoose.model('Lecturer',lecturerSchema)