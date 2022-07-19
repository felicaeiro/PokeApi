const { getPokemonsFromDB } = require('../services/pokeDb');
const { getPokemonsFromAPI } = require('../services/pokeApi');

module.exports = {
  getAllPokemon: async function (req, res, next) {
    try {
      let { name } = req.query;

      const pokemonsFromApi = await getPokemonsFromAPI();
      const pokemonsFromDb = await getPokemonsFromDB();
      pokemonsFromDb.forEach((x) => {
        x.types = x.types.map((t) => t.name);
      });

      let result = [...pokemonsFromApi, ...pokemonsFromDb];
      if (name) {
        name = name.toLowerCase();
        result = result.filter((poke) => poke.name === name);
        if (result.length === 0) {
          const error = new Error(`The Pokemon ${name} doesn't exist`);
          error.status = 404;
          throw error;
        }
      }
      res.json(result);
    } catch (error) {
      next(error);
    }
  },
};
