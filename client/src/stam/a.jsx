// import React, { useState, useEffect } from "react";
// import { TreeSelect } from "primereact/treeselect";
// import { NodeService } from "../service/NodeService";

import { useNavigate } from "react-router-dom"


//remove this 
//   const [nodes, setNodes] = useState(null);
//   const [selectedNodeKey, setSelectedNodeKey] = useState(null);

//   useEffect(() => {
//     NodeService.getTreeNodes().then((data) => setNodes(data));
//   }, []);

//   return (
//     <div className="card flex justify-content-center">
//       <TreeSelect
//         value={selectedNodeKey}
//         onChange={(e) => setSelectedNodeKey(e.value)}
//         options={nodes}
//         className="md:w-20rem w-full"
//         placeholder="Select Item"
//       ></TreeSelect>
//     </div>
//   );
// }

export default function Aaa() {
    const navigate=useNavigate()
    return(
    <div 
    onClick={()=>{ navigate(`/Course/${3}`,{state:{ id: '663248e1bcee2b18076f8ecb' }})}} 
    >לחץ כאן</div>
    )

}

