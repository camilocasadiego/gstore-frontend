import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';

import { useEffect, useState } from 'react';
import clienteAxios from '../config/axios';
import Juego from './JuegoCard';

export const ListadoJuegos = ({genero}) => {

  const [juegos, setJuego] = useState([]);

  useEffect(() => {
    const filtrarJuegos = async () => {
      try {
        const resultados = await clienteAxios.get(`/juegos/genero/${genero}`)
        setJuego(resultados.data);
      } catch (error) {
        console.log(error)
      }
    }

    filtrarJuegos();
    // Probablemente si se deba añadir "genero" y "ulitmoJuegos" al arreglo...
  }, [])
  return (
    
    <>
      <div className="flex justify-between bg-slate-900">
        <h1 className="text-3xl font-semibold text-white">{genero}</h1>

          <a 
            href={`/genero/${genero}`}
            className="text-white hover:text-blue-700 transition-colors duration-200 text-lg font-medium"
            >
              Ver Más
          </a>

        </div>
        <div className="container">
          <Swiper
            spaceBetween={50}
            slidesPerView={3}
            // onSlideChange={() => console.log('slide change')}
            // onSwiper={(swiper) => console.log(swiper)}
          >
            {juegos.map(juego => (
              <SwiperSlide key={juego.id}>
                <Juego juego={juego}/>
              </SwiperSlide>
            ))}
          </Swiper>
      </div>
    </>

  )
}

export default ListadoJuegos;