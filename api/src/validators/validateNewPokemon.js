const { getPokemonsFromAPI } = require('../services/pokeApi');
const { getPokemonsFromDB } = require('../services/pokeDb');

validatePokemonParameters = async (pokemonCreate) => {
  const {
    name,
    types,
    hp,
    attack,
    specialAttack,
    defense,
    specialDefense,
    speed,
    height,
    weight,
  } = pokemonCreate;

  if (
    !name ||
    !types ||
    !hp ||
    !attack ||
    !specialAttack ||
    !defense ||
    !specialDefense ||
    !speed ||
    !height ||
    !weight
  ) {
    const error = new Error('Missing parameters to create Pokemon');
    error.status = 422;
    throw error;
  }

  const pokemonsFromApi = await getPokemonsFromAPI();
  const pokemonsFromDb = await getPokemonsFromDB();

  const allPokemon = [...pokemonsFromApi, ...pokemonsFromDb];
  const search = allPokemon.filter((p) => p.name === name);
  if (search.length) {
    const error = new Error(`There's already a Pokémon with that name`);
    error.status = 409;
    throw error;
  }
};

module.exports = {
  validatePokemonParameters,
};
