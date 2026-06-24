import { Outlet } from "react-router-dom"
import Navbar from "../NavBar/Navbar"
import Footer from "../Pages/Footer"

const UserLayout = ()=>{

    return<>
    <Navbar />
    <Outlet/>
    <Footer/>
    </>

}
export default UserLayout