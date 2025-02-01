import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export const SideBar = ({isOpen, toggleSidebar}) => {

    const {cerrarSesion} = useAuth();
    
    return (
        <div
            className={`fixed top-0 right-0 h-full bg-slate-800 text-white w-64 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
            <div className="p-4 h-full">
                <button onClick={toggleSidebar} className="text-2xl">&times;</button>
                <h2 className="text-lg mt-4">Menú</h2>
                <ul className="mt-6 h-full">
                    <div className="h-2/3">
                        <li>
                            <Link to={'/admin/perfil'} className="py-2 px-4 flex items-center">
                                <span className="material-symbols-outlined mr-1">person</span>Perfil
                            </Link>
                        </li>
                        <li>
                            <Link to={'/carrito'} className="py-2 px-4 flex items-center">
                                <span className="material-symbols-outlined mr-1">shopping_cart</span>Carrito
                            </Link>
                        </li>
                        <li>
                            <Link to={'/lista_deseos'} className="py-2 px-4 flex items-center">
                                <span className="material-symbols-outlined mr-1">bookmark</span>Lista de Deseos
                            </Link>
                        </li>
                        <li>
                            <Link to={'/biblioteca'} className="py-2 px-4 flex items-center">
                                <span className="material-symbols-outlined mr-1">sports_esports</span>Biblioteca
                            </Link>
                        </li>
                    </div>

                    <div className="h-1/3">  
                        <hr className="border-gray-300 my-4" />
                        <li className="mt-auto" onClick={cerrarSesion}>
                            <Link to={'/biblioteca'} className="py-2 px-4 flex items-center">
                                <span className="material-symbols-outlined mr-1">logout</span>Cerrar Sesión
                            </Link>
                        </li>
                    </div>
                </ul>
            </div>
        </div>
    );
}
