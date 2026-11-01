import "./App.css";
import PokemonCard from "./components/PokemonCard";
import pokemons from "./data/pokemons";
import { useState, useRef } from "react";
import PokemonDetail from "./components/PokemonDetail";



function App() {
  //1. STATE
  const [selectedPokemon, setSelectedPokemon] = useState(pokemons[1]);
  const [selectedType, setSelectedType] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [favourites, setFavourites] = useState([]);
  const detailRef = useRef(null);
  
  // 2. AVAILABLE POKEMON TYPES
  const types = ["All", ...new Set(pokemons.map((pokemon) => pokemon.type))];


  // 3. FILTER POKEMON BY TYPE AND NAME
  const filteredPokemons = pokemons.filter((pokemon) => {
    return (
      (selectedType === "All" || pokemon.type === selectedType)
      &&
      (pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  });

// 4. DISPLAYED POKEMON
  const displayedPokemon =
    filteredPokemons.find((pokemon) => pokemon.id === selectedPokemon.id) ??
    filteredPokemons[0];


  // 5. ADD OR REMOVE A FAVOURITE
  const toggleFavourite = (pokemonId) => {
    if (favourites.includes(pokemonId)) {
      // REMOVE
      const updatedFavourites = favourites.filter((id) => {
    return id !== pokemonId;
  });

  setFavourites(updatedFavourites);
    } else { 
      // ADD
      const updatedFavourites = [...favourites, pokemonId];

      setFavourites(updatedFavourites);
    }
  };
  

// 6. HANDLE POKEMON SELECT
const handlePokemonSelect = (pokemon) => {
  setSelectedPokemon(pokemon);

  if (window.matchMedia("(max-width: 600px)").matches) {
    detailRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};


  
  return (
    <>
      <header className="page-header">
        <a className="back-link" href="/D3_Course/">
          ← Back to the Sketchbook
        </a>
        <p className="page-eyebrow"> POKEDEX </p>
        <h1> The Pokemon Collection </h1>
        <p className="page-subtitle"> Twenty Pokemon. Ten types.</p>
      </header>

      <input
        className="pokemon-search"
        type="text"
        placeholder="Search Pokemon..."
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />

      <div className="type-filters">
        {types.map((type) => {
          return (
            <button
              className={
                type === selectedType
                  ? `type-filter active type-${type.toLowerCase()}`
                  : "type-filter"
              }
              key={type}
              onClick={() => setSelectedType(type)}
            >
              {" "}
              {type}{" "}
            </button>
          );
        })}
      </div>

      <div className="collection-layout">
        <div className="collection-gallery">
          <p className="section-label">01 / THE COLLECTION </p>
          <div className="pokemon-grid">
            {filteredPokemons.length === 0 ? (
              <p> No Pokemon found </p>
            ) : (
              filteredPokemons.map((pokemon) => {
                return (
                  <PokemonCard
                    key={pokemon.id}
                    pokemon={pokemon}
                    onSelect={handlePokemonSelect}
                    isSelected={pokemon.id === displayedPokemon?.id}
                    isFavourite={favourites.includes(pokemon.id)}
                    onToggleFavourite={toggleFavourite}
                  />
                );
              })
            )}
          </div>
        </div>

        <div className="pokemon-detail" ref={detailRef}>
          <p className="section-label"> 02/ SPECIMEN DETAIL </p>
          {displayedPokemon ? (
            <PokemonDetail pokemon={displayedPokemon} />
          ) : (
            <p> No pokemon matches your search.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default App;

