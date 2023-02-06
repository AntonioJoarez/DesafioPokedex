import { create } from "zustand";

interface PokemonsState {
  pokemons: any[];
  pokemonsFilterBySearch: any[];
  page: number;
  offset: number;
  handleBack: boolean;
  setPokemons: (data: any[]) => void;
  setPokemonsFilterBySearch: (data: any[]) => void;
  updatePage: (newAccessor: number) => void;
  setOffset: () => void;
  setHandleBack: (isBack: boolean) => void;
}

const usePokemonsStore = create<PokemonsState>((set) => ({
  pokemons: [],
  pokemonsFilterBySearch: [],
  page: 15,
  offset: 0,
  handleBack: false,
  setPokemons: (data) =>
    set((state) => ({ pokemons: [...state.pokemons, ...data] })),
  setPokemonsFilterBySearch: (data) =>
    set(() => ({
      pokemonsFilterBySearch: [...data],
    })),
  updatePage: (newPage) => set((state) => ({ page: state.page + newPage })),
  setOffset: () => set((state) => ({ offset: state.page })),
  setHandleBack: (isBack) => set((state) => ({ handleBack: isBack })),
}));

export default usePokemonsStore;
