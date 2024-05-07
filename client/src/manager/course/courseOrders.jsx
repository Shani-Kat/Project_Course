import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useLocation } from 'react-router-dom';
import { useGetOrdersForCourseQuery } from '../../simpleUser/courses/courseApiSlice';
import SimpleLoading from '../../common/simpleLoading';

export default function CourseOrders() {
    const location=useLocation()
    const { data: users, isUError, uError, isULoading } = useGetOrdersForCourseQuery(location.state.id)
if(isUError) console.log(uError);
 if(isULoading){
    return(<SimpleLoading/>)
 }
 console.log(users);

    return (
        <div className="card" >
            <h1>משתתפי הקורס</h1>
            <DataTable value={users} tableStyle={{ minWidth: '50rem',direction:"rtl" }}>
                <Column field="userId.firstName" header="שם פרטי"></Column>
                <Column field="userId.lastName" header="שם משפחה"></Column>
                <Column field="userId.email" header="מייל"></Column>
            </DataTable>
        </div>
    );
}
        