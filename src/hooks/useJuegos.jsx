import { useContext } from "react"
import JuegosContext from "../context/JuegosProvider";

const useJuegos = () => {
    return useContext(JuegosContext);
}

export default useJuegos;