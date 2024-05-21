
// import React, { useState } from 'react'; 
// import { Document, Page, pdfjs } from 'react-pdf';
// export default function AboatUs() {
//     const PdfImageRenderer = ({ pdfUrl }) => {
//         const [numPages, setNumPages] = useState(null);
    
//         function onDocumentLoadSuccess({ numPages }) {
//             setNumPages(numPages);
//         }
//     return (
//         <div>
//         <Document file={"http://localhost:1133/pros.png"} onLoadSuccess={onDocumentLoadSuccess}>
//             <Page pageNumber={1} width={400} />
//         </Document>
//         <p>Page 1 of {numPages}</p>
//     </div>
//     )
// }}


// import React from 'react';
// const pdf2img = require('pdf2img');

// const pdfPath = "http://localhost:1133/pros.png";

// const converter = new pdf2img(pdfPath);

// converter.convert((err, info) => {
//     if (err) {
//         console.error(err);
//     } else {
//         console.log(info);
//     }
// });
// const AboatUs = () => {
//     return (
//         <div>
//             <img src="path/to/converted/image.jpg" alt="PDF Image" />
//         </div>
//     );
// }

// export default AboatUs;