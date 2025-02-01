import { useParams } from "react-router-dom";
import clienteAxios from "../config/axios";
import { useEffect, useMemo, useState } from "react";
import { JuegoCard } from "./JuegoCard";
import Header from "./Header";
import { Spinner } from "../components/Spinner";

export const VerMas = () => {

    const {genero} = useParams();       
    const [juegos, setJuegos] = useState([]);
    const [page, setPage] = useState(0);
    const [existJuegos, setExistJuegos] = useState(false);
    
    // Muestra el límite de juegos que van a ser mostrados
    const limiteJuegos = 12;

    useEffect( () => {
        consultarJuegos();
    }, []);

    const consultarJuegos = async () => {
        console.log("Consultando...")
        try {
            if(genero === 'ultimos-juegos'){
                const {data} = await clienteAxios.get(`/juegos/${genero}?page=${page}&limit=${limiteJuegos}`);
                // TODO: Descomentar esto!
                // setPage((prevPage) => prevPage + 1);
                setExistJuegos(page < Math.floor(data.count / limiteJuegos));
                setJuegos(data);
            }else{
                const {data} = await clienteAxios.get(`/juegos/generos/${genero}?page=${page}&limit=${limiteJuegos}`);
                setJuegos(data);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const paginaCargada = useMemo(() => {
        return (
            juegos.count !== undefined
        )
    }, [juegos]);
    
    if( paginaCargada ){
        return (
            <>        
                <Header/>
                <div className="bg-slate-900 pt-20 h-max">
                    {juegos.rows.length !== 0 ? (
                        <>
                            <h1 className="text-3xl font-semibold p-8 text-white">{genero === 'ultimos-juegos' ? "Últimos Juegos" : genero}</h1>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
                                {juegos.rows.map(juego => (
                                    <JuegoCard 
                                    key={juego.id}
                                    juego={juego}
                                    />
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="h-screen flex flex-col text-center items-center justify-center bg-slate-900 text-white pb-20">
                            <p className="text-2xl font-semibold text-gray-300 animate-pulse">
                                No hay juegos disponibles para este género.
                            </p>
                        </div>
                    )}
                    
                    <div className="text-center pb-6 text-white bg-slate-900">
                        {existJuegos && (
                            <button className="bg-slate-800 p-3 rounded" onClick={consultarJuegos}>Ver Más</button>
                        )}
                    </div>
                </div>
            </>
        )
    }else{
        return (<Spinner/>)
    }
   
}

export default VerMas;