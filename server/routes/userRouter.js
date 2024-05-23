const express=require("express")
const userController=require("../controller/userController")
const verifyJwt=require("../middleware/verifyJwt")
const router=express.Router()
const User=require("../models/User")
router.get('/',verifyJwt,userController.getAllUsers)

router.post('/',userController.createNewUser)

router.post('/manager',verifyJwt,userController.createNewManager)

router.get('/:id',verifyJwt,userController.getUserById)

router.put('/',userController.updateUser)

// router.put('/active',verifyJwt,userController.updateUserActive)

router.delete('/:id',verifyJwt,userController.deleteUser)

module.exports=router


