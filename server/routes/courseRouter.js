const express=require("express")
const courseController=require("../controller/CourseController")
const router=express.Router()
const Course=require("../models/Course")
router.get('/',courseController.getAllCourses)
router.get('/getActiveCourses',courseController.getActiveCourses)
router.get('/kategories/:id',courseController.getCoursesByKategory)

router.post('/',courseController.createNewCourse)

router.get('/:id',courseController.getCourseById)

router.get('/:id/orders',courseController.getOrdersOfCourse)

router.put('/',courseController.updateCourse)

router.delete('/:id',courseController.deleteCourse)
module.exports=router


