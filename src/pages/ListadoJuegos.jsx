import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import { useEffect, useState } from 'react';
import clienteAxios from '../config/axios';
import Juego from './JuegoCard';

export const ListadoJuegos = ({genero}) => {

  const [juegos, setJuego] = useState([]);

  useEffect(() => {
    const filtrarJuegos = async () => {
      try {
        const {data} = await clienteAxios.get(`/juegos/genero/${genero}`)
        setJuego(data);
      } catch (error) {
        console.log(error)
      }
    }

    filtrarJuegos();
  }, [])

  const [slides, setSlides] = useState(1);

  const mobileWidth = 481;
  const tabletWidth = 768;
  const desktopWidth = 1280;

  useEffect(() => {
      const handleResize = () => {
          const width = window.innerWidth;
          
          if (width <= mobileWidth) {
              setSlides(1); // 1 slide para dispositivos móviles pequeños
            } else if (width <= tabletWidth) {
              setSlides(2); // 2 slides para tablets
            } else if (width <= desktopWidth) {
              setSlides(3); // 3 slides para escritorios medianos
            } else {
              setSlides(4); // 4 slides para pantallas grandes
            }
      };
  
      // Agregar el listener para el evento "resize"
      window.addEventListener("resize", handleResize);
  
      // Limpiar el listener cuando el componente se desmonte
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);
  
  return (
    
    <>
      <div className="flex justify-between bg-gray-900 p-6">
        <h1 className="text-3xl font-semibold text-white">{genero}</h1>

          <a 
            href={`/genero/${genero}`}
            className="text-white hover:text-blue-700 transition-colors duration-200 text-lg font-medium"
            >
              Ver Más
          </a>

      </div>

      <div>
        <Swiper
          // install Swiper modules
          modules={[Navigation]}
          spaceBetween={25}
          slidesPerView={slides}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
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