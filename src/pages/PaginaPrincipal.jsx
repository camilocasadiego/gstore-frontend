import ListadoJuegos from "./ListadoJuegos";
import Juego from "./JuegoCard";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import { useEffect, useState } from "react";
import clienteAxios from "../config/axios";
import Header from "./Header";
import { obtenerSlides } from "../helpers/obtenerSlides";

export const PaginaPrincipal = () => {
    
    const [generos, setGeneros] = useState([]);
    const [ultimosJuegos, setUltimosJuegos] = useState([]);
    
    useEffect(() => {
        obtenerGeneros();
        obtenerUltimosJuegos();
    }, []);

    const obtenerGeneros = async () => {
        try {
            const {data} = await clienteAxios.get('/juegos/generos');
            setGeneros(data);
        } catch (error) {
            console.log(error)
        }
    }

    const obtenerUltimosJuegos = async () => {
        // TODO: Organizar el link del backend
        const {data} = await clienteAxios.get(`/juegos/ultimos-juegos?page=0&limit=12`);
        console.log(data);
        setUltimosJuegos(data.rows);
    }

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

    return (
        <>
            <Header/>
            <div className="bg-gray-900 pt-16">
                <div className="flex justify-between p-8 items-center">
                    <h1 className="text-3xl font-semibold text-white">Últimos Juegos</h1>
                    <a 
                        href="/genero/ultimos-juegos"
                        className="text-white hover:text-blue-700 transition-colors duration-200 text-lg font-medium"
                    >
                        Ver Más
                    </a>
                </div>
                <div className="">
                    <Swiper
                        // install Swiper modules
                        modules={[Navigation]}
                        spaceBetween={10}
                        slidesPerView={slides}
                        navigation
                    >
                    {ultimosJuegos.map(juego => (
                        <SwiperSlide key={juego.id}>
                            <Juego juego={juego}/>
                        </SwiperSlide>
                    ))}
                    </Swiper>
                </div>
                {Object.entries(generos).map(([id, genero]) => (
                    <ListadoJuegos
                        key={id}
                        genero={genero}
                    />
                ))}
            </div>
        </>
    )
}

export default PaginaPrincipal;