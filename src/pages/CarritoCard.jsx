import imagen_prueba from '../assets/images/img_1.jpg'
import { useNavigate } from 'react-router-dom';
import { formatearPrecio } from '../helpers/formatearPrecio';
import useJuegos from '../hooks/useJuegos';
import { useEffect, useState } from 'react';

export const CarritoCard = ({juego}) => {
    
    const {id, nombre, precio} = juego;
    const genero = juego.genero?.genero;
    const {listaDeseos, agregarListaDeseos, eliminarListaDeseos, eliminarCarrito} = useJuegos();
    const navigate = useNavigate();
 
    const [guardadoLista, setGuardadoLista] = useState(false);

    const existeEnListaDeseos = () => {
        return listaDeseos.some(juego => juego.id === id);
    }
    useEffect(() => {
        setGuardadoLista(existeEnListaDeseos());
       
    }, [listaDeseos]);

    const handleBotonLista = () => {
        if(!guardadoLista){
            agregarListaDeseos({id_juego: Number(id)});
        }else{
            eliminarListaDeseos(Number(id));
        }
    }

    return (
        <div className="flex w-full mb-5 bg-slate-800 rounded-lg">
            {/* Imagen, nombre, precio (evento click) */}
            <div 
                onClick={() => navigate(`/juegos/${id}`)}
                className="flex-shrink-0 md:w-64 md:h-48 mx-auto p-3 h-40 w-28 m-3 rounded-lg hover:shadow-inner">
                    <img
                    className="h-full w-full object-cover rounded-lg cursor-pointer"
                    src={imagen_prueba}
                    alt="Producto"
                    />
            </div>

            {/* Detalles del Producto */}
            <div className="flex flex-col justify-between w-full p-4">
                <div>
                    <h2 onClick={() => navigate(`/juegos/${id}`)} className="text-3xl font-semibold text-slate-200 cursor-pointer w-fit hover:text-slate-400">{nombre}</h2>
                    <p className="text-xl font-bold text-gray-200 mt-2">{formatearPrecio(precio)}</p>
                </div>

                {/* Botones */}
                <div className="flex space-x-5 justify-end mt-4">
                    <button
                        onClick={() => eliminarCarrito(Number(id))}
                        className="bg-transparent text-center text-slate-300 p-2 hover:text-slate-50"
                        >
                        Eliminar
                    </button>
                    <button
                        onClick={handleBotonLista}        
                        className="text-center bg-slate-600 text-white p-2 rounded-lg hover:bg-slate-500 transition"
                        >

                        {!guardadoLista ? 'Agregar a la lista de deseos' : 'Quitar de la lista de deseos'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CarritoCard;