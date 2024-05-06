const mongoose=require("mongoose")
const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
   
    email:{
        type:String,
        lowercase:true,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    // active:{
    //     type:Boolean,
    //     default:true
    // },
    familyStatus:{
        type:String,
        enum:['merried','unmerried'],
        required:true
    },
    sex:{
        type:String,
        enum:['male','female'],
        required:true 
    },
    community:{
        type:String,
        enum:['Israel','Spain',"USA"],
        required:true 
    },
    status:{
        type:String,
        enum:['manager','simpleUser'],
        default:"simpleUser"
    },

    
},{
timestamps:true
})
module.exports=mongoose.model('User',userSchema)