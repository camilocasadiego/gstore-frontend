import { useMemo, useState } from "react";
import Alerta from "./Alerta";
import useAuth from "../hooks/useAuth";
import { useParams } from "react-router-dom";

export const CambiarPassword = () => {
    
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [alertas, setAlertas] = useState({});
    const [success, setSucess] = useState(false);
    const [alerta, setAlerta] = useState('');
    
    const params = useParams();
    const { token } = params;

    const {restablecerPassword} = useAuth();

    const disableSubmit = useMemo(() => {
        return (
            newPassword.length < 8 || 
            confirmPassword.length < 8
        );
    }, [newPassword, confirmPassword]);

    // Función para manejar los alertas
    const agregarAlerta = (input, msg) => {
        setAlertas(prevAlertas => ({
            ...prevAlertas,
            [input]: msg,
        }));
    }

    const handleNewPassword = () => {
        if(newPassword.length < 8) agregarAlerta('newPass', 'La contraseña debe tene mínimo 8 caracteres');
        if(newPassword.length === 0) agregarAlerta('newPass', 'Debes ingresar tu nueva contraseña');
    }

    const handleConfirmPassword = () => {
        if(confirmPassword.length === 0) agregarAlerta('confPass', 'Debes confirmar tu nueva contraseña');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
            
        if (disableSubmit) return;

        try {
            const response = await restablecerPassword(newPassword, confirmPassword, token);
            console.log(response);
            if(response) {
                setSucess(response.success)
                setAlerta(response.msg)
            }

            if(response.success){
                setNewPassword('');
                setConfirmPassword('');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="bg-slate-900 min-h-screen flex items-center justify-center">
            <div className="bg-slate-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                <div>       
                    <h1 className="text-2xl font-bold text-white text-center mb-6">Cambiar Contraseña</h1>
                </div>
                
                {alerta && <Alerta tipo={success} msg={alerta} /> }
            
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Nueva Contraseña */}
                    <div className="text-white">
                        <label htmlFor="newPassword" className="block mb-1">
                            Nueva Contraseña
                        </label>
                        <input
                            onChange={(e) => setNewPassword(e.target.value)}
                            value={newPassword}
                            onBlur={handleNewPassword}
                            type="password"
                            id="newPassword"
                            className="mb-3 bg-slate-700 border border-slate-600 rounded w-full p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                
                        {alertas.newPass && <p className="text-sm text-red-500 mt-1">{alertas.newPass}</p>}

                    </div>

                    {/* Confirmar Contraseña */}
                    <div className="text-white">
                        <label htmlFor="confirmPassword" className="block mb-1">
                            Confirmar Contraseña
                        </label>
                        <input
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            value={confirmPassword}
                            onBlur={handleConfirmPassword}
                            type="password"
                            id="confirmPassword"
                            className="mb-3 bg-slate-700 border border-slate-600 rounded w-full p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                
                {alertas.confPass && <p className="text-sm text-red-500 mt-1">{alertas.confPass}</p>}

                    </div>

                    <button
                        type="submit"
                        className={`w-full px-6 py-3 mt-4 rounded-lg font-semibold ${disableSubmit ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500'}`}
                        disabled={disableSubmit}
                    >
                        Actualizar
                    </button>
                </form>
                
                <div className="mt-6 text-center">
                    <a href="/login" className="text-blue-500 hover:underline mr-4">Iniciar Sesión</a>
                    <a href="/crear_cuenta" className="text-blue-500 hover:underline">Crear Cuenta</a>
                </div>
            </div>
        </div>
    );
}
