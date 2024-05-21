import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { CSVLink } from 'react-csv';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useLocation } from 'react-router-dom';
import { useGetOrdersForCourseQuery } from '../../simpleUser/courses/courseApiSlice';
import SimpleLoading from '../../common/simpleLoading';

export default function CourseOrders() {
    const location = useLocation();
    const { data: users, isUError, uError, isULoading } = useGetOrdersForCourseQuery(location.state.id);
    const title=location.state.title
    const category=location.state.category
    if (isUError) console.log(uError);
    if (isULoading) {
        return <SimpleLoading />;
    }

    if (!users) {
        return <div>No data available</div>;
    }

    const headers = [
        { label: 'טלפון', key: 'userId.phone' },
        { label: 'מייל', key: 'userId.email' },
        { label: 'שם משפחה', key: 'userId.lastName' },
        { label: 'שם פרטי', key: 'userId.firstName' }
    ];

    const dataForCSV = users.map(user => [
        user.userId.phone,
        user.userId.email,
        user.userId.lastName,
        user.userId.firstName
    ]);
    if (dataForCSV.length === 0) {
        return <div>אין נרשמים לקורס זה</div>;
    }
    return (
        <div className="card">
            <h1>משתתפי הקורס</h1>
            <DataTable value={users} scrollable showGridlines tableStyle={{ minWidth: '50rem', textAlign: 'center' }}>
                <Column field="userId.phone" header="טלפון" style={{ width: '25rem' }}></Column>
                <Column field="userId.email" header="מייל" style={{ width: '25rem' }}></Column>
                <Column field="userId.lastName" header="שם משפחה" style={{ width: '25rem' }}></Column>
                <Column field="userId.firstName" header="שם פרטי" style={{ width: '25rem' }}></Column>
            </DataTable>
            <br/>
            <br/>
            <br/>
            <Button style={{ color: 'white', textDecoration: 'none' }}>
                <CSVLink data={dataForCSV} headers={headers} filename={`${category}-${title}.csv`} style={{ color: 'white', textDecoration: 'none' }}>יצא לקובץ </CSVLink>
            </Button>
        </div>
    );
}