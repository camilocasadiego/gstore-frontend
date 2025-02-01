import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import SearchBar from "./SearchBar";
import { PerfilModal } from "../components/Modal/PerfilModal";
import { useState } from "react";
import { SideBar } from "../components/SideBar";

export const Header = () => {

    const {auth} = useAuth();

    const [sidebar, setSideBar] = useState(false);

    const toggleSidebar = () => {
        setSideBar(!sidebar);
        console.log(sidebar);
    }
    return (
        <>
            <header className="bg-gray-800 text-white fixed top-0 left-0 w-full shadow-md z-10">
                <div className="mx-auto flex justify-between items-center p-4 h-20 relative">
                    {/* Logo */}
                    <div className="flex items-center">
                        <h1 className="text-2xl font-bold">
                            <Link to={'/'} className="hover:text-gray-300">GStore</Link>
                        </h1>

                        <div className="absolute top-5 left-28 w-[34vh] sm:w-64">
                            <SearchBar />
                        </div>
                        
                    </div>

                    {/* Menú de navegación */}
                    <nav className="md:flex gap-8 items-center justify-center mr-4 hidden">
                        {Object.keys(auth).length !== 0 && 
                            <div className="flex space-x-5">
                                <Link className="material-symbols-outlined h-fit" to={'/biblioteca'}>sports_esports</Link>     
                                <Link className="material-symbols-outlined h-fit" to={'/lista_deseos'}>bookmark</Link>     
                                <Link className="material-symbols-outlined h-fit" to={'/carrito'}>shopping_cart</Link>     
                                <PerfilModal/>
                            </div>
                        }
                                        
                        {Object.keys(auth).length === 0 &&
                            <Link className="" to={'/login'}>Iniciar Sesión</Link>     
                        }
                    </nav>

                    <div className="md:hidden">
                        <button 
                            className="text-gray-300 focus:outline-none"
                            onClick={toggleSidebar}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16m-7 6h7"
                                />
                            </svg>
                        </button>

                        <SideBar isOpen={sidebar} toggleSidebar={toggleSidebar}/>
                    </div>
                </div>
            </header>

            
        </>
    )
}

export default Header;
