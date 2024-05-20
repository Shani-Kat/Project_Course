
import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { useLocation } from 'react-router-dom'
import { useGetCourseByIdQuery } from './courseApiSlice';
import SimpleLoading from '../../common/simpleLoading';
import { Accordion, AccordionTab } from 'primereact/accordion';

export default function CourseCard() {
    const location = useLocation()
    const { data: course, isLoading } = useGetCourseByIdQuery(location.state.id)

    if (isLoading) return <SimpleLoading />
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
        <Accordion>
            <AccordionTab header="פרטי הקורס:">
                <div>
                    {/* Display product details here such as name, price, description */}
                    <p>כותרת הקורס: {course.tytle}</p>
                    <p>מרצה הקורס: {course.lecturer.name}</p>
                    <p>קטגורית הקורס: {course.kategory.type}</p>
                    <p>תקציר הקורס: {course.summary}</p>

                </div>
            </AccordionTab>
        </Accordion>
    );
}

