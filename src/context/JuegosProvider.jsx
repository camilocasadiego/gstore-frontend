import { createContext, useEffect, useState } from "react"
import clienteAxios from "../config/axios";
import useAuth from "../hooks/useAuth";

const JuegosContext = createContext();

const JuegosProvider = ({children}) => {

    const [carrito, setCarrito] = useState([]);
    const [listaDeseos, setListaDeseos] = useState([]);
    const [compras, setCompras] = useState([]);
    const [generos, setGeneros] = useState({});

    const {auth} = useAuth();

    // Variables que almacenan el valor de la carga de la lissta de deseos y el carrito ( true = se encuentra cargando / false = ya cargó)
    const [cargandoLista, setCargandoLista] = useState(true);
    const [cargandoCarrito, setCargandoCarrito] = useState(true);
    const [cargandoBiblioteca, setCargandoBiblioteca] = useState(true);    

    // Se carga cada que se recarga un componente
    useEffect( () => {
        obtenerCarrito();
        obtenerListaDeseos();    
        obtenerCompras();
    }, [auth]);

    // TODO: se podría hacer solo un return con los datos sin necesidad de almacenar los generos en un state
    const obtenerGeneros = async () => {
        try {
            const {data} = await clienteAxios.get('/juegos/generos');
            setGeneros(data);
        } catch (error) {
            console.log(error);
        }
    }

    // const obtenerConfig = () => {
        
    //     const token = localStorage.getItem('token');
        
    //     let config = {};

    //     if(token){
    //         config = {
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 Authorization: `Bearer ${token}`
    //             }
    //         }
    //     }

    //     return config
    // }

    // Busca juegos por un nombre especifico (se utiliza para saber si el nombre de un juego en especifico ya se encuentra en la bd)
    const buscarJuego = async (nombre) => {
        try {
            const {data} = await clienteAxios.get(`/juegos/consultar/${nombre}`)
            return data;
        } catch (error) {
            console.log(error)
        }
    }

    // Busca juego que empicen por los caracteres ingresados (se utiliza para la barra de busqueda)
    const buscarPorNombre = async (nombre) => {
        try {
            const {data} = await clienteAxios.get(`/juegos/buscar/${nombre}`);            
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    const buscarPorId = async (id) => {
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
                return data;
            } catch (error) {
                console.log(error);
            }
        }
    }

    const obtenerListaDeseos = async () => {
        setCargandoCarrito(true);
        const token = localStorage.getItem('token');
        if(token){
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
    
            try {
                const {data} = await clienteAxios.get('/juegos/lista-deseos', config);
                setListaDeseos(data);
                setCargandoLista(false);
            } catch (error) {
                console.log(error)
            }
        }else{
            setListaDeseos([]);
            setCargandoLista(false);
        }
    }

    const agregarListaDeseos = async (id) => {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        const {data} = await clienteAxios.post('/juegos/lista-deseos', id, config)
        await obtenerListaDeseos();
        return data;
    }

    const eliminarListaDeseos = async (id) => {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        
        try {
            const {data} = await clienteAxios.delete(`/juegos/lista-deseos/${id}`, config)
            const listaActualizada = listaDeseos.filter(listaState => listaState.id !== id);
            setListaDeseos(listaActualizada);
            return data;
        } catch (error) {
            console.log(error)
        }
    }
    
    const obtenerCarrito = async () => {
        setCargandoCarrito(true);
        const token = localStorage.getItem('token');
        if(token){

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
        
            try {
                const {data} = await clienteAxios.get('/juegos/carrito', config);
                setCarrito(data);
                setCargandoCarrito(false);
            } catch (error) {
                console.log(error);
            }
        }else{
            setCarrito([]);
            setCargandoCarrito(false);
        }
    }

    const agregarCarrito = async (id) => {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        
        try {
            const {data} = await clienteAxios.post('/juegos/carrito', id, config)
            await obtenerCarrito();
            return data;
        } catch (error) {
            console.log(error)
        }
    }

    const eliminarCarrito = async (id) => {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        
        try {
            const {data} = await clienteAxios.delete(`/juegos/carrito/${id}`, config)
            const carritoAtualizado = carrito.filter(carritoState => carritoState.id !== id);
            setCarrito(carritoAtualizado);
            return data;
        } catch (error) {
            console.log(error)
        }
    }

    const obtenerCompras = async () => {
        setCargandoBiblioteca(true);
        const token = localStorage.getItem('token');
        if(token){
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            
            try {
                const {data} = await clienteAxios.get('/juegos/compras', config)                
                setCompras(data)
                setCargandoBiblioteca(false);
            } catch (error) {
                console.log(error);
            }
        }else{
            setCompras([]);
        }
    }
    
    const infoJuego = async (id) => {
        try {
            return await clienteAxios.get(`/juegos/juego/${id}`);           
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <JuegosContext.Provider
        value={{
            listaDeseos,
            cargandoLista,
            agregarListaDeseos,
            obtenerListaDeseos,
            eliminarListaDeseos,
            carrito,
            setCarrito,
            obtenerCarrito,
            agregarCarrito,
            eliminarCarrito,
            cargandoCarrito,
            compras,
            setCompras,
            obtenerCompras,
            buscarJuego,
            generos,
            obtenerGeneros,
            buscarPorNombre,
            buscarPorId,
            infoJuego,
            cargandoBiblioteca,
            setCargandoBiblioteca
        }}
    >
        {children}
    </JuegosContext.Provider>
    )
}

export {
    JuegosProvider
}

export default JuegosContext;
