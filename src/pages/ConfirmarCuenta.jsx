import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import clienteAxios from "../config/axios";

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
                setAlerta({msg: data.msg, error: false});
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
            <div>
                <h1 className="text-indigo-600 font-black text-6xl">
                    Confirma tu cuenta y comienza a administrar tus  {""} 
                    <span className="text-black"> Pacientes</span>
                </h1>
            </div>

            <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
                {!cargando &&
                    <p>{alerta}</p>
                }
 
                {cuentaConfirmada && (
                    <Link className="block text-center my-5 text-gray-500" to="/">Inicia sesión</Link>
                )}
            </div>
        </>
    );
}
