export const formatearPrecio = (precio) => {
    const precioFormateado = parseFloat(precio).toFixed(2) + " €";
    return precioFormateado;
}