import { useState, useEffect } from "react";

// Le hook useDebounce permet de retarder l'exécution d'une fonction (par exemple, une requête de recherche) jusqu'à ce que l'utilisateur ait arrêté de taper. 
const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value)
    useEffect(() => {

        const handler = setTimeout(() =>{
            setDebouncedValue(value)
        }, delay)

        return () => {
          clearTimeout(handler)
        }
    }, [value, delay])

    return debouncedValue;
}
export default useDebounce;