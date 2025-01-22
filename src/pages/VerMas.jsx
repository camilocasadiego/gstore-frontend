import { useParams } from "react-router-dom";
import clienteAxios from "../config/axios";
import { useEffect, useState } from "react";
import Juego from "./JuegoCard";
import Header from "./Header";

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
        try {
            if(genero === 'ultimos-juegos'){
                const {data} = await clienteAxios.get(`/juegos/${genero}?page=${page}&limit=${limiteJuegos}`);
                setPage((prevPage) => prevPage + 1);
                setExistJuegos(page < Math.floor(data.count / limiteJuegos));
                setJuegos((prevJuegos) => [...prevJuegos, ...data.rows]);
            }else{
                const {data} = await clienteAxios.get(`/juegos/generos/${genero}?page=${page}&limit=${limiteJuegos}`);
                setJuegos((prevJuegos) => [...prevJuegos, ...data.rows]);
            }
        } catch (error) {
            console.log(error)
        }
    }
    
    return (
        <>        
            <Header/>
            <div className="bg-slate-900 pt-20">
                <h1 className="text-3xl font-semibold p-6 text-white">{genero === 'ultimos-juegos' ? "Últimos Juegos" : genero}</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                    {juegos.map(juego => (
                        <Juego 
                            key={juego.id}
                            juego={juego}
                        />
                    ))}
                </div>
                
                <div className="text-center pb-6 text-white bg-slate-900">
                    {existJuegos && (
                        <button className="bg-slate-800 p-3 rounded" onClick={consultarJuegos}>Ver Más</button>
                    )}
                </div>
            </div>
        </>
    )
}

export default VerMas;