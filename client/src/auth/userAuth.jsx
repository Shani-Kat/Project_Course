import { useSelector } from "react-redux"
import { selectToken } from "./authSlice"
import {jwtDecode} from "jwt-decode"
const useAuth=()=>{
    const token=useSelector(selectToken)
    let isManager=false
    let isSimpleUser=false
    if(token)
    {
        const userDecoded=jwtDecode(token)
        const {_id,phone, firstName,lastName,email,active,status,sex,familyStatus}=userDecoded
        // isManager= status==='manager'
        // isSimpleUser=status==='simpleUser'
        return {_id,phone, firstName,lastName,email,active,status,sex,familyStatus}
    }
    return {_id:'',phone:'', firstName:'',lastName:'',email:'',active:'',status:'',sex:'',familyStatus:''}
}
export default useAuth