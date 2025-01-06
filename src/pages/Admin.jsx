import { Link, Outlet } from "react-router-dom";

export const Admin = () => {
  return (
    

    <div className="pt-16 mt-3 bg-slate-900 min-h-screen">
      <div className="flex p-16 space-x-4">
        {/* Colocar esto en un nav bar */}
        <div className="h-fit">
          <div>
            <Link className=" material-symbols-outlined text-slate-300" to={'/admin/perfil'}>
            person
              <span>Perfil</span>
            </Link>     
          </div>
          <div>
            <Link className="material-symbols-outlined text-slate-300" to={'/admin/desarrollador'}>
              sports_esports
                <span>Juegos</span>
            </Link>     
          </div>
        </div>

          <div className="bg-slate-800 w-screen rounded-xl">
            <Outlet />  
          </div>
        </div>
      </div>
 
    
  )
}

export default Admin;
