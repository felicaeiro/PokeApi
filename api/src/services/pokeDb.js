const { Pokemon, Type } = require('../db');

getPokemonsFromDB = async () => {
  const allPokemons = await Pokemon.findAll({
    attributes: ['name'],
    include: {
      model: Type,
      as: 'types',
      attributes: ['name'],
      through: { attributes: [] },
    },
  }).catch((error) => {
    error.status = 503;
    error.message = 'Unable to get Pokemons';
    throw error;
  });

  return allPokemons.map((data) => data.get({ plain: true }));
};

getPokemonByIdFromDb = async (id) => {
  return await Pokemon.findByPk(id).catch((error) => {
    error.status = 404;
    error.message = `The id doesn't belong to any Pokemon`;
    throw error;
  });
};

createPokemon = async (pokemonCreate) => {
  let { name, types, life, attack, defense, speed, height, weight } =
    pokemonCreate;
  if (
    !name ||
    !types ||
    !life ||
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
    life,
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
  const result = await Pokemon.findOne({
    where: { name },
    include: {
      model: Type,
      as: 'types',
      attributes: ['name'],
      through: { attributes: [] },
    },
  });
  return result;
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
