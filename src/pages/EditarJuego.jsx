import { useEffect, useRef, useState } from "react";
import useJuegos from "../hooks/useJuegos";
import useAuth from "../hooks/useAuth";
import { obtenerFechaActual } from "../helpers/obtenerFecha";
import useDesarrollador from "../hooks/useDesarrollador";
import { useParams } from "react-router"

export const AgregarJuego = () => {

    // Obtenemos el id del desarrollador
    const {auth} = useAuth();
    const id_desarrollador = auth.id;
    
    // Funciones de los providers
    const {generos, obtenerGeneros, buscarJuego, buscarPorId} = useJuegos();
    const {editarJuego} = useDesarrollador();
    
    // Datos formulario
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [id_genero, setId_genero] = useState('');
    const [precio, setPrecio] = useState(0);
    const [imagen, setImagen] = useState(null);
    const [originalImg, setOriginalImg] = useState(null);
    const [imagenPreview, setImagenPreview] = useState(null);
    
    // Alertas de cada input del formulario
    const [alertas, setAlertas] = useState({});

    // Controla el botón de "guardar", para que se muestre disponible o no
    const [submitBtn, setSubmitBtn] = useState(true);

    // Id del juego obtenido de la URL
    const {id} = useParams();

    // Variable para verificar que ya se haya cargado la info del juego que se va a editar
    const [cargado, setCargado] = useState(false);

    const imagenRef = useRef(null);
    
    useEffect(() => {
        const cargarDatos = async () => {
          try {
            await obtenerGeneros();
                
            if (id) {
              const juegoEditar = await buscarPorId(id);
              setNombre(juegoEditar.nombre);
              setDescripcion(juegoEditar.descripcion);
              setId_genero(juegoEditar.id_genero);
              setPrecio(juegoEditar.precio);
              setImagen(juegoEditar.imagen);
              setOriginalImg(juegoEditar.imagen);
            }
            setCargado(true);
          } catch (error) {
            console.log("Error cargando datos:", error);
          }
        };
    
        cargarDatos();
      }, [id]);
    
    // Función para manejar los alertas
    const agregarAlerta = (input, msg) => {
        setAlertas(prevAlertas => ({
            ...prevAlertas,
            [input]: msg,
        }));
    }

    // Función para manejar la info del nombre
    const handleInputNombre = async () => {
        agregarAlerta('nombre', '');

        if(nombre === ''){
            agregarAlerta('nombre', 'Debes ingresar un nombre');
        }else{
            const existeJuego = await buscarJuego(nombre);
            if(existeJuego) agregarAlerta('nombre', 'Ya existe un juego con este nombre');
        }
    }

    // Función para manejar la info de la descripción
    const handleInputDescripcion = () => {
        agregarAlerta('descripcion', '');

        if(descripcion === '') agregarAlerta('descripcion', 'Debes ingresar una descripción');        
    }

    // Función para manejar la info del género
    const handleInputGenero = () => {
        agregarAlerta('id_genero', '');

        if(id_genero === '') agregarAlerta('id_genero', 'Debes seleccionar un género');
    }

    // Función para manejar la info del precio
    const handleInputPrecio = () => {
        agregarAlerta('precio', '');

        if(precio < 0) agregarAlerta('precio', 'Debes ingresar un precio correcto');
    }

    // TODO: revisar bien esta función (asignar o no asiganar -> setImagen(originalImg) ??)
    const handleImagen = (e) => {
        agregarAlerta('imagen', '');
        setImagen(null);
        setImagenPreview(null);
        const selectedImg = e.target.files[0];
        if(selectedImg) {
            console.log("Imágen seleccionada");
            const reader = new FileReader();
            reader.onload = () => {
                setImagenPreview(reader.result);
            }
            reader.readAsDataURL(selectedImg);

            setImagen(selectedImg);
        }else{
            console.log("Se guarda imagen anterior");
            setImagen(originalImg)
        }
    }

    // Valida si el el botón de "agregar" está o no habilitado
    useEffect(() => {
        validarSubmitBtn();
    }, [nombre, descripcion, id_genero, precio, imagen])

    const validarSubmitBtn = () => {
        setSubmitBtn(true);
        if(nombre !== '' && descripcion !== '' && id_genero !== '' && precio >= 0 && imagen !== null){
            setSubmitBtn(false);
        }
    }

    // Submit del form
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Si el botón de enviar está habilitado (disabled = false)
        
        if(!submitBtn){
            // Seleccionamos la fecha actual como fecha de lanzamiento
            const lanzamiento = obtenerFechaActual();
            try {
                console.log(imagen);
                await editarJuego({id, nombre, descripcion, id_genero, id_desarrollador, lanzamiento, precio, imagen});
                agregarAlerta('success', 'Juego editado Correctamente');
            } catch (error) {
                console.log(error)
            }
        }

    }
    
    if(!cargado){
        // Agregar Spinner
        
            console.log("Cargando...");
        
    }else{
        return (
            <div className="max-w-2xl mx-auto p-6 bg-slate-900 rounded-lg shadow-xl">
                <h1 className="text-center text-3xl text-slate-200 font-bold mb-6">Editar Juego</h1>

                {alertas.success && (
                    <p className="bg-blue-200 text-center mt-4 mb-4 text-blue-800 uppercase font-bold rounded p-2 shadow-md">
                        {alertas.success}
                    </p>
                )}

                <form onSubmit={handleSubmit}>
                    {/* Nombre */}
                    <div className="mb-6">
                        <label htmlFor="nombre" className="block text-sm font-medium text-gray-300 mb-2">
                            Nombre
                        </label>
                        <input
                            onChange={e => setNombre(e.target.value)}
                            onBlur={handleInputNombre}
                            value={nombre}
                            type="text"
                            id="nombre"
                            name="nombre"
                            placeholder="Ingresa el nombre de tu juego"
                            className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-slate-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                        />
                        {alertas.nombre && <p className="text-sm text-red-500 mt-1">{alertas.nombre}</p>}
                    </div>

                    {/* Descripción */}
                    <div className="mb-6">
                        <label htmlFor="descripcion" className="block text-sm font-medium text-gray-300 mb-2">
                            Descripción
                        </label>
                        <input
                            onChange={e => setDescripcion(e.target.value)}
                            onBlur={handleInputDescripcion}
                            value={descripcion}
                            type="text"
                            id="descripcion"
                            name="descripcion"
                            placeholder="Ingresa la descripción de tu juego"
                            className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-slate-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                        />
                        {alertas.descripcion && <p className="text-sm text-red-500 mt-1">{alertas.descripcion}</p>}
                    </div>

                    {/* Género */}
                    <div className="mb-6">
                        <label htmlFor="genero" className="block text-sm font-medium text-gray-300 mb-2">
                            Género
                        </label>
                        <select
                            id="genero"
                            value={id_genero}
                            onChange={e => setId_genero(Number(e.target.value))}
                            onBlur={handleInputGenero}
                            className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-slate-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                        >
                            <option value="" disabled>Selecciona el género</option>
                            {Object.entries(generos).map(([id, genero]) => (
                                <option key={id} value={id}>
                                    {genero}
                                </option>
                            ))}
                        </select>
                        {alertas.id_genero && <p className="text-sm text-red-500 mt-1">{alertas.id_genero}</p>}
                    </div>

                    {/* Precio */}
                    <div className="mb-6">
                        <label htmlFor="precio" className="block text-sm font-medium text-gray-300 mb-2">
                            Precio
                        </label>
                        <input
                            onChange={e => setPrecio(e.target.value)}
                            onBlur={handleInputPrecio}
                            value={precio}
                            type="number"
                            id="precio"
                            name="precio"
                            placeholder="Ingresa el precio de tu juego"
                            className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-slate-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                        />
                        {alertas.precio && <p className="text-sm text-red-500 mt-1">{alertas.precio}</p>}
                    </div>

                    {/* Imagen */}
                    <div className="mb-6">
                        <label htmlFor="imagen" className="block text-sm font-medium text-gray-300 mb-2">
                            Imagen
                        </label>
                        <input
                            ref={imagenRef}
                            onChange={handleImagen}
                            type="file"
                            id="imagen"
                            name="imagen"
                            placeholder="Selecciona una imagen"
                            // className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-slate-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                        />
                        {alertas.imagen && <p className="text-sm text-red-500 mt-1">{alertas.imagen}</p>}
                    </div>

                    {/* Previsualizar Imágen */}
                    <div>
                        <h3>Vista previa de la imagen:</h3>
                        <img src={imagenPreview ? imagenPreview : `http://localhost:4000/uploads/${imagen}`} alt="Vista previa" style={{ width: '600px', height: 'auto' }} />
                    </div>

                    <button
                        type="submit"
                        className={`w-full px-6 py-3 mt-4 rounded-lg font-semibold transition-all duration-300 ${submitBtn ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
                        disabled={submitBtn}
                    >
                        Guardar
                    </button>
                </form>
            </div>


        )
    }
}

export default AgregarJuego;
