const { getPokemonsFromDB } = require('../services/pokeDb');
const { getPokemonsFromAPI } = require('../services/pokeApi');

module.exports = {
  getAllPokemon: async function (req, res, next) {
    try {
      const pokemonsFromApi = await getPokemonsFromAPI();
      const pokemonsFromDb = await getPokemonsFromDB();

      let result = [...pokemonsFromApi, ...pokemonsFromDb];

      res.json(result);
    } catch (error) {
      next(error);
    }
  },
};
