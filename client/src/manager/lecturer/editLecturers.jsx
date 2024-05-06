
import React from "react";
import AddLecturer from "./addLecturer";
import LecturersList from "./lecturersList";



const EditLecturers = () => {

  
  return (<>
      <br/>
    <AddLecturer/>
     <br/>
    <div className="card flex justify-content-center">
<LecturersList/>
    </div>
</>
  )
}
export default EditLecturers
