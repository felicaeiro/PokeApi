const { Pokemon, Type } = require('../db');

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
  let allPokemons = await Pokemon.findAll({
    attributes: ['id', 'name', 'attack'],
    ...includeTypes,
  }).catch((error) => {
    error.status = 503;
    error.message = 'Unable to get Pokemons from DB';
    throw error;
  });

  return allPokemons.map((x) => fixTypes(x));
};

getPokemonByIdFromDb = async (id) => {
  const pokeById = await Pokemon.findByPk(id, includeTypes).catch((error) => {
    error.status = 404;
    error.message = `The id doesn't belong to any Pokemon`;
    throw error;
  });

  return fixTypes(pokeById);
};

createPokemon = async (pokemonCreate) => {
  let {
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

  const type = await Type.findAll({ where: { name: types } });

  if (!type.length) {
    const error = new Error('Invalid Pokemon type');
    error.status = 404;
    throw error;
  }

  const newPoke = await Pokemon.create({
    name,
    hp,
    attack,
    specialAttack,
    defense,
    specialDefense,
    speed,
    height,
    weight,
  }).catch((error) => {
    error.status = 503;
    error.message = 'Unable to create Pokemon';
    throw error;
  });

  await newPoke.addType(type);

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
  return types;
};

createTypes = async (types) => {
  const createdTypes = await Promise.all(
    types.map((x) => {
      return Type.create({ name: x.name });
    })
  ).catch((error) => {
    error.status = 503;
    error.message = 'Unable to create Types';
    throw error;
  });
  return createdTypes;
};

module.exports = {
  getPokemonsFromDB,
  getPokemonByIdFromDb,
  createPokemon,
  getTypesFromDb,
  createTypes,
};
