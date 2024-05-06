const User = require("../models/User");
const bcrypt = require("bcrypt")
const roleEnum = ["user", "manager"]
const getAllUsers = async (req, res) => {
    if(req.user.status!="manager"){
        return res.status(400).json({ message:"אין הרשאה" })
    }
    const users = await User.find({}, { password: 0 }).lean();
    if (!users?.length) {
        return res.status(400).json({ message: "There are no users" })
    }
    res.json(users)
}

const createNewUser = async (req, res) => {
    const { password, email, phone, community, sex, familyStatus, userId, lastName, firstName } = req.body;
    if (!email || !password || !community || !sex || !familyStatus || !userId || !lastName || !firstName || !phone) {
        return res.status(400).json({ message: "לא הוכנסו כל שדות החובה" })
    }
    // יחודיemail
    const checkEmail = await User.find({ email: email }).lean()
    if (checkEmail.length > 0) {
        return res.status(400).json({ message: "the email allready exist in the db" })
    }

    
    const hashedPwd = await bcrypt.hash(password, 10)
    const user = await User.create({ password:hashedPwd, email, phone, community, sex, familyStatus, userId, lastName, firstName  })
    if (user) {
        return res.status(202).json(user)

    }
    return res.status(400).json({ message: "invalid user" })
}
const createNewManager = async (req, res) => {
    if(req.user.status!="manager"){
        return res.status(400).json({ message:"אין הרשאה" })
    }
    const { password, email, phone, community, sex, familyStatus, userId, lastName, firstName } = req.body;
    if (!email || !password || !community || !sex || !familyStatus || !userId || !lastName || !firstName || !phone) {
        return res.status(400).json({ message: "לא הוכנסו כל שדות החובה" })
    }
    // יחודיemail
    const checkEmail = await User.find({ email: email }).lean()
    if (checkEmail.length > 0) {
        return res.status(400).json({ message: "the email allready exist in the db" })
    }

    
    const hashedPwd = await bcrypt.hash(password, 10)
    const user = await User.create({ password:hashedPwd, email, phone, community, sex, familyStatus, userId, lastName, firstName ,status:"manager" })
    if (user) {
        return res.status(202).json(user)

    }
    return res.status(400).json({ message: "invalid user" })
}

const getUserById = async (req, res) => {
   const {_id}=req.params

    const user = await User.findById(_id, { password: 0 }).exec()
    
    if (!user) {
        return res.status(400).json({ message: "no such user" })
    }
    res.json(user)
}

const updateUser = async (req, res) => {

    const { _id, phone, community, sex, familyStatus, lastName, firstName ,email} = req.body;
    //התקבלו שדות החובה
    if (!_id   || !community || !sex || !familyStatus  || !lastName || !firstName || !phone ||!email) {
        return res.status(400).json({ message: "אנא מלא/י את כל שדות החובה" })
    }
    const user = await User.findById(_id, { password: 0 }).exec()
    if (!user) {
        return res.status(400).json({ message: "user not found" })
    }


    const checkEmail = await User.find({ email: email }).lean()
    const checkAllEmails = await User.find({_id:_id, email: email }).lean()
    if (checkEmail.length !=checkAllEmails.length) {
        return res.status(400).json({ message: "the email allready exist in the db" })
    }

    user.firstName = firstName
    user.phone = phone
    user.lastName = lastName
    user.familyStatus = familyStatus
    user.sex = sex
    user.email = email
    user.community = community
    const updateUser = await user.save()
    res.json({ message: "users detailds changed" })
}

const deleteUser = async (req, res) => {
    const { _id } = req.body

    const user = await User.findById({ _id }).exec()
    if (!user) {
        return res.status(400).json({ message: "no such user" })
    }
    const userRes = await user.deleteOne()
    res.json({ message: "user delited" })
}

module.exports = { getAllUsers, createNewUser, getUserById, updateUser, deleteUser ,createNewManager}