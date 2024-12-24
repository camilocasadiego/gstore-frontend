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
  
    return (
    <AuthContext.Provider
        value={{
            auth,
            setAuth,
            cargandoUsuario
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
