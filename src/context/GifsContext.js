import React, { useState, useCallback } from 'react';

const Context = React.createContext({});

export function GifsContextProvider({ children }) {
  const [gifs, setGifsState] = useState([]);

  const setGifs = useCallback((newGifs) => {
    // Manejar caso cuando newGifs es una función (functional update)
    if (typeof newGifs === 'function') {
      setGifsState((prevGifs) => {
        const result = newGifs(prevGifs);
        // Guardar en localStorage para acceso rápido
        if (Array.isArray(result) && result.length > 0) {
          localStorage.setItem('lastGifs', JSON.stringify(result.slice(0, 20)));
        }
        return result;
      });
    } else {
      // newGifs es un array directo
      setGifsState(newGifs);
      if (Array.isArray(newGifs) && newGifs.length > 0) {
        localStorage.setItem('lastGifs', JSON.stringify(newGifs.slice(0, 20)));
      }
    }
  }, []);

  return (
    <Context.Provider value={{ gifs, setGifs }}>{children}</Context.Provider>
  );
}

export default Context;