const { getTypesFromDb } = require('../services/pokeDb.js');

module.exports = {
  getTypes: async function (req, res, next) {
    try {
      res.json(await getTypesFromDb());
    } catch (error) {
      next(error);
    }
  },
};
