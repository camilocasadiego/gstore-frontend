// import { useEffect, useState } from 'react';
// // import useJuegos from '../hooks/useJuegos';

// export const Paginacion = (infoPaginacion) => {

//     // FALTA QUE EL BOTON EN EL QUE SE ENCUENTRA LA PÁGINA NO SE PUEDA VOLVER A CLICKEAR Y
//     // QUE SE PUEDA DIFERENCIAR ENTRE LOS BOTONES HABILITADOS Y NO HABILITADOS
//     // Organizar el componente que muestra los juegos para que al cambiar de página no se mueva el paginador.
    

//     const {numPaginas} = infoPaginacion;
//     // const {page, setPage} = useJuegos();
//     const [paginador, setPaginador] = useState();
    
//     // Estas función controla el evento click en los botones "Previous" y "Next" del paginador
//     const changePage = (e) => {
//         // La función setea el url de la API que debe visitar para cambiar de página
//         if(page > 1 && e.target.id === 'previousButton'){
//             setPage(page-1)
//         }
        
//         // Lógica para el botón Next
//         if(page < numPaginas && e.target.id === 'nextButton'){
//             setPage(page+1)
//         }
        
//         if(e.target.id === 'pagIndex'){
//             setPage(Number(e.target.textContent));
//         }
//     }

//     const limitPagination = 3;


//     const cargarPaginador = (startPage, endsPage) => {
//         console.log("Page:", page);
        

//         const elementos = [];
//         console.log("numPaginas:", numPaginas);

//         if(page >= endsPage && page < numPaginas){
//             console.log("aumento")
//             startPage = startPage + 1;
//             endsPage = endsPage + 1;
//         }
        
//         // if(page === startPage && startPage > 1){
//         //     console.log("disminución")
//         //     startPage = startPage - 1
//         //     endsPage = endsPage - 1
//         // }
        
//         console.log("Inicio:", startPage);
//         console.log("Fin:", endsPage);

//         for (let index = startPage; index < endsPage; index++) {
//             elementos.push(
//                 <li key={index}>
//                     <a 
//                         onClick={() => changePage(index + startPage)} 
//                         id="pagIndex"
//                         className="cursor-pointer flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
//                     >
//                         {index + 1}
//                     </a>
//                 </li>
//             );
//         }
//         setPaginador(elementos);  
//         console.log("------------------------")
//     }

//     useEffect( () => {
//         let startPage = 0;
//         let endsPage = limitPagination;
//         cargarPaginador(startPage, endsPage);
//     }, []);

//     // Este useEffecto habilita o deshabilita los botones "Previous" y "Next" por medio de clases de TailwindCSS
//     useEffect( () => {
//         const prvBoton = document.getElementById("previousButton");
//         const nxtBoton = document.getElementById("nextButton");
        
//         if(page <= 1 && prvBoton.id === "previousButton"){
//             prvBoton.classList.add('pointer-events-none')
//         }else{
//             prvBoton.classList.remove('pointer-events-none')
//         } 

//         if(page >= numPaginas && nxtBoton.id === "nextButton"){
//             nxtBoton.classList.add('pointer-events-none')
//         }else{
//             nxtBoton.classList.remove('pointer-events-none')
//         } 

//         cargarPaginador();       

//     }, [page]);

//     return (
//         <div className="mx-auto w-1/2">    
//             <nav aria-label="Page navigation example">
//                 <ul className="inline-flex -space-x-px text-base h-10">
                    
//                     <li>
//                         <a 
//                             onClick={changePage} 
//                             id="previousButton" 
//                             // href={url} 
//                             className="cursor-pointer flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
//                         >Previous</a>
//                     </li>

//                     {paginador}              

//                     <li>
//                         <a 
//                             onClick={changePage} 
//                             id={"nextButton"} 
//                             // href={url} 
//                             className={"cursor-pointer flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"}
//                         >Next</a>
//                     </li>
//                 </ul>
//             </nav>
//         </div>
//     )
// }
