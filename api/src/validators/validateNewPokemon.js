validatePokemonParameters = (pokemonCreate) => {
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
};

module.exports = {
  validatePokemonParameters,
};
