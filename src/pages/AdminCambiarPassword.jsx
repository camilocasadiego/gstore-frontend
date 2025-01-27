import { useState, useMemo } from "react";
import useAuth from "../hooks/useAuth";
import Alerta from "./Alerta";

export const AdminCambiarPassword = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [alertas, setAlertas] = useState({});
    const { auth, actualizarPassword } = useAuth();
    const { correo } = auth;

    const [success, setSucess] = useState(false);
    const [alertaMsg, setAlertaMsg] = useState('');

    const disableSubmit = useMemo(() => {
        return (
            !currentPassword || 
            newPassword.length < 8 || 
            confirmPassword.length < 8
        );
    }, [currentPassword, newPassword, confirmPassword]);

    // Función para manejar los alertas
    const agregarAlerta = (input, msg) => {
        setAlertas(prevAlertas => ({
            ...prevAlertas,
            [input]: msg,
        }));
    }

  const handleCurrentPassword = () => {
    agregarAlerta('currPass', '');
    if(currentPassword === '') agregarAlerta('currPass', 'Debes ingresar tu contraseña actual');
  }
  
  const handleNewPassword = () => {
    agregarAlerta('newPass', '');
    if(newPassword.length < 8) agregarAlerta('newPass', 'La contraseña debe tener mínimo 8 caracteres');
    if(newPassword === '') agregarAlerta('newPass', 'Debes ingresar la nueva contraseña');
    
  }
  
  const handleConfirmPassword = () => {
    agregarAlerta('confPass', '');
    if(confirmPassword.length < 8) agregarAlerta('confPass', 'La contraseña debe tener mínimo 8 caracteres');
    if(confirmPassword === '') agregarAlerta('confPass', 'Debes confirmar tu contraseña');
  }

    const handleSubmit = async (e) => {
        e.preventDefault();
                
        if (disableSubmit) return;

        try {
            const response = await actualizarPassword(correo, currentPassword, newPassword, confirmPassword);
            if(response) {
                setSucess(response.success)
                setAlertaMsg(response.msg)
            }

            if(response.success){
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="w-1/2 p-4 rounded-xl bg-slate-800">
            <h1 className="text-center text-3xl text-slate-300 mt-5">Cambia tu <span className="font-bold">Contraseña</span></h1>

            {alertaMsg && <Alerta tipo={success} msg={alertaMsg} /> }
         
            <form className="mt-4" onSubmit={handleSubmit}>
                {/* Contraseña Actual */}
                <div className="mb-6">
                    <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-300 mb-2">
                        Contraseña Actual
                    </label>
                    <input
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        value={currentPassword}
                        onBlur={handleCurrentPassword}
                        type="password"
                        id="currentPassword"
                        className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-slate-800 text-white"
                    />
                    {alertas.currPass && <p className="text-sm text-red-500 mt-1">{alertas.currPass}</p>}

                </div>

                {/* Nueva Contraseña */}
                <div className="mb-6">
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-300 mb-2">
                        Nueva Contraseña
                    </label>
                    <input
                        onChange={(e) => setNewPassword(e.target.value)}
                        value={newPassword}
                        onBlur={handleNewPassword}
                        type="password"
                        id="newPassword"
                        className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-slate-800 text-white"
                    />
            {alertas.newPass && <p className="text-sm text-red-500 mt-1">{alertas.newPass}</p>}

                </div>

                {/* Confirmar Contraseña */}
                <div className="mb-6">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                        Confirmar Contraseña
                    </label>
                    <input
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        value={confirmPassword}
                        onBlur={handleConfirmPassword}
                        type="password"
                        id="confirmPassword"
                        className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-slate-800 text-white"
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
        </div>
    );
};
