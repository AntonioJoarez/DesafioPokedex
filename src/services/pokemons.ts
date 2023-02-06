import axios from "axios";
import { useEffect, useState } from "react";
import usePokemonsStore from "../store/pokemons";

export const useGetInitialPokemons = () => {
  const pokemonsStore = usePokemonsStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (pokemonsStore.handleBack) {
      setIsLoading(false);
      return;
    }
    (async () => {
      await axios
        .get(
          `https://pokeapi.co/api/v2/pokemon?limit=15&offset=${pokemonsStore.offset}`
        )
        .then(async ({ data }) => {
          let urls = data.results.map((value: any) => value.url);
          let promises = urls.map((url: string) => axios.get(url));

          const results: any = await axios.all(promises);
          const pokemons = results.map((value: any) => {
            let pokemon = value.data;
            return {
              id: pokemon.id,
              name: pokemon.name,
              image: pokemon.sprites.other["official-artwork"].front_default,
              types: pokemon.types.map((type: any) => type.type.name),
              stats: pokemon.stats,
              weight: pokemon.weight,
            };
          });
          pokemonsStore.setPokemons(pokemons);
          pokemonsStore.setPokemonsFilterBySearch([
            ...pokemonsStore.pokemons,
            ...pokemons,
          ]);
        })
        .finally(() => setIsLoading(false));
    })();
  }, [pokemonsStore.page]);

  return { isLoading };
};
