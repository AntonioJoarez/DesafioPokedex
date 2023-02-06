import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PokemonsContext } from "../../contexts/PokemonsContext";
import usePokemonsStore from "../../store/pokemons";
import "/src/styles/pokemonDetailsStyle.css";

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
      <button onClick={handleBack}>Voltar</button>
      <div className="pokemonCardContainerDetails" >
        <div className="pokemonCardDetails">
          <div className="backgroundDetails">
            <div className="zoomDetails">
              <img src={data.image} alt="" />
            </div>
          </div>
        </div>
        <div className="contentDetails">
          <h1 className="pokemonNameDetails">{data.name}</h1>
          <h3>weight: {data.weight}</h3>
          {data.stats.map((value: any) => (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <h3>{value.stat.name}</h3>
              <span>base:{value.base_stat}</span>
              <span>effort:{value.effort}</span>
            </div>
          ))}
          <div style={{ display: "flex", gap: "10px" }}>
          
            
          </div>
        </div>
      </div>
    </>
  );
};
