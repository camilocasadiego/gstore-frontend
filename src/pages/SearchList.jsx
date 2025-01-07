import { useNavigate } from 'react-router-dom';
import imagen_prueba from '../assets/images/img_1.jpg'
const imagenPath = `${import.meta.env.VITE_BACKEND_URL}/uploads`;


export const SearchList = ({juego}) => {

    const {id, nombre, precio, imagen} = juego;
    const navigate = useNavigate();
    
    const handleClick = () => {
        navigate(`/juegos/${id}`)
    }

    return (
        <div 
        onClick={handleClick}
        className="cursor-pointer hover:bg-slate-600 hover:rounded-xl flex items-center">
        <img 
            src={imagen ? `${imagenPath}/${imagen}` : imagen_prueba}
            alt="Imagen del juego" 
            className="w-20 h-16 object-cover rounded-lg shadow-lg m-2"
            />
        <div>
            <h1 className=''>{nombre}</h1> 
        </div>
    </div>
    )
    
}
