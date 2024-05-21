import React, { useState } from 'react';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { Badge } from 'primereact/badge';
import { Outlet, useNavigate } from 'react-router-dom';
import Login from '../auth/Login';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { useDispatch } from 'react-redux';
import { removeToken } from '../auth/authSlice';

import useAuth from '../auth/userAuth';
import styled from "styled-components";
const StyledFooter = styled.footer`
  background-color: #f9fafb; /* Primary color of PrimeReact library */
  color: #4B5563; /* Text color */
  text-align: center;
  padding: 10px;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
`;

export default function Home() {
    const {_id,phone, firstName,lastName,email,active,status,sex,familyStatus}=useAuth()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const itemRenderer = (item) => (
        <a className="flex align-items-center p-menuitem-link">
            <span className={item.icon} />
            <span className="mx-2">{item.label}</span>
            {item.badge && <Badge className="ml-auto" value={item.badge} />}
            {item.shortcut && <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{item.shortcut}</span>}
        </a>
    );
    const [visible, setVisible] = useState(false);

    const items = [
        


        {
            visible: localStorage.getItem("token") ? true : false,
            label: "הקורסים שלי",
            icon: "pi pi-shopping-cart",
            className: "p-button-rounded",
            command: () => {
                navigate("/basket")
            }
        },
        {
            label: 'בחר שפה',
            items: [
                {
                    label: 'עברית',
                    template: itemRenderer,

                },
                {
                    label: 'English',
                    template: itemRenderer
                },
                {
                    label: 'Español',
                    template: itemRenderer
                },
                {
                    separator: true
                },

            ]
        },
       
        {
            label: 'יצירת קשר',
            template: itemRenderer
        },

        {
            label: 'אודות הארגון',
            command: () => {
                navigate("/aboatUs")
            }
        },


        {
            visible: localStorage.getItem("token") ? true : false,
            label: 'פרופיל',
            icon: 'pi pi-user',
            items: [
                {
                    label: 'עריכת שם המשתמש',
                    template: itemRenderer,
                    command: () => { 
                        navigate(`/userEditUser/${_id}`,{state:{ id: _id}})}
                },
                {
                    label: 'התנתקות',
                    template: itemRenderer,
                    command: () => { dispatch(removeToken()); navigate("/") }
                },
              
            ]

        },
        {
            label: 'קורסים',
            // items: kategotyToShow,

            command: () => { localStorage.getItem("token") ? navigate("/activeCourses") : navigate('/LoginToEnterCourses') },
            // visible:localStorage.getItem("token")?true:false
        },{
            label: 'דף הבית',
            command: () => { navigate("/") }
        }
    ];

    const managerItems = [
        


        {
            visible: localStorage.getItem("token") ? true : false,
            label: 'פרופיל',
            icon: 'pi pi-user',
            items: [
                {
                    label: 'עריכת שם המשתמש',
                    template: itemRenderer,
                    command: () => { 
                        navigate(`/userEditUser/${_id}`,{state:{ id: _id}})}
                },
                {
                    label: 'התנתקות',
                    template: itemRenderer,
                    command: () => { dispatch(removeToken()); navigate("/") }
                },
               
            ]
        },

        {
            visible: localStorage.getItem("token") ? true : false,
            label: "הקורסים שלי",
            icon: "pi pi-shopping-cart",
            className: "p-button-rounded",
            command: () => {
                navigate("/basket")
            }
        },
       
        {
            label: 'יצירת קשר',
            template: itemRenderer
        },

        {
            label: 'אודות הארגון',
            command: () => {
                navigate("/aboatUs")
            }
        },

        {
            label: 'הרשאות מנהל',

            items: [
                {
                    label: 'עריכת קורסים',
                    template: itemRenderer,
                    command: () => { navigate("/mcourses") }


                },
                {
                    label: 'עריכת משתמשים',
                    command: () => { navigate("/users") },

                    template: itemRenderer

                },
                {
                    label: 'עריכת מרצים',
                    command: () => { navigate("/lecturers") } ,
                   
                    template: itemRenderer
                },
                {
                    label: 'עריכת קטגוריות',
                    command: () => { navigate("/kategories") } ,
                   
                    template: itemRenderer
                },
                {
                    separator: true
                },
                

            ]
        },
         
        {
            label: 'קורסים',
            // items: kategotyToShow,

            command: () => { localStorage.getItem("token") ? navigate("/activeCourses") : navigate('/LoginToEnterCourses') },
            // visible:localStorage.getItem("token")?true:false
        },
        {
            label: 'בחר שפה',
            items: [
                {
                    label: 'עברית',
                    template: itemRenderer,

                },
                {
                    label: 'English',
                    template: itemRenderer
                },
                {
                    label: 'Español',
                    template: itemRenderer
                },
                {
                    separator: true
                },

            ]
        },
        {
            label: 'דף הבית',
            command: () => { navigate("/") }
        }
    ];


    const start = <img alt="logo" src="http://localhost:1133/logoV.png" height="60" className="mr-2"></img>;
    const end = (<>
        <div className="flex align-items-center gap-2">


            <Login />
        </div>

    </>);


    return (<>
        <div className='card'>
            <Menubar model={status=="manager"?managerItems:items} start={start} end={end} />
        </div>
        <main><Outlet /></main>
        <br></br>
        <br></br>
        <br></br>
        <StyledFooter >
          <p>© 2024 Your Website Name Contact: example@example.com</p>
      </StyledFooter>
    </>

    )
}


