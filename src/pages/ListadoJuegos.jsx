import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import { useEffect, useState } from 'react';
import clienteAxios from '../config/axios';
import JuegoCard from './JuegoCard';
import { obtenerSlides } from "../helpers/obtenerSlides";

export const ListadoJuegos = ({genero}) => {

  const [juegos, setJuegos] = useState([]);

  useEffect(() => {
    const filtrarJuegos = async () => {
      try {
        const {data} = await clienteAxios.get(`/juegos/genero/${genero}`);
        setJuegos(data);
      } catch (error) {
        console.log(error)
      }
    }

    filtrarJuegos();
  }, [])
  
  
  const [slides, setSlides] = useState(obtenerSlides(window.innerWidth));

  // Manejo de cambios en el tamaño de la ventana
  useEffect(() => {
    const handleResize = () => {
      setSlides(obtenerSlides(window.innerWidth));
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  
  if(juegos.length !== 0){
    return (
      <>

        <div className="flex justify-between p-8 items-center">
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
            spaceBetween={10}
            slidesPerView={slides}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
          >
            {juegos.map(juego => (
              <SwiperSlide key={juego.id}>
                <JuegoCard juego={juego}/>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>   


      </>
    )
  }
}

export default ListadoJuegos;