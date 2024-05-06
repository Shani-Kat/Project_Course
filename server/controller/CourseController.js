const Course = require("../models/Course");
const Order = require("../models/Order");
const Lecturer = require("../models/Lecturer");
const Kategory = require("../models/Kategory");
const getAllCourses = async (req, res) => {
  const courses = await Course.find()
    .populate("lecturer", { name: 1 })
    .populate("kategory", { type: 1 })
    .lean();
  res.json(courses);
};

const getActiveCourses = async (req, res) => {
  const courses = await Course.find({ date: { $gte: new Date() } })
    .populate("lecturer", { name: 1 })
    .populate("kategory", { type: 1 })
    .lean();
  res.json(courses);
};
const getCoursesByKategory = async (req, res) => {
  const {id}=req.params
  const courses = await Course.find({kategory:id})
    .populate("lecturer", { name: 1 })
    .populate("kategory", { type: 1 })
    .lean();
  res.json(courses);
};

const createNewCourse = async (req, res) => {
  if (req.user.status != "manager") {
    return res.status(400).json({ message: "אין הרשאה" })
  }
  const {
    title,
    lecturer,
    date,
    startHour,
    cost,
    kategory,
    sex,
    familyStatus,
    lastDateToRegist,summary
  } = req.body;
  if (
    !title ||
    !lecturer ||
    !cost ||
    !kategory ||
    !sex ||
    !familyStatus ||
    !lastDateToRegist
  ) {
    return res.status(400).json({ message: "לא הוכנסו כל שדות החובה" });
  }
  // Lecturerקיים
  const checkLecturer = await Lecturer.findOne({ _id: lecturer }).lean();
  if (!checkLecturer) {
    return res.status(400).json({ message: "undefined lecturer" });
  }
  ////kategory!!!!!!!!!!!!!!!!!!
  const checkKategory = await Kategory.findOne({ _id: kategory }).lean();
  if (!checkKategory) {
    return res.status(400).json({ message: "undefined kategory" });
  }

  const course = await Course.create({
    title,
    lecturer,
    date,
    startHour,
    cost,
    kategory,
    sex,
    familyStatus,
    lastDateToRegist,summary
  });
  if (course) {
    return res.status(202).json(course);
  }
  return res.status(400).json({ message: "invalid course" });
};
const getCourseById = async (req, res) => {
  const { id } = req.params;
  const course = await Course.findById(id) .populate("lecturer", { name: 1 }).populate("kategory", { type: 1 }).exec();
  if (!course) {
    return res.status(400).json({ message: "no such course" });
  }
  res.json(course);
};

const updateCourse = async (req, res) => {
  if (req.user.status != "manager") {
    return res.status(400).json({ message: "אין הרשאה" })
  }
  const {
    _id,
    title,
    lecturer,
    date,
    startHour,
    cost,
    kategory,
    sex,
    familyStatus,
    summary
  } = req.body;
  //התקבלו שדות החובה
  if (
    !_id ||
    !title ||
    !lecturer ||
    !cost ||
    !kategory ||
    !sex ||
    !familyStatus
  ) {
    return res.status(400).json({ message: "יש למלא את כל שדות החובה" });
  }

  // Lecturerקיים
  const checkLecturer = await Lecturer.findOne({ _id: lecturer }).lean();
  if (!checkLecturer) {
    return res.status(400).json({ message: "undefined lecturer" });
  }
  ////kategory!!!!!!!!!!!!!!!!!!
  const checkKategory = await Kategory.findOne({ _id: kategory }).lean();
  if (!checkKategory) {
    return res.status(400).json({ message: "undefined kategory" });
  }

  const course = await Course.findById({ _id }).exec();
  if (!course) {
    return res.status(400).json({ message: "course not found" });
  }
  course.title = title;
  course.lecturer = lecturer;
  course.date = date;
  course.startHour = startHour;
  course.cost = cost;
  course.kategory = kategory;
  course.sex = sex;
  course.familyStatus = familyStatus;  
  course.summary = summary;

  const updateCourse = await course.save();
  res.json({ message: "courses detailds changed" });
};
const deleteCourse = async (req, res) => {
  if (req.user.status != "manager") {
    return res.status(400).json({ message: "אין הרשאה" })
  }
  const { _id } = req.body;

  const course = await Course.findById({ _id }).exec();

  if (!course) {
    return res.status(400).json({ message: "no such course" });
  }

  const orders= await Order.find({courseId:course._id})
  if(orders.length>0){
    return res.status(400).json({ message: "You Can't delete this course" });
  }
  const courseRes = await course.deleteOne();
  res.json({ message: "course delited" });
};

module.exports = {
  getAllCourses,
  createNewCourse,
  getCourseById,
  updateCourse,
  deleteCourse,
  getActiveCourses,
  getCoursesByKategory
};
