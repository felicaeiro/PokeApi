validatePokemonParameters = (pokemonCreate) => {
  //   let { name, types, hp, attack, defense, speed, height, weight } =
  //     pokemonCreate;
  //     if (!nameIsValid(name)) {
  //       errors.push('name invalid');
  //     }
  //     if (!hpIsValid(hp)) {
  //         errors.push('hp innvalid');
  //     }
  //     return errors;
  //     const errors = []
  //     const nameError = validateName(name)
  //     const hpHerror = validateHp(hp)
  //     return { valid: !errors.length, errorMessage: errors };
  //   if (
  //     !name ||
  //     !types ||
  //     !hp ||
  //     !attack ||
  //     !defense ||
  //     !speed ||
  //     !height ||
  //     !weight
  //   ) {
  //     const error = new Error('Missing parameters to create Pokemon');
  //     error.status = 422;
  //     throw error;
  //   }
  // };
  //  validateName() {
  //     if (!name?.trim() || nameHasInvalidCharacters(name)) {
  //         return false;
  //     }
  //     return true;
};
module.exports = {
  validatePokemonParameters,
};
