const PokemonDetail = ({ pokemon }) => {
  // Display the Pokémon's details here
  return (
    <div className="detail-panel">
      <div className="detail-meta">
        <p className="detail-number">
          {" "}
          #{String(pokemon.id).padStart(3, "0")}{" "}
        </p>
        <span className={`pokemon-type type-${pokemon.type.toLowerCase()}`}>
          {" "}
          {pokemon.type}{" "}
        </span>
      </div>

      <img
        className="detail-artwork"
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
        alt={pokemon.name}
      />

      <div className="detail-content">
        <h2 className="detail-name"> {pokemon.name} </h2>

        <p className="detail-description">{pokemon.description}</p>

        <div className="detail-stats">
          <div className="stat-row">
            <span>HP</span>
            <div className="stat-track">
              <div
                className="stat-fill"
                style={{ width: `${(pokemon.hp / 150) * 100}%` }}
              />
            </div>
            <span> {pokemon.hp}</span>
          </div>

          <div className="stat-row">
            <span>Attack</span>
            <div className="stat-track">
              <div
                className="stat-fill"
                style={{ width: `${(pokemon.attack / 150) * 100}%` }}
              />
            </div>
            <span>{pokemon.attack}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
