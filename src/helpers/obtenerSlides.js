const mobileWidth = 481;
const tabletWidth = 768;
const desktopWidth = 1280;

// Función para calcular el número de slides según el ancho de la ventana
export const obtenerSlides = (width) => {
  if (width <= mobileWidth) return 1;
  if (width <= tabletWidth) return 2;
  if (width <= desktopWidth) return 3;
  return 4;
};