import { createContext, useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import clienteAxios from "../config/axios";

const DesarrolladorContext = createContext();

const DesarrolladorProvider = ({children}) => {

    // Lista de juegos del desarrollador
    const [juegos, setJuegos] = useState([]);
    // Juego que se va a editar
    const [juegoEditar, setJuegoEditar] = useState([]);

    // Auth
    const {auth} = useAuth();

    useEffect(() => {
        obtenerJuegos();
    }, [auth])
    

    // Obtiene la información del juego que se va a editar
    const consultarJuego = async (id) => {
        console.log("Buscando juego a editar", id);
        const token = localStorage.getItem('token');
        if(token){
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            try {
                const {data} = await clienteAxios.get(`/desarrollador/juegos/${id}`, config);
                setJuegoEditar(data);
            } catch (error) {
                console.log(error);
            }
        }
    }

    // Agrega un juego a la listas de juegos del desarrollador
    // const agregarJuego = async (juego, imagen) => {        
    //     const token = localStorage.getItem('token');
    //     if(token){
    //         const config = {
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 Authorization: `Bearer ${token}`
    //             }
    //         }

    //         const juegoFormateado = new FormData();
    //         juegoFormateado.append('juego', juego);
    //         juegoFormateado.append('imagen', imagen);

    //         try {
    //             await clienteAxios.post(`/desarrollador/agregar-juego`, juegoFormateado, config);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    // }

    const agregarJuego = async (juego) => {
        const token = localStorage.getItem('token');
        if(token){

            const {nombre, descripcion, id_genero, id_desarrollador, lanzamiento, precio, imagen} = juego;
            
            const formData = new FormData();
            
            formData.append('nombre', nombre);
            formData.append('descripcion', descripcion);
            formData.append('id_genero', id_genero);
            formData.append('id_desarrollador', id_desarrollador);
            formData.append('lanzamiento', lanzamiento);
            formData.append('precio', precio);
            formData.append('imagen', imagen);

            const config = {
                headers: {
                    "Content-Type": 'multipart/form-data', // Importante para enviar archivos
                    "Authorization": `Bearer ${token}`,
                }
            }

            try {
                const {data} = await clienteAxios.post(`/desarrollador/agregar-juego`, formData, config);
                return data;
            } catch (error) {
                console.log(error);
            }
        }    
    };
    
    
    // TODO: EDITAR ESTA FUNCIÓN
    // Edita un juego
    const editarJuego = async (juego) => {
        const token = localStorage.getItem('token');
        
        if(token){
            
            const {id, nombre, descripcion, id_genero, id_desarrollador, lanzamiento, precio, imagen} = juego;
            
            const formData = new FormData();
            
            formData.append('nombre', nombre);
            formData.append('descripcion', descripcion);
            formData.append('id_genero', id_genero);
            formData.append('id_desarrollador', id_desarrollador);
            formData.append('lanzamiento', lanzamiento);
            formData.append('precio', precio);
            formData.append('imagen', imagen);

            const config = {
                headers: {
                    "Content-Type": 'multipart/form-data', // Importante para enviar archivos
                    "Authorization": `Bearer ${token}`,
                }
            }

            try {
                const {data} = await clienteAxios.put(`/juegos/editar-juego/${id}`, formData, config);
                console.log(data);
                return data;
            } catch (error) {
                console.log(error);
            }
        }
    }

    // Obtiene todos los juegos del desarrollador
    const obtenerJuegos = async () => {
        const token = localStorage.getItem('token');
        if(token){
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const {data} = await clienteAxios.get('/desarrollador/juegos', config);
                setJuegos(data) 
            } catch (error) {
                console.log(error)
            }
        }
    }

    // Elimina un juego
    const eliminarJuego = async (id) => {
        const token = localStorage.getItem('token');
        
        if(token){
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const {data} = await clienteAxios.delete(`/juegos/eliminar-juego/${id}`, config);
                // Eliminar de la lista de juegos
                if(data.eliminado){
                    const juegosActualizados = juegos.filter(juego => juego.id !== id);
                    setJuegos(juegosActualizados);
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <DesarrolladorContext.Provider
        value={{
            juegos,
            juegoEditar,
            consultarJuego,
            obtenerJuegos,
            agregarJuego,
            editarJuego,
            eliminarJuego
        }}
    >
        {children}
    </DesarrolladorContext.Provider>
    )
}

export {
    DesarrolladorProvider
}

export default DesarrolladorContext;