import ListadoJuegos from "./ListadoJuegos";
import Juego from "./JuegoCard";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import { useEffect, useState } from "react";
import clienteAxios from "../config/axios";
import Header from "./Header";

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
        setUltimosJuegos(data.rows);
    }

    return (
        <>
            <Header/>
            <div className="bg-gray-900 pt-16">
                <div className="flex justify-between p-4">
                    <h1 className="text-3xl font-semibold text-white">Últimos Juegos</h1>
                    <a 
                        href="/genero/ultimos-juegos"
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