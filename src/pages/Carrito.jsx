
import { useEffect, useState } from "react";
import useJuegos from "../hooks/useJuegos";
import CarritoCard from "./CarritoCard";
import { formatearPrecio } from "../helpers/formatearPrecio";
import clienteAxios from "../config/axios";

export const Carrito = () => {
    const {obtenerCarrito, carrito, setCarrito, setCompras} = useJuegos();
    const [totalCarrito, setTotalCarrito] = useState(0);
    
    const calTotalCarrito = () => {
        const total = carrito.reduce((acc, juego) => acc + Number(juego.precio), 0);
        setTotalCarrito(total);
    }

    const handleClick = async () => {
        const token = localStorage.getItem('token');
        if(token){
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const {data} = await clienteAxios.post('/juegos/compras', carrito, config);
                if(data.success){
                    // Actualizamos la biblioteca
                    setCompras(prevCompras => [...prevCompras, ...carrito]);
                    // Limpiamos el carrito
                    setCarrito([]);
                }

            } catch (error) {
                console.log(error);
            }
        }
    }

    useEffect(() => {
        calTotalCarrito();

        const obtenerCarritoActual = async () => {
            await obtenerCarrito();
        }

        obtenerCarritoActual();
    }, [carrito])

    return (
        <>
            <div className="bg-slate-900 min-h-screen pt-20">
                <h1 className="text-4xl text-white text-center mb-6 mt-4">Carrito</h1>
                <div className={carrito.length !== 0 ? "flex" : ""}>
                    <div className={carrito.length !== 0 ? "w-2/3" : "w-full"}>    
                        <ul>
                            {carrito.length > 0 ? (
                                <div className="ml-20 mr-3 mt-3">
                                    {carrito.map((juego) => (
                                        <>
                                            <li>
                                                <CarritoCard key={juego.id} juego={juego} />
                                            </li>
                                        </>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-300 text-center text-lg mt-10">
                                Tu carrito está vacío. ¡Agrega juegos para comenzar!
                                </p>
                            )}
                        </ul>
                    </div>
                    
                    {carrito.length !== 0 &&
                        <div className="bg-slate-800 w-1/3 mr-5 rounded-xl mt-3 h-fit">
                            <h1 className="text-2xl text-white text-center mt-3 font-bold">Detalles de la Compra</h1>
                            <div className="flex justify-between mt-3 p-5">
                                <h2 className="text-slate-300 text-xl">Total</h2>
                                <p className="text-slate-300 text-xl font-bold">{formatearPrecio(totalCarrito)}</p>
                            </div>
                            <div className="text-center">
                                <button 
                                    onClick={handleClick}
                                    className="uppercase hover:bg-blue-400 bg-blue-500 p-3 mb-3 mt-3 font-bold rounded-xl text-slate-900">
                                    Finalizar Compra
                                </button>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default Carrito;
