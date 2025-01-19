import { createContext, useEffect, useState } from 'react'
import clienteAxios from '../config/axios';

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [cargandoUsuario, setCargandoUsuario] = useState(true);
    const [auth, setAuth] = useState({});

    useEffect(() => {
        const autenticarUsuario = async () => {
            const token = localStorage.getItem('token');
            if(token){
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                try {
                    const {data} = await clienteAxios.get('/usuarios/perfil', config);
                    setAuth(data);
                } catch (error) {
                    console.log(error);
                    setAuth({});
                }
                setCargandoUsuario(false);
            }else{
                setCargandoUsuario(false);
            }
        }

        autenticarUsuario();
    }, []);

    const actualizarUsuario = async (user) => {
        console.log("Actualizando Usuario!");

        
        const token = localStorage.getItem('token');
        if(token){
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            
            try {
                const {id, usuario, correo } = user
                const {data} = await clienteAxios.put(`/usuarios/actualizar`, {id, usuario, correo}, config);                
                setAuth(data);
            } catch (error) {
                console.log(error);
            }
        }
    }

    // Permite cambiar la contraseña desde el panel de administración
    const actualizarPassword = async (correo, currentPassword, newPassword, confirmPassword) => {
        const token = localStorage.getItem('token');
        if(token){
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const {data} = await clienteAxios.post('/usuarios/cambiar-password', { correo, currentPassword, newPassword, confirmPassword }, config);
                return data;
            } catch (error) {
                console.log(error);
            }
        }
    }

    // Permite cambiar la contraseña (función de "olvidé mi contraseña")
    const restablecerPassword = async (newPassword, confirmPassword, token) => {
        try {
            const {data} = await clienteAxios.post(`/usuarios/restablecer-password/${token}`, {newPassword, confirmPassword});
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    // TODO: Recuperar cuenta (enviar correo con el código)
    const recuperarCuenta = async (correo) => {
        console.log(correo)
        try {
            const {data} = await clienteAxios.post(`/usuarios/recuperar-cuenta`, {correo});
            return data;
        } catch (error) {
            console.log(error);
        }
    }


    const cerrarSesion = () => {
        localStorage.removeItem('token');
        setAuth({})
    }
  
    return (
    <AuthContext.Provider
        value={{
            auth,
            setAuth,
            cargandoUsuario,
            actualizarUsuario,
            actualizarPassword,
            restablecerPassword,
            recuperarCuenta,
            cerrarSesion
        }}
    >
        {children}
    </AuthContext.Provider>
  )
}

export {
    AuthProvider
}

export default AuthContext;
