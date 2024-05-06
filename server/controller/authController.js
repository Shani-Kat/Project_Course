const User=require("../models/User")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const login=async(req,res)=>{
    const {email,password}=req.body
    if(!email || !password){
        return res.status(400).json({message:"email or password is missing"})
    }
    const user= await User.findOne({email}).lean()
    if(!user || !user.active){
        return res.status(400).json({message:"Unauthorized1"})
    }
    const match = await bcrypt.compare(password,user.password)
    if(!match){
        return res.status(401).json({message:"Unauthorized"})
    }

    const userInfo= {_id:user._id,phone:user.phone, firstName:user.firstName,lastName:user.lastName,email:user.email,active:user.active,status:user.status,sex:user.sex,familyStatus:user.familyStatus}
    const accesJwt= jwt.sign(userInfo,process.env.TOKEN_PASSWORD) 

    
    res.json({accesJwt:accesJwt})
}
const register=async(req,res)=>{
    const { password, email, phone, community, sex, familyStatus, userId, lastName, firstName } =req.body
    if (!email || !password || !community || !sex || !familyStatus || !userId || !lastName || !firstName || !phone) {
        return res.status(400).json({ message: "לא הוכנסו כל שדות החובה" })
    }
    const checkEmail = await User.find({ email: email }).lean()
    if (checkEmail.length > 0) {
        return res.status(400).json({ message: "הכנס אימייל אחר" })
    }

    const hashedpwd= await bcrypt.hash(password,10)
    const newUser={ password:hashedpwd, email, phone, community, sex, familyStatus, userId, lastName, firstName }
    const user=await User.create(newUser)
    if(user){
        return res.status(201).json(user)
    }
    return res.status(400).json(" can't create new user")


}

module.exports= {login,register}


