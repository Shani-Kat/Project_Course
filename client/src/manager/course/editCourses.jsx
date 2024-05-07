
import React from "react";

import CoursesList from "./coursesEditList";
import AddCourse from "./addCourse";



const EditCourses = () => {

  
  return (<>
      <br/>      <br/>

      <AddCourse/>
      <br/> <br/>
    <div className="card flex justify-content-center">
    <CoursesList/>
    
    </div>
</>
  )
}
export default EditCourses
