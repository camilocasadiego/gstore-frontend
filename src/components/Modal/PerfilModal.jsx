import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useEffect, useRef, useState } from "react";

export const PerfilModal = () => {

    const {cerrarSesion} = useAuth();
    const [modalOpen, setModalOpen] = useState(false);
    const modalRef = useRef(null);

    const toggleProfileModal  = () => {
        setModalOpen(!modalOpen);
    }

    useEffect(() => {
        const handleClickOutside = (e) => {
            if(modalRef.current && !modalRef.current.contains(e.target)){
                setModalOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
      

    return (   
        <div ref={modalRef}>
            <button 
                onClick={toggleProfileModal}
                className="flex items-center material-symbols-outlined"
                >person
            </button>

            {modalOpen &&
                <div onClick={toggleProfileModal} className="bg-slate-700 top-16 right-0 z-20 p-2 mr-2 fixed rounded-xl border border-slate-600">       
                    <Link 
                        className="material-symbols-outlined flex items-center text-xl text-slate-300" to={'/admin/perfil'}>
                    person
                        <span className="ml-1">Cuenta</span>
                    </Link>     
                
                    <Link className="material-symbols-outlined flex items-center text-xl text-slate-300" to={'/admin/desarrollador'}>
                    sports_esports
                        <span className="ml-1">Juegos</span>
                    </Link>     
                
                    <button 
                        className="material-symbols-outlined flex items-center  text-slate-300 text-xl"
                        onClick={cerrarSesion}
                            >logout
                        <span className="ml-1">Cerrar Sesión</span>
                    </button>                    
                </div>
            }
        </div>
    )
}
