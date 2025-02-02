
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
    }, [])

    return (
        <div className="bg-slate-900 min-h-screen p-4">
            <h1 className="text-4xl text-white text-center mb-6 mt-4">Carrito</h1>
            <div className={carrito.length !== 0 ? "md:flex block" : ""}>
                <div className={carrito.length !== 0 ? "md:w-2/3" : "w-full"}>    
                    <ul>
                        {carrito.length > 0 ? (
                            <div className="mt-3 w-full">
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
                <div className="bg-slate-800 md:w-1/3 w-full rounded-xl md:ml-4 mt-3 h-fit p-5 space-y-4">
                <h1 className="text-2xl text-white text-center font-bold mb-4">Detalles de la Compra</h1>
                
                <div className="flex justify-between text-slate-300 text-xl">
                    <h2>Total</h2>
                    <p className="font-bold">{formatearPrecio(totalCarrito)}</p>
                </div>
            
                <div className="text-center">
                    <button 
                        onClick={handleClick}
                        className="uppercase bg-blue-500 text-slate-900 p-3 mt-3 mb-5 font-bold rounded-xl w-full hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300 ease-in-out"
                        aria-label="Finalizar la compra">
                        Finalizar Compra
                    </button>
                </div>
            </div>
            
                }
            </div>
        </div>
    )
}

export default Carrito;
