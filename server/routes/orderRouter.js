const express=require("express")
const router=express.Router()
const orderController=require("../controller/orderController")

router.get("/",orderController.getActiveOrders)
router.get("/userOrders",orderController.getUserOrders)
router.post("/",orderController.createOrder)
router.delete("/:id",orderController.deleteOrder)
module.exports=router


