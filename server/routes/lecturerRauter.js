const express=require("express")
const lecturerController=require("../controller/LecturerController")
const router=express.Router()
const Course=require("../models/Lecturer")
router.get('/',lecturerController.getAllLecturers)

router.post('/',lecturerController.createNewLecturer)

router.get('/:id',lecturerController.getLecturerById)

router.put('/',lecturerController.updateLecturer)

router.put('/active',lecturerController.updateActiveLecturer)

router.delete('/:id',lecturerController.deleteLecturer)

module.exports=router


