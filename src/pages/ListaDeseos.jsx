
import useJuegos from "../hooks/useJuegos";
import ListaDeseosCard from "./ListaDeseosCard";

export const ListaDeseos = () => {
    const {listaDeseos} = useJuegos();
    return (
        <>
        <div className="bg-slate-900 min-h-screen pt-16 mt-3">

                <h1 className="text-4xl text-white text-center mb-6">Lista de Deseos</h1>
                
                <ul>
                    {listaDeseos.length > 0 ? (
                        <div className="ml-20 mr-20">
                            {listaDeseos.map((juego) => (
                                <>
                                    <li>
                                        <ListaDeseosCard key={juego.id} juego={juego} />
                                    </li>
                                </>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-300 text-center text-lg mt-10">
                        Tu lista de deseos está vacía. ¡Agrega juegos para comenzar!
                        </p>
                    )}
                </ul>
            </div>
        </>
    )
}

export default ListaDeseos;
