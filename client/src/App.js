import "./App.css";
import Login from "./auth/Login";
import Home from "./common/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./auth/register";
import Logo from "./common/logo";
import LoginToEnterCourses from "./auth/LoginToEnterCourses";
import EditKategories from "./manager/kategory/editKategories";
import EditLecturers from "./manager/lecturer/editLecturers";
import EditUsers from "./manager/user/editUserd";
import SeverityDemo from "./stam/b";
import EditCourses from "./manager/course/editCourses";
import Aaa from "./stam/a";
import CourseByKategory from "./simpleUser/courses/courseByKategory";
import CourseCard from "./simpleUser/courses/courseById";
import UsersList from "./manager/user/userList";
import Basket from "./simpleUser/orders/basket";
import CoursesList from "./manager/course/coursesEditList";
import ActiveCourseList from "./simpleUser/courses/activeCoursesList";
import Dell from "./common/dell";
import CourseList from "./simpleUser/courses/coursesList";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/" element={<Logo />} />
            <Route path="/login" element={<Login />} />
            <Route path="/LoginToEnterCourses" element={<LoginToEnterCourses />} />
            <Route path="/register" element={<Register />} />
            <Route path="/editUser" element={<UsersList />} />
            <Route path="/course" element={<CoursesList />} />
            <Route path="/activeCourses" element={<CourseByKategory/>} />
            <Route path="/basket" element={<Basket />} />
            <Route path="/kategories" element={<EditKategories/>} />
            <Route path="/lecturers" element={<EditLecturers/>} />
            <Route path="/dell" element={<Dell/>} />
            <Route path="/users" element={<EditUsers/>} />
            <Route path="/mCourses" element={<EditCourses/>} />
            <Route path="/Course/:id" element={<CourseCard/>} />
            <Route path="/Aaa" element={<Aaa/>} />
            <Route path="/Course/kategory/:id" element={<CourseList/>} />

          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
