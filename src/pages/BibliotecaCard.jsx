import { useNavigate } from 'react-router-dom';
import imagen_prueba from '../assets/images/img_1.jpg';
import useJuegos from '../hooks/useJuegos';

export const BibliotecaCard = ({juego}) => {

    const { id, nombre, precio } = juego;
    const navigate = useNavigate();

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
                    <h2 
                        onClick={() => navigate(`/juegos/${id}`)} 
                        className="text-3xl font-semibold text-slate-200 cursor-pointer w-fit hover:text-slate-400">{nombre}</h2>
                    {/* <p className="text-xl font-bold text-gray-200 mt-2">{formatearPrecio(precio)}</p> */}
                </div>

                {/* Botones */}
                <div className="flex space-x-5 justify-end mt-4">
                    <button
                        // onClick={() => eliminarListaDeseos(Number(id))}
                        className="text-center text-slate-300 p-2 hover:text-slate-50"
                        >
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    )
}

export default BibliotecaCard;
