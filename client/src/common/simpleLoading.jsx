
import React from 'react';
import { ProgressSpinner } from 'primereact/progressspinner';

export default function SimpleLoading() {
    return (
        <div className="card flex justify-content-center">
            <ProgressSpinner />
        </div>
    );
}
        