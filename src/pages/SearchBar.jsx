import { useEffect, useRef, useState } from "react";
import clienteAxios from "../config/axios";
import SearchModal from "./SearchModal";

export const SearchBar = () => {
    
    const [juegos, setJuegos] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    // Esta variable permite controlar el modal (cuando se da click en un juego de la busqueda el modal cambia a false y se cierra)
    const [modalActivo, setModalActivo] = useState(true);



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

    const searchRef = useRef(null);

    const handleClickOutside = (e) => {
        if (searchRef.current && !searchRef.current.contains(e.target)) {
            setModalActivo(false);
        }
    }
        
    useEffect( () => {
        document.addEventListener('click', (e)  => handleClickOutside(e));
        setModalActivo(true);
    }, [juegos])
    
    return (
    <>     
    <div >
        <div ref={searchRef} className="bg-slate-700 flex p-2 rounded-xl space-x-3 hover:bg-slate-600">
            <span className="material-symbols-outlined">search</span>
            <input 
                
                value={busqueda}
                onChange={(e) => handleChange(e.target.value)}
                placeholder="Buscar" 
                className="bg-transparent focus:outline-none" type="text"/>
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
