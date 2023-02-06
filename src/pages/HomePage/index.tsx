import { useNavigate } from "react-router-dom";
import { PokemonCard } from "../../components/PokemonCard";
import { SearchrBar } from "../../components/Search";
import "/src/styles/buttonsStyles.css";
import { useGetInitialPokemons } from "../../services/pokemons";
import usePokemonsStore from "../../store/pokemons";


export const HomePage = () => {
  const { isLoading }: any = useGetInitialPokemons();
  const navigate = useNavigate();
  const pokemonsStore = usePokemonsStore();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleChangeSearch = (e: any) => {
    pokemonsStore.setPokemonsFilterBySearch(
      pokemonsStore.pokemons.filter((value) => {
        const type = value.types.filter((word: any) =>
          word.includes(e.target.value)
        );
        const filterByType = value.types
          .map((value: any) => type.includes(value))
          .includes(true);
        return value.name.includes(e.target.value) || filterByType === true;
      })
    );
  };

  const renderMorePokemons = () => {
    pokemonsStore.setHandleBack(false);
    pokemonsStore.setOffset();
    pokemonsStore.updatePage(15);
  };

  function handleTeamPage() {
    navigate("/team");
  }
  return (
    <>
      <SearchrBar handleChangeSearch={handleChangeSearch} />
      <button onClick={handleTeamPage}>Team</button>
      <div className="card-container">
        {pokemonsStore.pokemonsFilterBySearch
          .slice(0, pokemonsStore.page)
          ?.map((value: any, index: number) => {
            return (
              <PokemonCard
                key={value.name + index}
                name={value.name}
                index={value.id}
                image={value.image}
                types={value.types}
                data={value}
              />
            );
          })}
      </div>
      <button onClick={renderMorePokemons}>Render More</button>
    </>
  );
};
