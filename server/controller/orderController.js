const Order = require("../models/Order")
const Course = require("../models/Course")
const Lecturer = require("../models/Lecturer")
const Kategory = require("../models/Kategory")
const getActiveOrders = async (req, res) => {
    const orders = await Order.find();
    res.json(orders)
}




const getUserOrders = async (req, res) => {
    const orders = await Order.find({userId:req.user._id}).populate("userId").populate({
        path: 'courseId',
        populate: [{ path: 'lecturer' },{path:'kategory'}]
      });
    res.json(orders)
}

const createOrder = async (req, res) => {
    const { payment_status, courseId } = req.body;
    if (!courseId) {
        return res.status(400).json({ message: "לא הוכנסו כל שדות החובה" })
    }

    const checkCourse = await Course.findOne({ _id: courseId }).lean()
    if (!checkCourse) {
        return res.status(400).json({ message: "undefined courseId" })
    }
    const order = await Order.create({ payment_status, userId: req.user._id, courseId })
    if (!order) {
        return res.status(400).json({ message: "לא הצלחתי ליצור את ההזמנה" })
    }
    res.json(order)
}

const deleteOrder = async (req, res) => {
    const { _id } = req.params;
    if(!_id){
        return res.status(404).json({ message: "not found" })
    }
    const order = await Order.findById({ _id }).exec()
    if (!order) {
        return res.status(400).json({ message: "no such order" })
    }
    const orderRes = await order.deleteOne()
    res.json({ message: "order delited" })
}




module.exports = { getActiveOrders, createOrder, deleteOrder,getUserOrders }