const Kategory=require("../models/Kategory");
const Course=require("../models/Course")
const getAllKategorys=async (req,res)=>{
    const kategorys=await Kategory.find().lean();
    // if(!kategorys?.length){
    //     return res.status(400).json({message:"There are no kategorys"})
    // }
    res.json(kategorys)
}

const createNewKategory=async (req,res)=>{
    if(req.user.status!="manager"){
        return res.status(400).json({ message:"אין הרשאה" })
    }
    const {type}=req.body;
    if(!type){
        return res.status(400).json({message:"יש להזין קטגוריה"})
    }
    
    const kategory=await Kategory.create({type})
    if(kategory){
        return res.status(202).json(kategory)
    }
        return res.status(400).json({message:"invalid kategory"})
}
const getKategoryById =async (req,res)=>{
    const {_id}=req.params
    const kategory=await Kategory.findById(_id).exec()
    if(!kategory){
        return res.status(400).json({message:"no such kategory"})
    }
    res.json(kategory)
}

const updateKategory =async (req,res)=>{
    if(req.user.status!="manager"){
        return res.status(400).json({ message:"אין הרשאה" })
    }

    const {_id,type}=req.body;
     //התקבלו שדות החובה
     if(!_id || !type){
        return res.status(400).json({message:"יש להזין id"})
    }





    const kategory=await Kategory.findById({_id}).exec()
    if(!kategory){
        return res.status(400).json({message:"kategory not found"})
    }
    kategory.type=type

    const updateKategory=await kategory.save()
    res.json({message:"kategorys detailds changed"})
}
const deleteKategory=async(req,res)=>{
    if(req.user.status!="manager"){
        return res.status(400).json({ message:"אין הרשאה" })
    }
    const {_id}=req.body;
    
    const kategory=await Kategory.findById({_id}).exec()
    if(!kategory){
       return res.status(400).json({message:"no such kategory"})
    }
    const courses=await Course.find({kategory:_id}).lean()
    if (courses.length>0){
        return res.status(400).json({message:"ישנם קורסים מקטגוריה זאת, יש למחוק תחילה את הקורסים"})
    }
    const kategoryRes=await kategory.deleteOne()
    res.json({message:"kategory delited"})
}

module.exports={getAllKategorys,createNewKategory,getKategoryById,updateKategory,deleteKategory}