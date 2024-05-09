
import { useForm } from "react-hook-form"
import React, { useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from "primereact/inputtext";
import { useGetKategoriesQuery } from "../kategory/kategoryApiSlice";
import { useGetLecturersQuery } from "../lecturer/lecturerApiSlice";
import { InputTextarea } from "primereact/inputtextarea";
import { useAddCourseMutation } from "../../simpleUser/courses/courseApiSlice";
import SimpleLoading from "../../common/simpleLoading";


        
const AddCourse = () => {

  const [visible, setVisible] = useState(false);
  const { register, handleSubmit, reset } = useForm()
  const [addCourse, { data, isError, error, isSuccess, isLoading }] = useAddCourseMutation()
  const { data: kategories, isError: isKError, error: kError, isSuccess: isKSuccess, isLoading: isKLoading } = useGetKategoriesQuery()
  const { data: lecturers, isError: isLError, error: lError, isSuccess: isLSuccess, isLoading: isLLoading } = useGetLecturersQuery()
  const onSubmit = (data) => {
    addCourse(data)
    reset()
    setVisible(false)
  }
  if (isLoading) return (<SimpleLoading />)
  if (isLLoading) return (<SimpleLoading />)
  if (isKLoading) return (<SimpleLoading />)
  if (isError) return <h2>{error}</h2>
  if (isKError) return <h2>{kError}</h2>
  if (isLError) return <h2>{lError}</h2>
  return (

    <div className="card flex justify-content-center">
      <br /><br />
      <Button label="הוסף קורס" onClick={() => setVisible(true)} />
      <Dialog header="הוספת קורס" visible={visible} style={{ minwidth: '15vw',dir:"rtl" }} onHide={() => setVisible(false)} dir='rtl'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputText placeholder="שם קורס" required  {...register("title", { required: true, maxLength: 50 })} />
          <br /><br />
          <InputTextarea placeholder="תקציר הקורס" {...register("summary", {  maxLength:6000 })} autoResize rows={5} cols={30} />
          <br /><br />
          <InputText  type="number" defaultValue={50} placeholder="מחיר" required  {...register("cost", { required: true, maxLength: 50 })} /><br /><br />

          <InputText type="date" placeholder="מועד השיעור" required  {...register("date", { required: true, maxLength: 50 })} /><br /><br />
          <InputText type="date" placeholder="תאריך אחרון להרשמה" required  {...register("lastDateToRegist", { required: true, maxLength: 50 })} /><br /><br />
          <InputText type="time" placeholder="שעת התחלת השיעור" required  {...register("startHour", { required: true, maxLength: 50 })} /><br /><br />
          
          <select
            className="custom-select"
            id="selectmethod"
            defaultValue=""
            name="exampleRequired"
            {...register("kategory", { required: true })}
          >
             <option value="" disabled>בחר קטגוריה</option>
            {
              kategories.map((kategory) => {
                return<option value={kategory._id}>{kategory.type}</option>
              })
            }
          </select>
<br/><br/>
          <select
            className="custom-select"
            id="selectmethod"
            defaultValue=""
            name="exampleRequired"
            {...register("lecturer", { required: true })}
          >
             <option value="" disabled>בחר מרצה</option>
            {
              lecturers.map((lecturer) => {
                return<option value={lecturer._id}>{lecturer.name}</option>
              })
            }
          </select>

          <br/><br/>
          <div className="flex flex-wrap gap-3">

            <div className="flex align-items-center">
              <div>
                <input type="radio" value="male" {...register("sex", { required: true })} />
                זכר
              </div>
            </div>
            <div className="flex align-items-center">
              <div>
                <input type="radio" value="female" {...register("sex", { required: true })} />
                נקבה
              </div>
            </div>

          </div>
          <br />
          <div className="flex flex-wrap gap-3">

            <div className="flex align-items-center">
              <div>
                <input type="radio" value="merried" {...register("familyStatus", { required: true })} />
                נשוי
              </div>
            </div>
            <div className="flex align-items-center">
              <div>
                <input type="radio" value="unmerried" {...register("familyStatus", { required: true })} />
                רווק
              </div>
            </div>

          </div>
          <br /><br />
          <Button label="אישור" type="submit" />
        </form>
      </Dialog>
    </div>

  )
}
export default AddCourse
