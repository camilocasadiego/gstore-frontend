export const Alerta = ({tipo, msg}) => {
  return ( 
        <div className={`
            p-4 mb-4 rounded-lg text-white text-center uppercase font-bold
            ${tipo
              ? 'from-indigo-400 to-indigo-600'
              : 'from-red-400 to-red-600'} bg-gradient-to-tr
          `}>
            {msg}
          </div>
    );
}
 
export default Alerta;