const { createPokemon } = require('../services/pokeDb.js');
const {
  validatePokemonParameters,
} = require('../validators/validateNewPokemon.js');

module.exports = {
  postPokemon: async function (req, res, next) {
    try {
      const errors = await validatePokemonParameters(req.body);
      if (errors) {
        errors.status = 400;
        throw errors;
      }

      const newPoke = await createPokemon(req.body);
      res.send(newPoke);
    } catch (error) {
      next(error);
    }
  },
};
