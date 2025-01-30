import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import SearchBar from "./SearchBar";
import { PerfilModal } from "../components/Modal/PerfilModal";

export const Header = () => {

    const {auth} = useAuth();

    return (
        <>
            <header className="bg-gray-800 text-white fixed top-0 left-0 w-full shadow-md z-10">
                <div className="mx-auto flex justify-between items-center p-4 h-20 relative">
                    {/* Logo */}
                    <div className="flex items-center">
                        <h1 className="text-2xl font-bold">
                            <a href="/" className="hover:text-gray-300">GStore</a>
                        </h1>

                        <div className="absolute top-5 left-28 w-64">
                            <SearchBar />
                        </div>
                        
                    </div>

                    {/* Menú de navegación */}
                    <div className="flex gap-8 items-center justify-center mr-4">
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
                    </div>

                    <div className="md:hidden">
                        <button className="text-gray-300 focus:outline-none">
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
                    </div>
                </div>
            </header>

            
        </>
    )
}

export default Header;
