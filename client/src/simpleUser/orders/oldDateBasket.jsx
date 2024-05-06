
import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataView } from 'primereact/dataview';
import { classNames } from 'primereact/utils';
import { useDeleteOrderMutation, useGetOldDateUserOrdersQuery} from './ordersApiSlise';
import LoadingBasket from './LoadingBasket';

export default function OldDateBasket() {
    const {data:orders,isLoading,isError,error}=useGetOldDateUserOrdersQuery()
    const [delOrder, { isError1, isSuccess, error1 }]=useDeleteOrderMutation()
    if(isLoading)return(<LoadingBasket/>)
    if(isError)return(<h1>{error}</h1>)
    const itemTemplate = (order, index) => {
        return (<>
            {/* {  order.courseId.date<Date()?alert("עבר תאריך ההרשמה לקורס tjs tu hu,r vbnmtho cxk akl, אנא מחק קורס זה מסל הקניות על מנת להמשיך"):<></>} */}
            <div className="col-12" key={order._id}>
                <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
                    <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={`http://localhost:1133/logoV.png`} alt={order._id} />
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                        
                            <div className="text-2xl font-bold text-900">נושא הקורס:{order.courseId.title} </div>
                            <div className="text-2xl font-bold text-900">מרצה:{order.courseId.lecturer.name}</div>
                         {  order.courseId.date<Date()?<h3 >עבר תאריך ההרשמה לקורס, אנא מחק קורס זה מסל הקניות על מנת להמשיך</h3>:<></>}
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-tag"></i>
                                    <span className="font-semibold">{order.courseId.kategory.type}</span>
                                </span>

                            </div>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <span className="text-2xl font-semibold">${order.courseId.cost}</span>
                            <Button icon= "pi pi-trash" className="p-button-rounded"
                            onClick={
                                ()=>{delOrder({_id:order._id})}
                            
                            }></Button>
                        </div>
                    </div>
                </div>
            </div>
            </>
        );
    };

    const listTemplate = (items) => {
        if (!items || items.length === 0) return null;

        let list = items.map((order, index) => {
            return itemTemplate(order, index);
        });

        return <div className="grid grid-nogutter">{list}</div>;
    };

    return (
        <div className="card">
            
       
                {
            orders.length?<DataView value={orders} listTemplate={listTemplate} paginator rows={5}/>:<></>
               
            }
        </div>
       
    )
}
        