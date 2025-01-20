export const existeJuego = (arr, id) => {
    return arr.some((juego) => juego.id === Number(id));
  }