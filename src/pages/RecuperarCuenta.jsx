import { useState } from "react";
import useAuth from "../hooks/useAuth";
import Alerta from "./Alerta";

export const RecuperarCuenta = () => {
    console.log("Recuperando Cuenta")

    const [correo, setCorreo] = useState('');
    const { recuperarCuenta } = useAuth();

    const [alerta, setAlerta] = useState('');
    const [alertas, setAlertas] = useState('');
    const [success, setSucess] = useState(false);

    
    // Función para manejar los alertas
    const agregarAlerta = (input, msg) => {
        setAlertas(prevAlertas => ({
            ...prevAlertas,
            [input]: msg,
        }));
    }

    const handleCorreo = () => {
        // Verificar que correo no este vacio
        if(correo.length === 0) agregarAlerta('correo', 'Debes ingresar tu correo');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(correo.length !== 0){
            // Enviar petición
            const response = await recuperarCuenta(correo);
            
            if(response){
                setSucess(response.sucess);
                setAlerta(response.msg);

                if(response.sucess) setCorreo('');
            }

            
        }
    }

    return (
        <>
            <div className="bg-slate-900 min-h-screen flex items-center justify-center">
                <div className="bg-slate-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                    <div>
                        <h1 className="text-2xl font-bold text-white text-center mb-6">Recuperar Cuenta</h1>
                        <p className="text-white text-center mb-2">Ingresa tu correo para recibir un código de verificación</p>
                    </div>
                    
                    {alerta && <Alerta tipo={success} msg={alerta} /> }

                    <form action="" className="space-y-4" onSubmit={handleSubmit}>
                        <div className="text-white">
                            <div>
                                <label className="block mb-1" htmlFor="usuario">Correo</label>
                                <input
                                    id="usuario"
                                    className="mb-3 bg-slate-700 border border-slate-600 rounded w-full p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    type="email"
                                    value={correo}
                                    onBlur={handleCorreo}
                                    onChange={e => setCorreo(e.target.value)}
                                />
                                
                                {alertas.correo && <p className="text-sm text-red-500 mt-1">{alertas.correo}</p>}
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    Enviar código
                                </button>
                            </div>
                        </div>
                    </form>

                    <div className="mt-6 text-center">
                        <a href="/login" className="text-blue-500 hover:underline mr-4">Iniciar Sesión</a>
                        <a href="/crear_cuenta" className="text-blue-500 hover:underline">Crear Cuenta</a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RecuperarCuenta;
