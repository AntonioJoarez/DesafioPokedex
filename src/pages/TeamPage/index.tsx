import { useNavigate } from "react-router-dom";
import { PokemonCard } from "../../components/PokemonCard";
import usePokemonsStore from "../../store/pokemons";
import usePokemonsTeamStore from "../../store/pokemonsTeam";
import "/src/styles/buttonsStyles.css";

export const TeamPage = () => {
  const pokemonstTeamStore = usePokemonsTeamStore();
  const navigate = useNavigate();
  const pokemonsStore = usePokemonsStore();
  function handleBack() {
    pokemonsStore.setHandleBack(true);
    navigate("/");
  }
  return (
    <>
      <button className="buttonBackTeam" onClick={handleBack}>Voltar</button>

      <div className="card-container">
        {pokemonstTeamStore.team?.map((value: any, index: number) => {
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
    </>
  );
};
