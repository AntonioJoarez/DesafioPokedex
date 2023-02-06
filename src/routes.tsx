import { Route, Routes as RoutesRRD, useLocation } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { PokemonsDetails } from "./pages/PokemonDetails";
import { TeamPage } from "./pages/TeamPage";

export const Routes = () => {
  const location = useLocation();
  return (
    <RoutesRRD key={location.pathname} location={location}>
      <Route path="/" element={<HomePage />} />
      <Route path="/team" element={<TeamPage />} />
      <Route path="/pokemon" element={<PokemonsDetails />} />
    </RoutesRRD>
  );
};
