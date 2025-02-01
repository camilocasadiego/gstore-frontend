import { useEffect, useRef, useState } from "react";
import clienteAxios from "../config/axios";
import SearchModal from "../components/Modal/SearchModal";

export const SearchBar = () => {
    
    const [juegos, setJuegos] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    // Esta variable permite controlar el modal (cuando se da click en un juego de la busqueda el modal cambia a false y se cierra)
    const [modalActivo, setModalActivo] = useState(true);
    const [searchModal, setSearchModal] = useState(false);
    
    const searchRef = useRef(null);

    const buscarJuego = async (nombreJuego) => {
        if(nombreJuego){
            try {
                const {data} = await clienteAxios.get(`/juegos/buscar/${nombreJuego}`)
                setJuegos(data);
            } catch (error) {
                console.log(error)
            }
        }else{
            setJuegos([]);
        }
    }

    const handleChange = (nombreJuego) => {
        setBusqueda(nombreJuego);
        buscarJuego(nombreJuego)
        setModalActivo(true);
    }
    
    const handleClickOutside = (e) => {
        if (searchRef.current && !searchRef.current.contains(e.target)) {
            setModalActivo(false);
        }
    }
        
    useEffect( () => {
        document.addEventListener('click', handleClickOutside);
        setModalActivo(true);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [juegos])
    
    return (
    <>     
    <div >
        <div ref={searchRef} className="flex p-2 rounded-xl space-x-3 sm:hover:bg-slate-600 bg-slate-700">
            <span 
                className="material-symbols-outlined"
            >search</span>
            <input 
                
                value={busqueda}
                onChange={(e) => handleChange(e.target.value)}
                placeholder="Buscar" 
                className="focus:outline-none bg-transparent w-full h-full" type="text"/>
        </div>
        <div onClick={() => setBusqueda('')}>
        {
            busqueda && modalActivo ?
            Object.keys(juegos).length !== 0 
            ? <SearchModal juegos={juegos} />
            : <p>No hay juegos disponibles</p>
            : ''
        }
        </div> 
        </div>
    </>
    )

}

export default SearchBar;
