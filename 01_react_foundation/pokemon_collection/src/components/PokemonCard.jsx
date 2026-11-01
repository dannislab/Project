
const PokemonCard = ({pokemon, onSelect, isSelected, isFavourite, onToggleFavourite}) => {
    return (
      <div
        className={isSelected ? "pokemon-card selected" : "pokemon-card"}
        onClick={() => onSelect(pokemon)}
      >
        {/* ADD THE HEART BUTTON HERE */}
        <button
          type="button"
          className={
            isFavourite ? "favourite-button active" : "favourite-button"
          }
          onClick={(event) => {
            event.stopPropagation();
            onToggleFavourite(pokemon.id);
          }}
        >
          {isFavourite ? "♥" : "♡"}
        </button>

        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
          alt={pokemon.name}
        />
        <p className="pokemon-number">
          {" "}
          #{String(pokemon.id).padStart(3, "0")}{" "}
        </p>
        <h2> {pokemon.name} </h2>
        <p className={`pokemon-type type-${pokemon.type.toLowerCase()}`}>
          {" "}
          {pokemon.type}{" "}
        </p>
      </div>
    );

}

export default PokemonCard;