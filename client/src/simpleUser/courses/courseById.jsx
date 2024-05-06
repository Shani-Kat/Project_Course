
import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { useLocation } from 'react-router-dom'
import { useGetCourseByIdQuery } from './courseApiSlice';
import SimpleLoading from '../../common/simpleLoading';
export default function CourseCard() {
    const location = useLocation()
    const {data: course,isLoading} = useGetCourseByIdQuery(location.state.id)

    if (isLoading) return <SimpleLoading/>
    if (!course) return <div>Missing post!</div>
    console.log(course);
    const header = (
        <img alt="Card" src="https://primefaces.org/cdn/primereact/images/usercard.png" />
    );
    const footer = (
        <>
            <Button label="Save" icon="pi pi-check" />
            <Button label="Cancel" severity="secondary" icon="pi pi-times" style={{ marginLeft: '0.5em' }} />
        </>
    );

    return (
        <div className="card flex justify-content-center">
            <Card title="Advanced Card" subTitle="Card subtitle" footer={footer} header={header} className="md:w-30rem">
            <div>כותרת הקורס:
                {course.tytle}
            </div>
            <div>מרצה הקורס:
                {course.lecturer.name}
            </div>
            <div>קטגורית הקורס:
                {course.kategory.type}
            </div>
                <p className="m-0">
                   תקציר הקורס:
                   {course.summary}
                </p>

            </Card>

        </div>
    )
}
