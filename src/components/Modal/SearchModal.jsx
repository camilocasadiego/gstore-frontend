import { SearchList } from "../../pages/SearchList";

export const SearchModal = ({juegos}) => {
    
    return (
        <>
            <div className="bg-slate-700 rounded-xl mt-2 sm:w-96 w-[40vh]">
                {juegos.map(juego => (
                    <SearchList
                        key={juego.id}
                        juego={juego}
                    />
                ))}
            </div>
        </>
    )
}

export default SearchModal;