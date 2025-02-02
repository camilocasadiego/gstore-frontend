import { Link } from "react-router-dom"

export const AdminSideBar = ({sidebar, toggleSidebar}) => {
  return (
    <nav 
        className={`${sidebar ? 'opacity-100 top-20 mt-10' : 'opacity-0 top-20 mt-10 -translate-x-full'} 
        md:opacity-100 md:translate-x-0 bg-slate-800 md:hover:w-44 md:mt-0 fixed left-0 w-screen h-screen md:top-20 p-2 md:h-screen md:w-16 transition-all duration-300`}>
        <Link
            className="w-fit material-symbols-outlined flex items-center text-slate-300 text-3xl m-2" to={'/admin/perfil'}
            onClick={toggleSidebar}              
        >
        person
            <span className="ml-1 text-xl md:opacity-0 group-hover:opacity-100 transition-opacity duration-300">Perfil</span>
        </Link>     

        <Link 
            className="w-fit material-symbols-outlined flex items-center text-slate-300 space-x-2 text-3xl m-2" to={'/admin/password'}
            onClick={toggleSidebar}          
        >
        lock
        <span className="ml-1 text-xl md:opacity-0 group-hover:opacity-100 transition-opacity duration-300">Contraseña</span>      
        </Link>     

        <Link 
            className="w-fit material-symbols-outlined flex items-center text-slate-300 space-x-2 text-3xl m-2" to={'/admin/desarrollador'}
            onClick={toggleSidebar}        
        >
        sports_esports
            <span className="ml-1 text-xl md:opacity-0 group-hover:opacity-100 transition-opacity duration-300">Juegos</span>
        </Link>
    </nav>   
  )
}
