const { Pokemon, Type } = require('../db');

const includeTypes = {
  include: {
    model: Type,
    as: 'types',
    attributes: ['name'],
    through: { attributes: [] },
  },
};

const fixTypes = (pokemon) => {
  pokemon = pokemon.get({ plain: true });
  pokemon.types = pokemon.types.map((t) => t.name);
  return pokemon;
};

const getPokemonsFromDB = async () => {
  let allPokemons = await Pokemon.findAll({
    ...includeTypes,
  }).catch((error) => {
    error.status = 503;
    error.message = 'Unable to get Pokémons from DB';
    throw error;
  });

  return allPokemons.map((x) => fixTypes(x));
};

const getPokemonByIdFromDb = async (id) => {
  const pokeById = await Pokemon.findByPk(id, includeTypes).catch((error) => {
    error.status = 404;
    error.message = `The id doesn't belong to any Pokémon`;
    throw error;
  });

  return fixTypes(pokeById);
};

const createPokemon = async (pokemonCreate) => {
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
    error.message = 'Unable to create Pokémon';
    throw error;
  });

  const type = await getTypesFromDb(types);

  await newPoke.addType(type).catch((error) => {
    error.status = 503;
    error.message = 'Unable to add type to Pokémon';
    throw error;
  });

  name = name.toLowerCase();
  let result = await Pokemon.findOne({
    where: { name },
    ...includeTypes,
  });

  return fixTypes(result);
};

const getTypesFromDb = async (type) => {
  const condition = type ? { where: { name: type } } : {};

  const types = await Type.findAll(condition).catch((error) => {
    error.status = 503;
    error.message = 'Unable to get Pokémon types';
    throw error;
  });
  return types;
};

const createTypes = async (types) => {
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

const updatePokemonInDb = async (pokemonUpdate) => {
  const pokeToUpdate = await Pokemon.findByPk(pokemonUpdate.id);
  await pokeToUpdate.update(pokemonUpdate);
  if (pokemonUpdate.types) {
    const types = await Type.findAll({ where: { name: pokemonUpdate.types } });
    await pokeToUpdate.setTypes(types);
  }

  return await getPokemonByIdFromDb(pokemonUpdate.id);
};

const deletePokemonFrokmDb = async (id) => {
  await Pokemon.destroy({ where: { id } }).catch((error) => {
    error.status = 503;
    error.message = 'Unable to get delete Pokémon';
    throw error;
  });
  return id;
};

module.exports = {
  getPokemonsFromDB,
  getPokemonByIdFromDb,
  createPokemon,
  getTypesFromDb,
  createTypes,
  updatePokemonInDb,
  deletePokemonFrokmDb,
};
