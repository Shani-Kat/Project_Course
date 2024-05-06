const express=require("express")
const router=express.Router()
const orderController=require("../controller/orderController")

router.get("/",orderController.getActiveOrders)
router.get("/oldDateOrders",orderController.getOldDateOrders)
router.get("/userActiveOrders",orderController.getUserActiveOrders)
router.get("/userOldDateOrders",orderController.getOldDateUserOrders)
router.post("/",orderController.createOrder)
router.delete("/",orderController.deleteOrder)
module.exports=router


