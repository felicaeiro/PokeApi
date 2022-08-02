const { getPokemonsFromAPI } = require('../services/pokeApi');
const { getPokemonsFromDB, getTypesFromDb } = require('../services/pokeDb');

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

  await validateName(name);
  await validateTypes(types);
};

validateName = async (name) => {
  const pokemonsFromApi = await getPokemonsFromAPI();
  const pokemonsFromDb = await getPokemonsFromDB();

  const allPokemon = [...pokemonsFromApi, ...pokemonsFromDb];
  const nameValidation = allPokemon.filter((p) => p.name === name);
  if (nameValidation.length) {
    const error = new Error(`There's already a Pokémon with that name`);
    error.status = 409;
    throw error;
  }
};

validateTypes = async (types) => {
  if (types.length > 2) {
    const error = new Error(' You can only add up to two types');
    error.status = 409;
    throw error;
  }

  const typesValidation = await getTypesFromDb(types);
  if (!typesValidation.length) {
    const error = new Error('Invalid Pokemon type');
    error.status = 404;
    throw error;
  }
};

module.exports = {
  validatePokemonParameters,
};
