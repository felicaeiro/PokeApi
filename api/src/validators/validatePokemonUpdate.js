const { getPokemonsFromAPI } = require('../services/pokeApi');
const {
  getPokemonsFromDB,
  getTypesFromDb,
  getPokemonByIdFromDb,
} = require('../services/pokeDb');

const validatePokemonUpdate = async (pokemonCreate) => {
  const errors = {};
  const {
    id,
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

  const idValidation = await validateId(id);
  if (idValidation.length) errors.id = idValidation;

  if (name) {
    const nameValidation = await validateName(name);
    if (nameValidation.length) errors.name = nameValidation;
  }
  if (types) {
    const typesValidation = await validateTypes(types);
    if (typesValidation.length) errors.types = typesValidation;
  }
  const statsValidation = validateStats(
    hp,
    attack,
    specialAttack,
    defense,
    specialDefense,
    speed
  );
  if (statsValidation.length) errors.stats = statsValidation;
  if (weight) {
    const weightValidation = validateWeight(weight);
    if (weightValidation.length) errors.weight = weightValidation;
  }
  if (height) {
    const heightValidation = validateHeight(height);
    if (heightValidation.length) errors.height = heightValidation;
  }
  if (Object.keys(errors).length) return errors;
  else return false;
};

const validateId = async (id) => {
  const errors = [];
  if (!id) errors.push('A Pokémons id is required to update');

  const pokeToUpdate = await getPokemonByIdFromDb(id);
  if (!Object.keys(pokeToUpdate).length)
    errors.push(`The Pokémon doesn't exist`);

  return errors;
};

const validateName = async (name) => {
  const errors = [];

  if (!/^[A-Z\-]+$/gi.test(name)) errors.push('The name can only have letters');

  if (name.length > 10 || name.length < 3)
    errors.push(`The name should be 3-10 characters.`);

  const pokemonsFromApi = await getPokemonsFromAPI();
  const pokemonsFromDb = await getPokemonsFromDB();

  const allPokemon = [...pokemonsFromApi, ...pokemonsFromDb];
  const nameValidation = allPokemon.filter((p) => p.name === name);
  if (nameValidation.length)
    errors.push(`There's already a Pokémon with that name`);

  return errors;
};

const validateTypes = async (types) => {
  const errors = [];

  if (types.length > 2) errors.push('You can only add up to two types');

  const typesValidation = await getTypesFromDb(types);
  if (!typesValidation.length) errors.push('Invalid Pokémon type');

  return errors;
};

const validateStats = (
  hp,
  attack,
  specialAttack,
  defense,
  specialDefense,
  speed
) => {
  const errors = [];

  if (hp) {
    if (hp > 255 || hp < 1 || !/^[0-9]+$/gi.test(hp)) {
      errors.push('HP should be between 1 and 255');
    }
  }

  if (attack) {
    if (attack > 200 || attack < 1 || !/^[0-9]+$/gi.test(attack)) {
      errors.push(`Attack should be between 1 and 255`);
    }
  }

  if (specialAttack) {
    if (
      specialAttack > 200 ||
      specialAttack < 1 ||
      !/^[0-9]+$/gi.test(specialAttack)
    ) {
      errors.push(`Special Attack should be between 1 and 255`);
    }
  }

  if (defense) {
    if (defense > 255 || defense < 1 || !/^[0-9]+$/gi.test(defense)) {
      errors.push(`Defense should be between 1 and 255`);
    }
  }

  if (specialDefense) {
    if (
      specialDefense > 255 ||
      specialDefense < 1 ||
      !/^[0-9]+$/gi.test(specialDefense)
    ) {
      errors.push(`Special Defense should be between 1 and 255`);
    }
  }

  if (speed) {
    if (speed > 200 || speed < 1 || !/^[0-9]+$/gi.test(speed)) {
      errors.push(`Speed should be between 1 and 255`);
    }
  }
  return errors;
};

const validateWeight = (weight) => {
  const errors = [];

  if (weight > 1000 || weight < 0.1 || !/^([0-9]*[.])?[0-9]+$/gi.test(weight)) {
    errors.push(`Weight should be between 0.1 kg. and 1000 kg.`);
  }

  return errors;
};

const validateHeight = (height) => {
  const errors = [];

  if (height > 20 || height < 0.1 || !/^([0-9]*[.])?[0-9]+$/gi.test(height)) {
    errors.push(`Height should be between 0.1 m. and 20 m.`);
  }
  return errors;
};

module.exports = {
  validatePokemonUpdate,
};
