import useDesarrollador from "../hooks/useDesarrollador";
import { formatearPrecio } from "../helpers/formatearPrecio";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { formatearFecha } from "../helpers/formatearFecha";
import useJuegos from "../hooks/useJuegos";
export const Desarrollador = () => {

    const navigate = useNavigate();
        
    const {generos, obtenerGeneros} = useJuegos();

    const {eliminarJuego, obtenerJuegos, juegos} = useDesarrollador();
    
    useEffect(() => {
        obtenerGeneros();
        obtenerJuegos();
    }, []);

    return (
        <div>
            <div className="flex"> 
                <div className=" w-full">
                    <h1 className="text-center text-3xl text-slate-300 mt-5">Administración de <span className="font-bold">Juegos</span></h1>
                </div>          
             
                <button 
                    onClick={() => navigate('agregar-juego')}
                    className="mr-3 justify-end material-symbols-outlined text-3xl text-slate-300 mt-5 font-bold">add</button>
                
            </div>

            <ul className="mt-3">
                {juegos.map(juego => (
                    <li
                        key={juego.id}
                        className="flex justify-between items-center p-3 mb-3 bg-slate-800 hover:bg-slate-700 rounded-lg shadow-md transition duration-300 ease-in-out"
                        >
                        {/* Imagen del juego */}
                        <div className="ml-3 mr-3">
                            <img
                                onClick={() => navigate(`/juegos/${juego.id}`)}
                                src={`http://localhost:4000/uploads/${juego.imagen}`}
                                alt={`Imagen ${juego.nombre}`}
                                className="w-20 h-16 object-cover rounded-lg shadow-lg hover:cursor-pointer"
                            />
                        </div>

                        {/* Información del juego */}
                        <div className="w-full flex flex-wrap md:flex-nowrap">
                            <p 
                                onClick={() => navigate(`/juegos/${juego.id}`)}
                                className="w-full md:w-2/5 text-lg text-slate-300 font-bold truncate hover:cursor-pointer hover:text-slate-500">
                                {juego.nombre}
                            </p>
                            <p className="w-full md:w-1/5 text-lg text-slate-300 font-bold truncate">
                                {generos[juego.id_genero]}
                            </p>
                            <p className="w-full md:w-1/5 text-lg text-slate-300 font-bold truncate">
                                {formatearPrecio(juego.precio)}
                            </p>
                            <p className="w-full md:w-1/5 text-lg text-slate-300 font-bold truncate">
                                {formatearFecha(juego.lanzamiento)}
                            </p>
                        </div>

                        {/* Botones de editar y eliminar */}
                        <div className="w-fit flex space-x-2 pl-2 pr-2">
                            <button
                                onClick={() => navigate(`/admin/desarrollador/${juego.id}`)}
                                className="material-symbols-outlined text-slate-300 hover:text-blue-500"
                                aria-label={`Editar ${juego.nombre}`}
                            >
                                edit
                            </button>
                            <button
                                className="material-symbols-outlined text-slate-300 hover:text-red-500"
                                onClick={() => eliminarJuego(juego.id)}
                                aria-label={`Eliminar ${juego.nombre}`}
                            >
                                delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Desarrollador;
