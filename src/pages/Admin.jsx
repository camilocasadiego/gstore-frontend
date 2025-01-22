import { Link, Outlet } from "react-router-dom";

export const Admin = () => {
  return (
    

    <div className="pt-16 mt-3 bg-slate-900 min-h-screen">
      <div className="flex p-16 space-x-4">
        {/* Colocar esto en un nav bar */}
        <div className="h-fit">
         
            <Link className="material-symbols-outlined flex items-center text-slate-300" to={'/admin/perfil'}>
              person
              <span className="ml-1 text-xl">Perfil</span>
            </Link>     
         
            <Link className="material-symbols-outlined flex items-center text-slate-300 space-x-2" to={'/admin/password'}>
              lock
              <span className="ml-1 text-xl">Contraseña</span>      
            </Link>     
          
            <Link className="material-symbols-outlined flex items-center text-slate-300 space-x-2" to={'/admin/desarrollador'}>
              sports_esports
              <span className="ml-1 text-xl">Juegos</span>
            </Link>     
       
        
        </div>

          <div className="bg-slate-800 w-screen rounded-xl">
            <Outlet />  
          </div>
        </div>
      </div>
 
    
  )
}

export default Admin;
