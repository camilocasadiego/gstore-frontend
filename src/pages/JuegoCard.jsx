// import imagen1 from '../assets/images/img_1.jpg'
import imagen2 from '../assets/images/img_2.jpg'
import imagen3 from '../assets/images/img_3.jpg'
import imagen4 from '../assets/images/img_4.jpg'
import imagen5 from '../assets/images/img_5.jpg'
import imagen6 from '../assets/images/img_6.jpg'
import imagen7 from '../assets/images/img_7.jpg'
import imagen8 from '../assets/images/img_8.jpg'
import imagen9 from '../assets/images/img_9.jpg'
import imagen10 from '../assets/images/img_10.jpg'

import { useNavigate } from 'react-router-dom';
import { formatearPrecio } from '../helpers/formatearPrecio';

const imagenPath = `${import.meta.env.VITE_BACKEND_URL}/uploads`;

export const JuegoCard = ({juego}) => {

  const imagenes = [imagen2, imagen3, imagen4, imagen5, imagen6, imagen7, imagen8, imagen9, imagen10];
  const imagenAleatoria = imagenes[Math.floor(Math.random() * imagenes.length)];

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
              className="w-full h-72 object-cover"
              src={imagen ? `${imagenPath}/${imagen}` : `${imagenAleatoria}`}
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
