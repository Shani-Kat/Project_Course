

import React, { useState } from 'react'; 
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { useGetKategoriesQuery } from '../../manager/kategory/kategoryApiSlice';
import AddKategory from '../../manager/kategory/addKategory';
import SimpleLoading from '../../common/simpleLoading';
// import { useGetLessonByLevelQuery } from './lessonApiSlice';

export default function CourseByKategory() {
    const navigate=useNavigate()
    const {data:Kategories,isSuccess,isError,error,isLoading}=useGetKategoriesQuery()
    if(isError)return(<h1>{error}</h1>)
    if(isLoading)return(<SimpleLoading/>)

    // const header = (
    //     <img alt="Card" src="https://primefaces.org/cdn/primereact/images/usercard.png" />
    // );

    return (
        <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
            {
                Kategories.map(kategory=>{
                    return( <Card title={kategory.type}  className="md:w-25rem">

                    <Button label="רישום לקורסים"  onClick={()=>navigate(`/Course/kategory/${kategory._id}`,{state:{ id: kategory._id }})}/>
                </Card>)
                })
            }
        </div>
    )
}
        