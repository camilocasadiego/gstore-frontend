import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import imagen_prueba from '../assets/images/img_1.jpg'
import Header from "./Header";
import { formatearPrecio } from "../helpers/formatearPrecio";
import useAuth from "../hooks/useAuth";
import useJuegos from "../hooks/useJuegos";
import { existeJuego } from "../helpers/existeJuego";
import { formatearFecha } from "../helpers/formatearFecha";
const imagenPath = `${import.meta.env.VITE_BACKEND_URL}/uploads`;

export const InfoJuego = () => {
  const { id } = useParams();
  const [juego, setJuego] = useState([]);
  const [cargandoJuego, setCargandoJuego] = useState(true);

  const {nombre, descripcion, lanzamiento, precio, imagen} = juego;
  const genero = juego.genero?.genero;
  const desarrollador = juego.usuario?.desarrollador;
  
  const {auth} = useAuth();
  
  const {
    listaDeseos, 
    cargandoLista, 
    obtenerListaDeseos, 
    agregarListaDeseos, 
    eliminarListaDeseos, 
    carrito, 
    cargandoCarrito, 
    obtenerCarrito, 
    agregarCarrito, 
    eliminarCarrito,
    compras,
    infoJuego,
    cargandoBiblioteca
  } = useJuegos();

  const navigate = useNavigate();
  
  const [guardadoLista, setGuardadoLista] = useState(undefined);
  const [guardadoCarrito, setGuardadoCarrito] = useState(undefined);
  const [guardadoCompras, setGuardadoCompras] = useState(undefined);

  useEffect( () => {
    const cargarInfoJuego = async () => {
      const {data} = await infoJuego(id);
      if(data === null){
        navigate('/');
      }else{
        setJuego(data);
      }
    }

    if(juego.length === 0){
      cargarInfoJuego();
    } else{
      setCargandoJuego(false);
    }   
    

    if(!cargandoCarrito) setGuardadoCarrito(existeJuego(carrito, id));
    if(!cargandoLista) setGuardadoLista(existeJuego(listaDeseos, id));
    if(!cargandoBiblioteca) setGuardadoCompras(existeJuego(compras, id));
    
  }, [listaDeseos, carrito, compras, id])
    
  
  const handleListaDeseos = async () => {
    // Verificar que no este en la lista de deseos
    if(Object.keys(auth).length !== 0){
      if(!guardadoLista){
        const {guardado} = await agregarListaDeseos({id_juego: Number(id)});
        setGuardadoLista(guardado);
      }else{
        const {guardado} = await eliminarListaDeseos(Number(id));
        setGuardadoLista(guardado);
      }
      obtenerListaDeseos();
    }else{
      navigate('/login')
    }
  }

  const handleCarrito = async () => {
    // Verificar que no este en el carrito
    if(Object.keys(auth).length !== 0){
      if(!guardadoCarrito){
        const {guardado} = await agregarCarrito({id_juego: Number(id)});        
        setGuardadoCarrito(guardado);
      }else{
        const {guardado} = await eliminarCarrito(Number(id));
        setGuardadoCarrito(guardado);
      }
      obtenerCarrito();
    }else{
      navigate('/login')
    }
  }
  
    if( cargandoJuego && cargandoLista && cargandoCarrito){
      // Agregar spinner
      return 'cargando...'
    }else{
      return (
        <>     
          <Header/>
          <div className="bg-gray-900 pt-20 px-4 sm:px-6 lg:px-8 min-h-screen">
            <div className="max-w-7xl mx-auto mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h1 className="text-3xl sm:text-4xl font-bold text-gray-100">{nombre}</h1>
                  <img 
                    src={imagen ? `${imagenPath}/${imagen}` : imagen_prueba}
                    alt="Imagen del juego" 
                    className="w-full h-auto object-cover rounded-lg shadow-lg border border-gray-700"
                  />
                  <div>
                    <span className="font-semibold text-gray-100">Género: </span>
                    <span className="text-gray-300">{genero}</span>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-100 mb-2">Descripción</h2>
                    <p className="text-gray-300">{descripcion}</p>
                  </div>
                </div>
                <div className="space-y-6 mt-0 md:mt-20">
                  <div>
                    {/* <span className="font-semibold text-gray-100">Precio:</span> */}
                    <span className="text-2xl text-gray-300">{formatearPrecio(precio)}</span>
                  </div>
                  <div className="space-y-3">
                    <button 
                      onClick={handleListaDeseos} 
                      className="flex items-center px-4 py-2 text-white rounded-lg hover:bg-slate-700 transition duration-300 bg-slate-800"
                    >
                      <span className="material-symbols-outlined mr-2 ">bookmark</span>
                      <span>{guardadoLista ? "Quitar de la lista de deseos" : "Añadir a la lista de deseos"}</span>
                    </button>

                    <button
                      disabled={guardadoCompras}
                      onClick={handleCarrito} 
                      className="disabled:bg-slate-900 disabled:border disabled:border-slate-800 flex items-center px-4 py-2 text-white rounded-lg hover:bg-slate-700 transition duration-300 bg-slate-800"
                    >
                      <span className="material-symbols-outlined mr-2">shopping_cart</span>
                      <span>{guardadoCompras ? 'Comprado' : guardadoCarrito ? "Quitar del carrito" : "Añadir al carrito"}</span>
                    </button>
                  </div>
                  
                  <div>
                    <span className="font-semibold text-gray-100">Desarrollador:</span>
                    <span className="ml-2 text-gray-300">{desarrollador}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-100">Lanzamiento:</span>
                    <span className="ml-2 text-gray-300">{lanzamiento ? formatearFecha(lanzamiento) : ''}</span>
                  </div> 
                </div>
              </div>
            </div>
          </div>

          
        </>
      ) 
  }
}

export default InfoJuego;
