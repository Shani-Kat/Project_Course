import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { DataView, DataViewLayoutOptions } from "primereact/dataview";
import { classNames } from "primereact/utils";
import { useGetCourseByKategoriesQuery, useGetCoursesQuery } from "./courseApiSlice";
import Laoding from "./Loading";
import { useAddOrderMutation } from "../orders/ordersApiSlise";
import { useLocation, useNavigate } from 'react-router-dom'
import { Card } from "primereact/card";
import { Accordion, AccordionTab } from "primereact/accordion";
export default function CourseList() {
  const location = useLocation()
  const navigate=useNavigate()
  const {data: courses, isLoading, isError, error} = useGetCourseByKategoriesQuery(location.state.id)

  // const { data: courses, isLoading, isError, error } = useGetCoursesQuery();
  const [layout, setLayout] = useState("grid");
  const [addOrder, { isError1, isSuccess, error1 }] = useAddOrderMutation();

  if (isLoading) return <Laoding />;
  if (isError) return <h2>{error}</h2>;
  if (isError1) return <h2>{error1}</h2>;
 


  const listItem = (course, index) => {
   
    return (
      <div className="col-12" key={course.id} 
     >
      
        <div
          className={classNames(
            "flex flex-column xl:flex-row xl:align-items-start p-4 gap-4",
            { "border-top-1 surface-border": index !== 0 }
          )}
        >
          <img
            className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round"
            src={`http://localhost:1133/logoV.png`}
            alt={course.title}
          />
          <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
            <div className="flex flex-column align-items-center sm:align-items-start gap-3">
              <div className="text-2xl font-bold text-900">{course.title}  </div>
              <div className="text-2xl font-bold text-900">{new Date(course.date).getDate()+"-"+(new Date(course.date).getMonth()+1)+"-"+new Date(course.date).getFullYear()}  </div>

              <div className="text-2xl font-bold text-900">
                {course.lecturer.name}
              </div>{" "}
              <div className="flex align-items-center gap-3">
                <span className="flex align-items-center gap-2">
                  <i className="pi pi-tag"></i>
                  <span className="font-semibold">{course.kategory.type}</span>
   
                </span>
              </div>
            </div>
            <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
              <span className="text-2xl font-semibold">${course.cost}</span>
              <Button
                icon="pi pi-shopping-cart"
                className="p-button-rounded"
                disabled={course.inventoryStatus === "OUTOFSTOCK"}
                onClick={() => {
                  addOrder({ courseId: course._id });
                }}
              ></Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const gridItem = (course) => {
    return (
      <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2" key={course.id}>
        <div className="p-4 border-1 surface-border surface-card border-round">
          <div className="flex flex-wrap align-items-center justify-content-between gap-2">
          
            <div className="flex align-items-center gap-2">
              <i className="pi pi-tag"></i>
              <span className="font-semibold">{course.kategory.type}</span>
            </div>
          </div>
          <div className="flex flex-column align-items-center gap-3 py-5">
            {/* <img
              className="w-9 shadow-2 border-round"
              src={`http://localhost:1133/logoV.png`}
              alt={course.title}
            /> */}
            <div className="text-2xl font-bold">נושא הקורס: {course.title}</div>
            <div className="text-2xl font-bold text-900">תאריך הקורס: {new Date(course.date).getDate()+"-"+(new Date(course.date).getMonth()+1)+"-"+new Date(course.date).getFullYear()}  </div>

            <div className="text-2xl font-bold">מרצה הקורס: {course.lecturer.name}</div>
          </div>
          <div className="flex align-items-center justify-content-between">
            <span className="text-2xl font-semibold">מחיר: ${course.cost}</span>
            <Button
              icon="pi pi-shopping-cart"
              className="p-button-rounded"
              disabled={course.inventoryStatus === "OUTOFSTOCK"}
              onClick={() => {
                addOrder({ courseId: course._id });
              }}
            ></Button>
  
          </div>
          <Accordion>
            <AccordionTab header="פרטים נוספים על הקורס">
                <div >
                    {/* Display product details here such as name, price, description */}
                    
                    <p>נושא הקורס:  {course.title}</p>
                    <p>מרצה הקורס:  {course.lecturer.name}</p>
                    <p>קטגורית הקורס:  {course.kategory.type}</p>
                    <p>תקציר הקורס:  {course.summary}</p>
                    <p>תאריך הקורס:  {new Date(course.date).getDate()+"-"+(new Date(course.date).getMonth()+1)+"-"+new Date(course.date).getFullYear()}</p>
                    <p>תקציר אחרון להרשמה:  {new Date(course.lastDateToRegist).getDate()+"-"+(new Date(course.lastDateToRegist).getMonth()+1)+"-"+new Date(course.lastDateToRegist).getFullYear()}</p>

                </div>
            </AccordionTab>
        </Accordion>
        </div>
      </div>
    );
  };

  const itemTemplate = (course, layout, index) => {
    if (!course) {
      return;
    }

    if (layout === "list") return listItem(course, index);
    else if (layout === "grid") return gridItem(course);
  };

  const listTemplate = (courses, layout) => {
    return (
      <div className="grid grid-nogutter">
        {courses.map((course, index) => itemTemplate(course, layout, index))}
      </div>
    );
  };

  const header = () => {
    return (
      <div className="flex justify-content-end">
        <DataViewLayoutOptions
          layout={layout}
          onChange={(e) => setLayout(e.value)}
        />
      </div>
    );
  };

  return (
    <div className="card">

{courses.length?<DataView
        value={courses}
        listTemplate={listTemplate}
        layout={layout}
        header={header()}
      />:<h1>אין קורסים זמינים</h1>}
      {}
    </div>
  );
}
