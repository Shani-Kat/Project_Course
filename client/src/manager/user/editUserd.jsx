
import React from "react";
import AddManager from "./addManeger";
import UsersList from "./userList";




const EditUsers = () => {

  
  return (<>
      <br/><br/>
    <AddManager/>
    <br/><br/>
    <div className="card flex justify-content-center">
    <UsersList/>
    </div>
</>
  )
}
export default EditUsers
