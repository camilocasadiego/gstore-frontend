// Componentes
import ListadoJuegos from "./ListadoJuegos";
import  JuegoCard from "./JuegoCard";
import Header from "./Header";

// Swiper para mostrar los juegos
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from 'swiper/modules';
// Estilos del swiper
import 'swiper/css';
import 'swiper/css/navigation';

// Función para mostrar una cantidad determinada de slides en el swiper
import {obtenerSlides} from "../helpers/obtenerSlides";

// Consultas con axios
import clienteAxios from "../config/axios";

// Hooks de React
import { useEffect, useMemo, useState } from "react";
import { Spinner } from "../components/Spinner";

export const PaginaPrincipal = () => {
    

    // Declaración de estado para los géneros de los juegos
    const [generos, setGeneros] = useState([]);

    // Declaración de estado para los últimos juegos
    const [ultimosJuegos, setUltimosJuegos] = useState({});

    // Almacena la cantidad de slides que se deben mostrar de acuerdo al tamaño de la ventana
    const [slides, setSlides] = useState(obtenerSlides(window.innerWidth));
        
    useEffect(() => {
        // TODO: posiblemente esta función se use en otras partes, pasarla a JuegosProvider
        const obtenerGeneros = async () => {
            try {
                const {data} = await clienteAxios.get('/juegos/generos');
                setGeneros(Object.entries(data));
            } catch (error) {
                console.log(error)
            }
        }
        
        const consultarUltimosJuegos = async () => {
            try {
                const {data} = await clienteAxios.get(`/juegos/ultimos-juegos?page=0&limit=12`);
                setUltimosJuegos(data);
            } catch (error) {
                console.log(error);
            }
        }
        
       obtenerGeneros();
       consultarUltimosJuegos();
    }, []);

    // Verifica que los juegos y los generos se hayan consultado para posteriormente cargar la página
    const paginaCargada = useMemo(() => {
        return (
            ultimosJuegos.count !== undefined &&
            generos.length !== 0
        );
    }, [ultimosJuegos, generos]);


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


    if(paginaCargada){
        return (
            <>
                <Header/>
                <div className="pt-20 h-max">
                    {ultimosJuegos.rows.length !== 0 ? (
                        <>
                            <div className="flex justify-between p-8 items-center">
                                <h1 className="text-3xl font-semibold text-white">Últimos Juegos</h1>
                                <a 
                                    href="/genero/ultimos-juegos"
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
                                    >
                                {ultimosJuegos.rows.map(juego => (
                                    <SwiperSlide key={juego.id}>
                                        <JuegoCard juego={juego}/>
                                    </SwiperSlide>
                                ))}
                                </Swiper>
                            </div>   

                            <div>
                                {generos.map(([id, genero]) => (
                                    <ListadoJuegos
                                    key={id}
                                    genero={genero}
                                    />
                                ))}
                            </div>
                        </>) 
                        : (
                            <div className="h-screen flex flex-col items-center justify-center bg-gray-900 text-white pb-20">
                                <h1 className="text-4xl font-bold mb-4 animate-fade-in">🎮 ¡Bienvenido a GStore! 🎮</h1>
                                <p className="text-2xl font-semibold text-gray-300 animate-pulse">
                                    No hay juegos disponibles en este momento.
                                </p>
                            </div>
                        )
                    }
                </div>            
            </>
        )
    }else{
        return (
            <Spinner/>
        );
    }
}

export default PaginaPrincipal;