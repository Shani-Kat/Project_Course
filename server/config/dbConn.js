const mongoose=require("mongoose")
const connectToDB=async()=>{
    try{
    await mongoose.connect(process.env.DATABACE_URI)
}
catch(err){
    console.error("***************cannot connecting to db***************\n" + err)
}
}
module.exports=connectToDB