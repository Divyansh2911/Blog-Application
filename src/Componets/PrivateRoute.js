import { useContext } from "react"
import { ThemeContext } from "./ThemeContext"
import { Navigate, Outlet, Route, Routes } from "react-router-dom"
import Profile from "./Profile"

const PrivateRoute = ({component : Component, ...rest},props)=>{
    const {user} = useContext(ThemeContext)
    
    // {console.log(<Component {...props}/>)}
    return(
        // <Routes>
        //    <Route path="/profile/*" element={(props)=>{user?<Component {...props}></Component>:<Navigate to={'/login'}></Navigate>}}/>
        
        // </Routes>
        user?<Outlet />:<Navigate to={'/login'}></Navigate>

    )
}
export default PrivateRoute;