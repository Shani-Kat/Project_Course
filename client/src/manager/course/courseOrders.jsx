import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useLocation } from 'react-router-dom';
import { useGetOrdersForCourseQuery } from '../../simpleUser/courses/courseApiSlice';
import SimpleLoading from '../../common/simpleLoading';

export default function CourseOrders() {
    const location = useLocation()
    const { data: users, isUError, uError, isULoading } = useGetOrdersForCourseQuery(location.state.id)
    if (isUError) console.log(uError);
    if (isULoading) {
        return (<SimpleLoading />)
    }
    console.log(users);

    return (
        <div className="card" >
            <h1>משתתפי הקורס</h1>
            
            <DataTable value={users} scrollable showGridlines tableStyle={{ minWidth: '50rem', textAlign: 'center' }}>
                <Column field="userId.phone" header="טלפון" style={{ width: '25rem' }}></Column>
                <Column field="userId.email" header="מייל" style={{ width: '25rem' }}></Column>
                <Column field="userId.lastName" header="שם משפחה" style={{ width: '25rem' }}></Column>
                <Column field="userId.firstName" header="שם פרטי" style={{ width: '25rem' }}></Column>
            </DataTable>
            {/* <DataTable  scrollable value={users} tableStyle={{ minWidth: '10rem',direction:"rtl",width:"10rem" ,textAlign:"center" }}>
                <Column field="userId.firstName" header="שם פרטי" bodyClassName="text-center" style={{ minWidth: '30rem' }}></Column>
                <Column field="userId.lastName" header="שם משפחה" bodyClassName="text-center" style={{ minWidth: '30rem' }} ></Column>
                <Column field="userId.email" header="מייל" bodyClassName="text-center" style={{ minWidth: '30rem' }} ></Column>
            </DataTable> */}
        </div>
    );
}
