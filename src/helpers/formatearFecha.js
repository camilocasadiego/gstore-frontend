export const formatearFecha = (fecha) => {
    const arrFecha = fecha.split('-');
    const fechaFormateada = `${arrFecha[1]}/${arrFecha[2]}/${arrFecha[0]}` 
    return fechaFormateada;
}