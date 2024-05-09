
import React from "react";
import AddKategory from "./addKategory";
import KategoriesList from "./kategoriesList";



const EditKategories = () => {

  
  return (<>
    <AddKategory/>
    <div className="card flex justify-content-center">
    <KategoriesList/>
    </div>
</>
  )
}
export default EditKategories
