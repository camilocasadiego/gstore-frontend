import { useEffect } from "react";
import useJuegos from "../hooks/useJuegos";
import imagen_prueba from '../assets/images/img_1.jpg';
import { formatearPrecio } from "../helpers/formatearPrecio";
import { useNavigate } from "react-router-dom";
import BibliotecaCard from "./BibliotecaCard";

export const Biblioteca = () => {

    const {compras, obtenerCompras} = useJuegos();
    // const navigate = useNavigate();

    useEffect(() => {
        const consultarBiblioteca = async () => {
          try {
            await obtenerCompras();
          } catch (error) {
            console.log(error);
          }
        }

        consultarBiblioteca();
        
    }, [])

  return (
    <>
      <div className="bg-slate-900 min-h-screen pt-16 mt-3">
          <h1 className="text-4xl text-white text-center mb-6">Biblioteca</h1>
          
          <ul>
              {compras.length > 0 ? (
                  <div className="ml-20 mr-20">
                      {compras.map((juego) => (
                          <>
                              <li>
                                  <BibliotecaCard key={juego.id} juego={juego} />
                              </li>
                          </>
                      ))}
                  </div>
              ) : (
                  <p className="text-gray-300 text-center text-lg mt-10">
                  Tu biblioteca está vacía. ¡Agrega juegos para comenzar!
                  </p>
              )}
          </ul>
        </div>
    </>
  )
}

export default Biblioteca;
