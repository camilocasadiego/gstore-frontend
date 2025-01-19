import { useEffect, useState } from "react"
import clienteAxios from "../config/axios";
import useAuth from "../hooks/useAuth";

export const AdminCambiarPassword = () => {

  const fields = 3;
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [alertas, setAlertas] = useState({});
  const [disableSubmit, setDisableSubmit] = useState(true);

  const {auth} = useAuth();
  const {correo} = auth;

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
  
  const validarForm = () => {
    setDisableSubmit(true);
    console.log(Object.keys(alertas));
    if(Object.keys(alertas).length >= fields){
      if(Object.values(alertas).every(alerta => alerta.length === 0)){
        console.log(disableSubmit);
        setDisableSubmit(false);
      }
    }
  }

  useEffect(() => {
    validarForm();
  }, [alertas]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Verificar datos
    console.log("click")
    if(!disableSubmit){          
      console.log("Enviando Form");
      
      // TODO: validar que sean iguales las contraseña nueva y la confirmada
      
      try {
        // Enviar datos al endpoint
        await clienteAxios.post('/usuarios/cambiar-password', { correo, currentPassword, newPassword, confirmPassword });
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
            <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-300 mb-2">
                Contraseña Actual
            </label>
            <input
                onChange={e => setCurrentPassword(e.target.value)}
                onBlur={handleCurrentPassword}
                value={currentPassword}
                type="password"
                id="currentPassword"
                name="currentPassword"
                className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-slate-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
            />

            {alertas.currPass && <p className="text-sm text-red-500 mt-1">{alertas.currPass}</p>}

        </div>        
        <div className="mb-6">
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-300 mb-2">
              Nueva Contraseña
            </label>
            <input
                onChange={e => setNewPassword(e.target.value)}
                onBlur={handleNewPassword}
                value={newPassword}
                type="password"
                id="newPassword"
                name="newPassword"
                className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-slate-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
            />

            {alertas.newPass && <p className="text-sm text-red-500 mt-1">{alertas.newPass}</p>}

        </div>        
        <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                Confirmar Contraseña
            </label>
            <input
                onChange={e => setConfirmPassword(e.target.value)}
                onBlur={handleConfirmPassword}
                value={confirmPassword}
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-slate-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
            />

            {alertas.confPass && <p className="text-sm text-red-500 mt-1">{alertas.confPass}</p>}

        </div>        

          
        <button
          type="submit"
          className={`w-full px-6 py-3 mt-4 rounded-lg font-semibold transition-all duration-300 ${disableSubmit ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
          disabled={disableSubmit}
        >
          Cambiar
        </button>
          
      </form>
    </div>
  )
}
