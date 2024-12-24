import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import SearchBar from "./SearchBar";
import SearchModal from "./SearchModal";

export const Header = () => {

    const {auth} = useAuth();

  return (
    <header className="bg-gray-800 text-white fixed top-0 left-0 w-full shadow-md z-10">
        <div className="mx-auto flex justify-between items-center p-4 h-20 relative">
            {/* Logotipo */}
            <h1 className="text-2xl font-bold">
                <a href="/" className="hover:text-gray-300">GStore</a>
            </h1>

            {/* Menú de navegación */}
            <nav className="hidden md:flex gap-8 absolute top-5 right-0">
                <SearchBar/>
                {Object.keys(auth).length !== 0 &&
                    <>
                        <Link className="material-symbols-outlined" to={'/biblioteca'}>sports_esports</Link>     
                        <Link className="material-symbols-outlined" to={'/lista_deseos'}>bookmark</Link>     
                        <Link className="material-symbols-outlined" to={'/carrito'}>shopping_cart</Link>     
                        <Link className="material-symbols-outlined" to={'/admin'}>person</Link>     
                    </>
                }
                
                {Object.keys(auth).length === 0 &&
                    <Link className="" to={'/login'}>Iniciar Sesión</Link>     
                }
            </nav>

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


  )
}

export default Header;
