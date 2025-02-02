import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export const SideBar = ({isOpen, toggleSidebar}) => {

    const {auth, cerrarSesion} = useAuth();
    
    return (
        <div
            className={`fixed top-0 right-0 h-full bg-slate-800 text-white w-64 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
            <div className="p-4 h-full">
                <button onClick={toggleSidebar} className="text-2xl bg-transparent">&times;</button>
                <h2 className="text-lg mt-4 mb-6">Menú</h2>
                
                {Object.keys(auth).length !== 0 ? (   
                    <ul className="h-full">
                        <div className="h-3/4">
                            <li>
                                <Link to={'/admin/perfil'} className="py-2 px-4 flex items-center" onClick={toggleSidebar}>
                                    <span className="material-symbols-outlined mr-1">person</span>Perfil
                                </Link>
                            </li>
                            <li>
                                <Link to={'/carrito'} className="py-2 px-4 flex items-center" onClick={toggleSidebar}>
                                    <span className="material-symbols-outlined mr-1">shopping_cart</span>Carrito
                                </Link>
                            </li>
                            <li>
                                <Link to={'/lista_deseos'} className="py-2 px-4 flex items-center" onClick={toggleSidebar}>
                                    <span className="material-symbols-outlined mr-1">bookmark</span>Lista de Deseos
                                </Link>
                            </li>
                            <li>
                                <Link to={'/biblioteca'} className="py-2 px-4 flex items-center" onClick={toggleSidebar}>
                                    <span className="material-symbols-outlined mr-1">sports_esports</span>Biblioteca
                                </Link>
                            </li>
                        </div>

                        <div className="h-1/4 mt-10">  
                            <hr className="border-gray-300 my-4" />
                            <li onClick={cerrarSesion}>
                                <Link to={'/biblioteca'} className="py-2 px-4 flex items-center">
                                    <span className="material-symbols-outlined mr-1">logout</span>Cerrar Sesión
                                </Link>
                            </li>
                        </div>
                    </ul>
                ) : (
                    <div className="p-4">
                        <Link to={'/login'}>Iniciar Sesión</Link>     
                    </div>
                )}
            </div>
        </div>
    );
}
