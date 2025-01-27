import { useEffect, useMemo, useState } from "react";
import useAuth from "../hooks/useAuth";
import clienteAxios from "../config/axios";

export const Perfil = () => {

  const {auth, actualizarUsuario} = useAuth();
  const {id} = auth;

  const [usuario, setUsuario] = useState('');
  const [correo, setCorreo] = useState('');

  const disableSubmit = useMemo(() => {
    
    return (!usuario || !correo);
  }, [usuario, correo]);

  useEffect(() => {
    setUsuario(auth.usuario);
    setCorreo(auth.correo);
  }, [auth]);

  const [alertas, setAlertas] = useState({});

  // Función para manejar los alertas
  const agregarAlerta = (input, msg) => {
    setAlertas(prevAlertas => ({
        ...prevAlertas,
        [input]: msg,
    }));
  }

  const handleUsername = async () => {
    // Limpia cualquier alerta previa
    agregarAlerta('usuario', '');
  
    // Validación inicial: Campo vacío
    if (usuario.trim() === '') {
      agregarAlerta('usuario', 'Debes ingresar un usuario');
      return;
    }
  
    // Evita petición si el usuario es el actual
    if (usuario === auth.usuario) {
      return; // No se necesita hacer nada
    }
  
    try {
      // Buscar el nombre de usuario en el servidor
      const { data } = await clienteAxios.get(`usuarios/usuario/${usuario}`);
      
      // Si el usuario ya existe y no es el actual, muestra alerta
      if (data && data.usuario === usuario) {
        agregarAlerta('usuario', 'Este usuario ya se encuentra en uso');
      }
    } catch (error) {
      console.log(error);
      agregarAlerta('usuario', 'Ocurrió un problema al verificar el usuario');
    }
  };
  
    
  const handleCorreo = async () => {
    
    agregarAlerta('correo', '');

    if(correo === '') agregarAlerta('correo', 'Debes ingresar un correo')
      
      // Buscar el nombre de usuario
      try {
        const {data} = await clienteAxios.get(`usuarios/correo/${correo}`);
        if(data.correo === correo && data.correo !== auth.correo) agregarAlerta('correo', 'Este correo ya se encuentra en uso');
      } catch (error) {
        console.log(error);
      }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    agregarAlerta('guardado', '');

    handleUsername();
    handleCorreo();

    if(Object.values(alertas).every(alert => alert.length === 0)){          
      actualizarUsuario({id, usuario, correo});
    }
  }
    
  return (
    <div className="w-1/2 p-4 rounded-xl bg-slate-800">
      <h1 className="text-center text-3xl text-slate-300 mt-5">Configuración de <span className="font-bold">Perfil</span></h1>
      
      <form className="mt-4" onSubmit={handleSubmit}>
         {/* Descripción */}
        <div className="mb-6">
          <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
              Nombre de Usuario
          </label>
          <input
              onChange={e => setUsuario(e.target.value)}
              onBlur={handleUsername}
              value={usuario}
              type="text"
              id="descripcion"
              name="descripcion"
              className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-slate-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
          />

          {alertas.usuario && <p className="text-sm text-red-500 mt-1">{alertas.usuario}</p>}

        </div>
        <div className="mb-6">
          <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
              Correo
          </label>
          <input
              onChange={e => setCorreo(e.target.value)}
              onBlur={handleCorreo}
              value={correo}
              type="email"
              id="descripcion"
              name="descripcion"
              
              className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-slate-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
          />

          {alertas.correo && <p className="text-sm text-red-500 mt-1">{alertas.correo}</p>}

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
  )
}

export default Perfil;