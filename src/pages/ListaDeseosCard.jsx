import imagen_prueba from '../assets/images/img_1.jpg'
import { useNavigate } from 'react-router-dom';
import { formatearPrecio } from '../helpers/formatearPrecio';
import useJuegos from '../hooks/useJuegos';
import { useEffect, useState } from 'react';

export const ListaDeseosCard = ({juego}) => {
    
    const {id, nombre, precio} = juego;
    const genero = juego.genero?.genero;
    const {carrito, agregarCarrito, eliminarCarrito, eliminarListaDeseos} = useJuegos();
    const navigate = useNavigate();
 
    const [guardadoCarrito, setGuardadoCarrito] = useState(false);
    const [guardadoBiblioteca, setGuardadoBiblioteca] = useState(false);

    const existeEnCarrito = () => {
        return carrito.some(juego => juego.id === id);
    }

    const {compras} = useJuegos();

    const existeEnBiblioteca = () => {
        return compras.some(juego => juego.id === id);
    }

    useEffect(() => {
        console.log(carrito);
        console.log(compras);
       
        setGuardadoCarrito(existeEnCarrito());
        setGuardadoBiblioteca(existeEnBiblioteca());
       
    }, [carrito]);

    const handleBotonCarrito = () => {
        if(!guardadoCarrito){
            agregarCarrito({id_juego: Number(id)});
        }else{
            eliminarCarrito(Number(id));
        }
    }

    return (
        <div className="flex w-full mb-5 bg-slate-800 rounded-lg">
            {/* Imagen, nombre, precio (evento click) */}
            <div 
                onClick={() => navigate(`/juegos/${id}`)}
                className="flex-shrink-0 w-64 h-48 m-3 rounded-lg shadow-lg hover:shadow-inner">
                    <img
                    className="w-full h-full object-cover rounded-lg cursor-pointer"
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
                        onClick={() => eliminarListaDeseos(Number(id))}
                        className="text-center text-slate-300 p-2 hover:text-slate-50"
                        >
                        Eliminar
                    </button>
                    <button
                        disabled={guardadoBiblioteca}
                        onClick={handleBotonCarrito}        
                        className="disabled:bg-slate-900 disabled:border disabled:border-slate-800 text-center bg-slate-600 text-white p-2 rounded-lg hover:bg-slate-500 transition"
                        >

                        {guardadoBiblioteca ? 'Comprado' : !guardadoCarrito ? 'Agregar al carrito' : 'Eliminar del Carrito'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ListaDeseosCard;