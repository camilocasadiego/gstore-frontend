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
