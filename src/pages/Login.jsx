import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import clienteAxios from "../config/axios";
import useAuth from "../hooks/useAuth";
import Alerta from "./Alerta";

export const Login = () => {

    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    
    const [alertas, setAlertas] = useState({});

    const {setAuth} = useAuth();
    const navigate = useNavigate();


    // Función para manejar los alertas
    const agregarAlerta = (input, msg) => {
        setAlertas(prevAlertas => ({
            ...prevAlertas,
            [input]: msg,
        }));
    }

    const handleCorreo = () => {
        agregarAlerta('correo', '');
        if(correo === '') agregarAlerta('correo', 'Debes ingresar tu correo');
    }

    const handlePassword = () => {
        agregarAlerta('password', '');
        if(password === '') agregarAlerta('password', 'Debes ingresar tu contraseña');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        agregarAlerta('submit', '');

        if(correo === '') handleCorreo();
        if(password === '') handlePassword();

        // Colocar alerta que retorna el backend
        if(![correo, password].includes('')){
            try {
                const {data} = await clienteAxios.post('/usuarios/login', {correo, password}); 
                if(data.msg){
                    agregarAlerta('submit', data.msg);
                }else{
                    localStorage.setItem('token', data.token)
                    setAuth(data)
                    setCorreo('');
                    navigate('/');
                }        
            } catch (error) {
                console.log(error);
                // setAlerta({msg: error.response.data.msg, error: true})
            }
        }
    }

    return (
        <>
            <div className="bg-slate-900 min-h-screen flex items-center justify-center">
                <div className="bg-slate-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                    <div>
                        <h1 className="text-2xl font-bold text-white text-center mb-6">Iniciar Sesión</h1>
                    </div>
                    
                    {alertas.submit && (
                    <p className="bg-red-500 text-center mt-4 mb-4 text-white uppercase font-bold rounded p-2 shadow-md">
                        {alertas.submit}
                    </p>
                )}

                    <form onSubmit={handleSubmit} action="" className="space-y-4">
                        <div className="text-white">
                            <div>
                                <label className="block mb-1" htmlFor="correo">Correo</label>
                                <input
                                    id="usuario"
                                    className="mb-3 bg-slate-700 border border-slate-600 rounded w-full p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    type="email"
                                    onChange={e => setCorreo(e.target.value)}                         
                                    onBlur={handleCorreo}

                                />
                                <p className="text-sm text-red-500 mb-2">{alertas.correo}</p>
                            </div>
                            <div>
                                <label className="block mb-1" htmlFor="password">Contraseña</label>
                                <input
                                    id="password"
                                    className="bg-slate-700 border border-slate-600 rounded w-full p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    type="password"
                                    onChange={e => setPassword(e.target.value)}   
                                    onBlur={handlePassword}                      
                                />
                                <p className="text-sm text-red-500 mt-1">{alertas.password}</p>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    Iniciar Sesión
                                </button>
                            </div>
                        </div>
                    </form>

                    <div className="mt-6 text-center">
                        <a href="/crear_cuenta" className="text-blue-500 hover:underline mr-4">Crear Cuenta</a>
                        <a href="/olvide-password" className="text-blue-500 hover:underline">¿Olvidaste tu contraseña?</a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;