const { createPokemon } = require('../services/pokeDb.js');

module.exports = {
  postPokemon: async function (req, res, next) {
    try {
      const newPoke = await createPokemon(req.body);
      res.send(newPoke);
    } catch (error) {
      next(error);
    }
  },
};
