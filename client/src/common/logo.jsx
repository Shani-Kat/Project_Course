
import React from 'react'; 
import { Image } from 'primereact/image';

export default function Logo() {
    const icon = (<i className="pi pi-search"></i>)

    return (<>
        <br/>  <br/>
        <div className="card flex justify-content-center">
          
            <Image src="http://localhost:1133/logoV.png" indicatorIcon={icon} alt="Image" preview width="1000" />
        </div></>
    )
}
        