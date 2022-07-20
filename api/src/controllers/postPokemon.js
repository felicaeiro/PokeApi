const { createPokemon } = require('../services/pokeDb.js');
const {
  validatePokemonParameters,
} = require('../validators/validateNewPokemon.js');

module.exports = {
  postPokemon: async function (req, res, next) {
    try {
      // validatePokemonParameters(req.body)
      const newPoke = await createPokemon(req.body);
      res.send(newPoke);
    } catch (error) {
      next(error);
    }
  },
};
