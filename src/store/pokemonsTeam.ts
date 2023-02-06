import { create } from "zustand";

interface pokemonsTeamState {
  team: any[];

  setTeam: (data: any[]) => void;
  removePokemonThisTeam: (data: any[]) => void;
}

const usePokemonsTeamStore = create<pokemonsTeamState>((set) => ({
  team: [],
  setTeam: (data) => set((state) => ({ team: [...state.team, data] })),

  removePokemonThisTeam: (data) =>
    set((state) => ({
      team: [...state.team.filter((pokemon: any) => pokemon !== data)],
    })),
}));

export default usePokemonsTeamStore;
("");
