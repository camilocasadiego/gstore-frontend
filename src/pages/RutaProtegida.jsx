import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Header from "./Header";

export const RutaProtegida = () => {

    const {auth, cargandoUsuario} = useAuth();

    if(cargandoUsuario){
        return 'cargando';
    }else{
        return (
            <>
            <Header/>
                    {auth?.id ? (
                        
                        <Outlet />  
                        
                    ): <Navigate to="/" /> }
            
            {/* <Footer/> */}
        </>
        )
    }
}

export default RutaProtegida;
