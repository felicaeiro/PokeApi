const { getPokemonByIdFromApi } = require('../services/pokeApi');
const { getPokemonByIdFromDb } = require('../services/pokeDb');

module.exports = {
  getPokemonById: async function (req, res, next) {
    const { idPokemon } = req.params;
    try {
      if (Number(idPokemon)) {
        res.json(await getPokemonByIdFromApi(idPokemon));
      } else {
        res.json(await getPokemonByIdFromDb(idPokemon));
      }
    } catch (error) {
      next(error);
    }
  },
};
