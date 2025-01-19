import imagen_prueba from '../assets/images/img_1.jpg'
import { useNavigate } from 'react-router-dom';
import { formatearPrecio } from '../helpers/formatearPrecio';
const imagenPath = `${import.meta.env.VITE_BACKEND_URL}/uploads`;

export const JuegoCard = ({juego}) => {
  const {id, nombre, precio, imagen} = juego;
  const genero = juego.genero?.genero;

  const navigate = useNavigate();

  return (
    <>
      <div
        className="cursor-pointer max-w-sm rounded-lg shadow-lg bg-slate-900 overflow-hidden mb-10 ml-10">

          <div 
            onClick={() => navigate(`/juegos/${id}`)}>
          
            <img
              className="w-full h-48 object-cover"
              src={imagen ? `${imagenPath}/${imagen}` : imagen_prueba}
              alt="Producto"
            />

            <div className="p-4">
              {genero && (
                <h2 className="text-lg font-semibold text-gray-200 mt-2">
                  {genero}
                </h2>
              )}
              <h2 className="text-lg font-semibold text-gray-200 mt-2">
                {nombre}
              </h2>
              <p className="text-xl font-bold text-gray-200 mt-2">{formatearPrecio(precio)}</p>
            </div>
          </div>
      </div>
    </>
  )    
}

export default JuegoCard;
