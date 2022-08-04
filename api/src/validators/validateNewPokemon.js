const { getPokemonsFromAPI } = require('../services/pokeApi');
const { getPokemonsFromDB, getTypesFromDb } = require('../services/pokeDb');

validatePokemonParameters = async (pokemonCreate) => {
  const errors = {};
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

  const nameValidation = await validateName(name);
  if (nameValidation.length) errors.name = nameValidation;
  const typesValidation = await validateTypes(types);
  if (typesValidation.length) errors.types = typesValidation;
  const statsValidation = validateStats(
    hp,
    attack,
    specialAttack,
    defense,
    specialDefense,
    speed
  );
  if (statsValidation.length) errors.stats = statsValidation;
  const weightValidation = validateWeight(weight);
  if (weightValidation.length) errors.weight = weightValidation;
  const heightValidation = validateHeight(height);
  if (heightValidation.length) errors.height = heightValidation;
  if (Object.keys(errors).length) return errors;
  else return false;
};

validateName = async (name) => {
  const errors = [];
  if (!name) {
    errors.push('Name is required to create Pokémon');
  }
  if (!/^[A-Z\-]+$/gi.test(name)) {
    errors.push('The name can only have letters');
  }
  if (name.length > 10 || name.length < 3) {
    errors.push(`The name should be 3-10 characters.`);
  }

  const pokemonsFromApi = await getPokemonsFromAPI();
  const pokemonsFromDb = await getPokemonsFromDB();

  const allPokemon = [...pokemonsFromApi, ...pokemonsFromDb];
  const nameValidation = allPokemon.filter((p) => p.name === name);
  if (nameValidation.length) {
    errors.push(`There's already a Pokémon with that name`);
  }
  return errors;
};

validateTypes = async (types) => {
  const errors = [];
  if (!types) {
    errors.push('Types is required to create Pokémon');
  }
  if (types.length > 2) {
    errors.push('You can only add up to two types');
  }

  const typesValidation = await getTypesFromDb(types);
  if (!typesValidation.length) {
    errors.push('Invalid Pokemon type');
  }
  return errors;
};

validateStats = (hp, attack, specialAttack, defense, specialDefense, speed) => {
  const errors = [];
  if (
    !hp ||
    !attack ||
    !specialAttack ||
    !defense ||
    !specialDefense ||
    !speed
  ) {
    errors.push('Missing stats to create Pokémon');
  }
  if (hp > 255 || hp < 1 || !/^[0-9]+$/gi.test(hp)) {
    errors.push('HP should be between 1 and 255');
  }
  if (attack > 200 || attack < 1 || !/^[0-9]+$/gi.test(attack)) {
    errors.push(`Attack should be between 1 and 255`);
  }
  if (
    specialAttack > 200 ||
    specialAttack < 1 ||
    !/^[0-9]+$/gi.test(specialAttack)
  ) {
    errors.push(`Special Attack should be between 1 and 255`);
  }
  if (defense > 255 || defense < 1 || !/^[0-9]+$/gi.test(defense)) {
    errors.push(`Defense should be between 1 and 255`);
  }
  if (
    specialDefense > 255 ||
    specialDefense < 1 ||
    !/^[0-9]+$/gi.test(specialDefense)
  ) {
    errors.push(`Special Defense should be between 1 and 255`);
  }
  if (speed > 200 || speed < 1 || !/^[0-9]+$/gi.test(speed)) {
    errors.push(`Speed should be between 1 and 255`);
  }
  return errors;
};

validateWeight = (weight) => {
  const errors = [];
  if (!weight) {
    errors.push('Weight is required to create Pokémon');
  }
  if (weight > 1000 || weight < 0.1 || !/^([0-9]*[.])?[0-9]+$/gi.test(weight)) {
    errors.push(`Weight should be between 0.1 m. and 20 m.`);
  }
  return errors;
};

validateHeight = (height) => {
  const errors = [];
  if (!height) {
    errors.push('Height is required to create Pokémon');
  }
  if (height > 20 || height < 0.1 || !/^([0-9]*[.])?[0-9]+$/gi.test(height)) {
    errors.push(`Height should be between 0.1 kg. and 1000 kg.`);
  }
  return errors;
};

module.exports = {
  validatePokemonParameters,
};
