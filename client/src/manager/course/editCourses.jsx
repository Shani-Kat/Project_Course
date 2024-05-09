
import React from "react";

import CoursesList from "./coursesEditList";
import AddCourse from "./addCourse";



const EditCourses = () => {

  
  return (<>

      <AddCourse/>
    <div className="card flex justify-content-center">
    <CoursesList/>
    
    </div>
</>
  )
}
export default EditCourses
