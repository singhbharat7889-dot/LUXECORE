import { Outlet } from "react-router-dom"
import AdminNavbar from "../Admin/AdminNavbar"

const AdminLayout = ()=>{

    return<>
    <AdminNavbar/>
    <Outlet/>
    </>

}
export default AdminLayout