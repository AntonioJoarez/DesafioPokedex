import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PokemonsContext } from "../../contexts/PokemonsContext";
import usePokemonsStore from "../../store/pokemons";
import "/src/styles/pokemonDetailsStyle.css";
import "/src/styles/buttonsStyles.css";

export const PokemonsDetails = () => {
  const [evolutionResponse, setEvolutionResponse] = useState();
  const { colorPokemon, evolutionUrl, idPokemon }: any =
    useContext(PokemonsContext);
  const navigate = useNavigate();
  const pokemonsStore = usePokemonsStore();
  const data: any = pokemonsStore.pokemons.filter(
    (value) => value.id === idPokemon
  )[0];
  useEffect(() => {
    axios
      .get(evolutionUrl)
      .then(({ dataEvolution }: any) => setEvolutionResponse(dataEvolution))
      .catch((e: any) => console.log(e));
  }, []);
  function handleBack() {
    pokemonsStore.setHandleBack(true);
    navigate("/");
  }
  return (
    <>
      <div className="pokemonCardContainerDetails" >
        <div className="pokemonCardDetails">
          <div className="backgroundDetails">
            <button className="buttonBack" onClick={handleBack}>Voltar</button>
            <div className="zoomDetails">
              <img src={data.image} alt="" />
              <h1 className="pokemonNameDetails">{data.name}</h1>
            <h2>weight: {data.weight}</h2>
             {data.stats.map((value: any) => (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <h2>{value.stat.name}</h2>
              <h3>base:{value.base_stat}</h3>
              <h3>effort:{value.effort}</h3>
            </div>
          ))}
            </div>
          </div>
        </div>
      
        </div>
    </>
  );
};
