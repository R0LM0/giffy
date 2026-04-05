import React, { useState, useCallback } from 'react';

const Context = React.createContext({});

export function GifsContextProvider({ children }) {
  const [gifs, setGifsState] = useState([]);

  const setGifs = useCallback((newGifs) => {
    setGifsState(newGifs);
    // Guardar en localStorage para acceso rápido
    if (newGifs && newGifs.length > 0) {
      localStorage.setItem('lastGifs', JSON.stringify(newGifs.slice(0, 20)));
    }
  }, []);

  return (
    <Context.Provider value={{ gifs, setGifs }}>{children}</Context.Provider>
  );
}

export default Context;