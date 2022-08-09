const { updatePokemonInDb } = require('../services/pokeDb');
const {
  validatePokemonUpdate,
} = require('../validators/validatePokemonUpdate');

const updatePokemon = async (req, res, next) => {
  try {
    const errors = await validatePokemonUpdate(req.body);
    if (errors) {
      errors.status = 400;
      throw errors;
    }

    const updatedPoke = await updatePokemonInDb(req.body);
    res.json(updatedPoke);
  } catch (error) {
    next(error);
  }
};

module.exports = { updatePokemon };
