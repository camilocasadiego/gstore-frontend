import { useContext } from "react"
import DesarrolladorContext from "../context/DesarrolladorProvider";

const useDesarrollador = () => {
    return useContext(DesarrolladorContext);
}

export default useDesarrollador;