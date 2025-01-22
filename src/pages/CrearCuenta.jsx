import { useEffect, useState } from "react";
import clienteAxios from "../config/axios";
import Alerta from "./Alerta";

export const CrearCuenta = () => {

    const [usuario, setUsuario] = useState("");
    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    const [confirmarPassword, setConfirmarPassword] = useState("");
    const [alerta, setAlerta] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setAlerta({});

        if(![usuario, correo, password, confirmarPassword].includes('')){
            if(password.length >= 8){
                if(password === confirmarPassword){
                    try {
                        const response = await clienteAxios.post('/usuarios/crear-cuenta', { usuario, correo, password, confirmarPassword });
                        if(response){
                           if(response.success) {
                               setUsuario('')
                               setCorreo('');
                               setPassword('');
                               setConfirmarPassword('');
                           }
                           setAlerta({success: response.success, msg: response.msg});
                        }
                    } catch (error) {
                        setAlerta({msg: error.response.data.msg, error: true})
                    }
                }else{
                    setAlerta({msg: 'Las contraseñas no son iguales', error: true});
                }
            }else{
                setAlerta({msg: 'La contraseña debe tener mínimo 8 caracteres', error: true});
            }
        }else{
            setAlerta({success: false, msg: "Debes rellenar todos los campos"});
        }
    }

    return (
        <>
            <div className="bg-slate-900 min-h-screen flex items-center justify-center">
                <div className="bg-slate-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                    <div>
                        <h1 className="text-2xl font-bold text-white text-center mb-6">Crear Cuenta</h1>
                    </div>
                    {alerta.msg && <Alerta
                        tipo={alerta.success}
                        msg={alerta.msg}
                    />} 
                    <form onSubmit={handleSubmit} action="" className="space-y-4">
                        <div className="text-white">
                            <div>
                                <label className="block mb-1" htmlFor="correo">Usuario</label>
                                    <input
                                        id="usuario"
                                        className="mb-3 bg-slate-700 border border-slate-600 rounded w-full p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        type="text"
                                        value={usuario}
                                        onChange={e => setUsuario(e.target.value)}
                                    />
                            </div>
                            <div>
                            <label className="block mb-1" htmlFor="correo">Correo</label>
                                <input
                                    id="correo"
                                    className="mb-3 bg-slate-700 border border-slate-600 rounded w-full p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    type="email"
                                    value={correo}
                                    onChange={e => setCorreo(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block mb-1" htmlFor="password">Contraseña</label>
                                <input
                                    id="password"
                                    className="mb-3 bg-slate-700 border border-slate-600 rounded w-full p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    type="password"
                                    value={password}  
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </div>
                            
                            <div>
                                <label className="block mb-1" htmlFor="password">Confirmar Contraseña</label>
                                <input
                                    id="confirmar_password"
                                    className="bg-slate-700 border border-slate-600 rounded w-full p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    type="password"
                                    value={confirmarPassword}  
                                    onChange={e => setConfirmarPassword(e.target.value)}
                                />
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    Crear Cuenta
                                </button>
                            </div>
                        </div>
                    </form>

                    <div className="mt-6 text-center">
                        <a href="/login" className="text-blue-500 hover:underline mr-4">Iniciar Sesión</a>
                        <a href="/olvide-password" className="text-blue-500 hover:underline">¿Olvidaste tu contraseña?</a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CrearCuenta;