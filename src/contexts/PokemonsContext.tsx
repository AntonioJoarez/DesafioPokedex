import React, { createContext, useState } from "react";

export const PokemonsContext = createContext({});
export const PokemonsProvider = (props: any) => {
  const [colorPokemon, setColorPokemon] = useState();
  const [evolutionUrl, setEvolutionUrl] = useState();
  const [idPokemon, setIdPokemon] = useState();

  return (
    <PokemonsContext.Provider
      value={{
        colorPokemon,
        setColorPokemon,
        evolutionUrl,
        setEvolutionUrl,
        idPokemon,
        setIdPokemon,
      }}
    >
      {props.children}
    </PokemonsContext.Provider>
  );
};
