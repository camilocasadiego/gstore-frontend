import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import clienteAxios from "../config/axios";
import Alerta from "./Alerta";

export const ConfirmarCuenta = () => {
    
    const params = useParams();
    const { token } = params;
    
    const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
    const [cargando, setCargando] = useState(true);
    const [alerta, setAlerta] = useState({});

    useEffect(() => {
        const confirmarCuenta = async () => {
            try { 
                const {data} = await clienteAxios.get(`/usuarios/confirmar/${token}`);
                if(data) setCuentaConfirmada(true);
                setAlerta({msg: data.msg});
            } catch (error) {
                console.error("Error al confirmar la cuenta:", error);
                setAlerta({msg: error.response?.data?.msg || "Hubo un error al confirmar la cuenta", error: true});
            }

            setCargando(false);
        }

        confirmarCuenta();
    },[token])
    
    return (
        <>
            <div className="bg-slate-900 min-h-screen flex items-center justify-center">
                <div className="bg-slate-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                    <div>
                        <h1 className="text-2xl font-bold text-white text-center mb-6">Cuenta Confirmada</h1>
                        {cuentaConfirmada ?
                            <p className="text-white text-center mb-2">¡Tu cuenta está lista! Inicia sesión ahora y empieza a explorar nuestro catálogo de juegos.</p>                    
                            : <Alerta tipo={cuentaConfirmada} msg={alerta.msg}/>
                        }
                    </div>
                    
                    {/* {alerta && <Alerta tipo={success} msg={alerta} /> } */}

                    <div className="mt-6 text-center">
                        <a href="/login" className="text-blue-500 hover:underline mr-4">Iniciar Sesión</a>
                    </div>
                </div>
            </div>
        </>
    )
}
