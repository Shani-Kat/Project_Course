import { createSlice } from "@reduxjs/toolkit"

const authSlise = createSlice({
    name: "auth",
    initialState: {
        token: localStorage.getItem("token") || "",
        isUserLoggedIn: localStorage.getItem("token") ? true : false
    }
    ,
    reducers: {
        setToken: (state, action) => {
            const token = action.payload.accesJwt
            state.token = token
            state.isUserLoggedIn = true
            localStorage.setItem("token",token)
        },
        removeToken: (state) => {
            state.token = ""
            state.isUserLoggedIn = false
            localStorage.removeItem("token")
        }
    }
})
export default authSlise.reducer
export const { setToken, removeToken } = authSlise.actions
export const selectToken=(state)=>state.auth.token