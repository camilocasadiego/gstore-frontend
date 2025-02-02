import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { AdminSideBar } from "../components/AdminSideBar";
import { SidebarButton } from "../components/SidebarButton";

export const Admin = () => {

  const [sidebar, setSidebar] = useState(false);

  const toggleSidebar = () => {
    setSidebar(!sidebar);
    console.log(sidebar);
  }

  return (

  <>
    <div className=" md:flex block w-full h-full">
     <div className={`bg-slate-800 flex justify-between group md:w-16 md:hover:w-44 transition-all duration-300 ${sidebar ? 'bg-slate-800 transition-all duration-300' : ''} p-2`}>
        <div className="md:hidden w-full flex items-center">
          <SidebarButton toggleSidebar={toggleSidebar}/>
        </div>
        
        <AdminSideBar sidebar={sidebar} toggleSidebar={toggleSidebar} />
      </div> 

      <div className="w-full flex justify-center p-4 transition-all duration-300 group-hover:ml-44">
        <div className="md:m-7 rounded-xl w-full h-fit p-3 bg-slate-800">
          <Outlet />
        </div>
      </div>
    </div>
  </>  

  )
}

export default Admin;
