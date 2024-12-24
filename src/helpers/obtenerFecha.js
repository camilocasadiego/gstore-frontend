export const obtenerFechaActual = () => {
    let fechaActual = new Date;
    let anio = fechaActual.getFullYear();
    let mes = String(fechaActual.getMonth() + 1).padStart(2, '0');
    let dia = String(fechaActual.getDate()).padStart(2, '0');
    
    const fechaFormateada = `${anio}-${mes}-${dia}`;
    
    return fechaFormateada;

}    
