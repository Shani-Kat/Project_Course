const Lecturer=require("../models/Lecturer");
const Course=require("../models/Course")
const getAllLecturers=async (req,res)=>{
    const lecturers=await Lecturer.find().lean();
    // if(!lecturers?.length){
    //     return res.status(400).json({message:"There are no lecturers"})
    // }
    res.json(lecturers)
}

const createNewLecturer=async (req,res)=>{
    if(req.user.status!="manager"){
        return res.status(400).json({ message:"אין הרשאה" })
    }
    const {name,email,phone}=req.body;
    if(!name){
        return res.status(400).json({message:"יש להזין את שם המרצה"})
    }
    
    const lecturer=await Lecturer.create({name,email,phone})
    if(lecturer){
        return res.status(202).json(lecturer)
    }
        return res.status(400).json({message:"invalid lecturer"})
}
const getLecturerById =async (req,res)=>{
    const {_id}=req.params
    const lecturer=await Lecturer.findById(_id).exec()
    if(!lecturer){
        return res.status(400).json({message:"no such lecturer"})
    }
    res.json(lecturer)
}

const updateLecturer =async (req,res)=>{
    if(req.user.status!="manager"){
        return res.status(400).json({ message:"אין הרשאה" })
    }

    const {_id,name,email,phone}=req.body;
     //התקבלו שדות החובה
     if(!_id || !name){
        return res.status(400).json({message:"יש להזין את כל שדות החובה"})
    }




    const lecturer=await Lecturer.findById({_id}).exec()
    if(!lecturer){
        return res.status(400).json({message:"lecturer not found"})
    }
    lecturer.name=name
    lecturer.phone=phone
    lecturer.email=email
    const updateLecturer=await lecturer.save()
    res.json({message:"lecturers detailds changed"})
}
const updateActiveLecturer =async (req,res)=>{

    const {_id}=req.body;
     //התקבלו שדות החובה
     if(!_id ){
        return res.status(400).json({message:"יש להזין את כל שדות החובה"})
    }
    const lecturer=await Lecturer.findById({_id}).exec()
    if(!lecturer){
        return res.status(400).json({message:"lecturer not found"})
    }
    lecturer.active=!lecturer.active
    const updateLecturer=await lecturer.save()
    res.json({message:"lecturers detailds changed"})
}
const deleteLecturer=async(req,res)=>{
    if(req.user.status!="manager"){
        return res.status(400).json({ message:"אין הרשאה" })
    }
    const {_id}=req.body;

    const lecturer=await Lecturer.findById({_id}).exec()
    if(!lecturer){
       return res.status(400).json({message:"no such lecturer"})
    }
    const courses=await Course.find({lecturer:_id}).lean()
    if (courses.length>0){
        return res.status(400).json({message:"ישנם קורסים מקטגוריה זאת, יש למחוק תחילה את הקורסים"})
    }
    const lecturerRes=await lecturer.deleteOne()
    res.json({message:"lecturer delited"})
}

module.exports={getAllLecturers,createNewLecturer,getLecturerById,updateLecturer,deleteLecturer,updateActiveLecturer}