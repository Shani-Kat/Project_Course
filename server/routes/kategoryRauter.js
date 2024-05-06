const express=require("express")
const kategoryController=require("../controller/KategoryController")
const router=express.Router()
const Course=require("../models/Kategory")
router.get('/',kategoryController.getAllKategorys)

router.post('/',kategoryController.createNewKategory)

router.get('/:id',kategoryController.getKategoryById)

router.put('/',kategoryController.updateKategory)

router.delete('/',kategoryController.deleteKategory)
module.exports=router


