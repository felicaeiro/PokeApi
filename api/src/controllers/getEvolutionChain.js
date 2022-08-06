const { getEvolutionChainFromApi } = require('../services/pokeApi');

module.exports = {
  getEvolutionChain: async function (req, res, next) {
    try {
      const evolutionChain = await getEvolutionChainFromApi(req.params.id);
      res.json(evolutionChain);
    } catch (error) {
      next(error);
    }
  },
};
