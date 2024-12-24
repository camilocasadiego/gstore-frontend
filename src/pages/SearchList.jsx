import { useNavigate } from 'react-router-dom';
import imagen_prueba from '../assets/images/img_1.jpg'
import { formatearPrecio } from '../helpers/formatearPrecio';
import { useState } from 'react';
import useJuegos from '../hooks/useJuegos';

export const SearchList = ({juego}) => {

    const {id, nombre, precio} = juego;
    const navigate = useNavigate();
    
    const handleClick = () => {
        navigate(`/juegos/${id}`)
    }

    return (
        <div 
        onClick={handleClick}
        className="cursor-pointer hover:bg-slate-600 hover:rounded-xl flex items-center">
        <img 
            src={imagen_prueba} 
            alt="Imagen del juego" 
            className="w-20 h-16 object-cover rounded-lg shadow-lg m-2"
            />
        <div>
            <h1 className=''>{nombre}</h1> 
        </div>
    </div>
    )
    
}
