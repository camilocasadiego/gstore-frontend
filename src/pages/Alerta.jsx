export const Alerta = ({alerta}) => {
    return ( 
        <div className={`
            p-4 mb-4 rounded-lg text-white text-center uppercase font-bold
            ${alerta.error 
              ? 'from-red-400 to-red-600' 
              : 'from-indigo-400 to-indigo-600'} bg-gradient-to-tr
          `}>
            {alerta.msg}
          </div>
    );
}
 
export default Alerta;