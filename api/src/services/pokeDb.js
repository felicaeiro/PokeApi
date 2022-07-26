const { Pokemon, Type } = require('../db');
const {
  validatePokemonParameters,
} = require('../validators/validateNewPokemon');

const includeTypes = {
  include: {
    model: Type,
    as: 'types',
    attributes: ['name'],
    through: { attributes: [] },
  },
};

fixTypes = (pokemon) => {
  pokemon = pokemon.get({ plain: true });
  pokemon.types = pokemon.types.map((t) => t.name);
  return pokemon;
};

getPokemonsFromDB = async () => {
  let allPokemons = await Pokemon.findAll(includeTypes).catch((error) => {
    error.status = 503;
    error.message = 'Unable to get Pokemons';
    throw error;
  });

  return allPokemons.map((x) => fixTypes(x));
};

getPokemonByIdFromDb = async (id) => {
  id = id.toUpperCase();
  let pokeById = await Pokemon.findByPk(id, includeTypes).catch((error) => {
    error.status = 404;
    error.message = `The id doesn't belong to any Pokemon`;
    throw error;
  });

  return fixTypes(pokeById);
};

createPokemon = async (pokemonCreate) => {
  let { name, types, hp, attack, defense, speed, height, weight } =
    pokemonCreate;
  console.log(pokemonCreate);
  if (
    !name ||
    !types ||
    !hp ||
    !attack ||
    !defense ||
    !speed ||
    !height ||
    !weight
  ) {
    const error = new Error('Missing parameters to create Pokemon');
    error.status = 422;
    throw error;
  }
  const type = await Type.findAll({ where: { name: types } });

  if (type.length === 0) {
    const error = new Error('Invalid Pokemon type');
    error.status = 404;
    throw error;
  }

  const newPoke = await Pokemon.create({
    name,
    hp,
    attack,
    defense,
    speed,
    height,
    weight,
  }).catch((error) => {
    error.status = 503;
    error.message = 'Unable to create Pokemon';
    throw error;
  });

  await newPoke.addType(type);

  name = name.toLowerCase();
  let result = await Pokemon.findOne({
    where: { name },
    ...includeTypes,
  });

  return fixTypes(result);
};

getTypesFromDb = async () => {
  const types = await Type.findAll().catch((error) => {
    error.status = 503;
    error.message = 'Unable to get Pokemon types';
    throw error;
  });
  return types.map((x) => x.get({ plain: true }));
};

createTypes = async (types) => {
  const createdTypes = await Promise.all(
    types.map(async (x) => {
      return await Type.create({ name: x.name });
    })
  );
  return createdTypes.map((x) => x.get({ plain: true }));
};

module.exports = {
  getPokemonsFromDB,
  getPokemonByIdFromDb,
  createPokemon,
  getTypesFromDb,
  createTypes,
};
