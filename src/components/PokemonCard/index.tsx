import axios from "axios";
import React, { useContext } from "react";
import usePokemonsTeamStore from "../../store/pokemonsTeam";
import { Heart } from "phosphor-react";
import "/src/styles/pokemonCardStyle.css";
import { PokemonsContext } from "../../contexts/PokemonsContext";
import { useNavigate } from "react-router-dom";

type PokemonCardProps = {
  name: string;
  index: number;
  image: string;
  types: string[];
  data: any;
};

export const PokemonCard = ({
  name,
  index,
  image,
  types,
  data,
}: PokemonCardProps) => {
  const { setColorPokemon, setEvolutionUrl, setIdPokemon }: any =
    useContext(PokemonsContext);
  const pokemonsTeam = usePokemonsTeamStore();
  const navigate = useNavigate();
  async function handlePokemon() {
    await axios
      .get(`https://pokeapi.co/api/v2/pokemon-species/${name}`)
      .then(({ data }) => {
        setColorPokemon(data.color.name);
        setEvolutionUrl(data.evolution_chain.url);
        setIdPokemon(data.id);
        navigate("/pokemon");
      })
      .catch((e) => console.log(e));
  }

  function buttonIsDisabled() {
    const teamIncludesAtPokemon = pokemonsTeam.team.includes(data);
    return pokemonsTeam.team.length >= 5 && !teamIncludesAtPokemon;
  }
  function handleFavoritePokemon() {
    const disabled = buttonIsDisabled();
    if (disabled) return;
    if (pokemonsTeam.team.includes(data)) {
      pokemonsTeam.removePokemonThisTeam(data);
      return;
    }
    pokemonsTeam.setTeam(data);
  }

  return (
    <>
      <div className="pokemonCardContainer" >
        <div className="pokemonCard" onClick={handlePokemon}>
          <div className="background">
            <div className="zoom">
              <img src={image} alt="" />
            </div>
          </div>
        </div>
        <div className="content">
          <h1 className="pokemonName">{name}</h1>
          <div className="favorite">
            {pokemonsTeam.team.includes(data) ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Heart
                  size={42}
                  weight="fill"
                  color={buttonIsDisabled() ? "#1d4ad1" : "#1d4ad1"}
                  onClick={handleFavoritePokemon}
                  style={{
                    cursor: buttonIsDisabled() ? "not-allowed" : "pointer",
                  }}
                />
                <span className="favoriteText">unfavorite</span>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Heart
                  size={42}
                  color={buttonIsDisabled() ? "#1d4ad1" : "#1d4ad1"}
                  onClick={handleFavoritePokemon}
                  style={{
                    cursor: buttonIsDisabled() ? "not-allowed" : "pointer",
                  }}
                />
                <span className="favoriteText">favorite</span>
              </div>
            )}
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            {types.map((type: any) => (
              <span className="pokemonType" key={type + index}>
                {type}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
