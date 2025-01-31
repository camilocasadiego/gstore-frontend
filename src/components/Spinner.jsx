// Spinner de carga
import { FaSpinner } from "react-icons/fa";

export const Spinner = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
        <FaSpinner className="text-5xl animate-spin text-blue-500" />
    </div>
  )
}
