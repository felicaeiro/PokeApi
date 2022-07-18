const axios = require('axios').default,
  { Pokemon } = require('../db.js'),
  { getPokemonsFromAPI } = require('./auxFunctions/getPokemonsFromAPI');

module.exports = {
  getAllPokemon: async function (req, res) {
    try {
      res.json(await getPokemonsFromAPI().then((data) => data));
    } catch (error) {
      throw new Error();
    }
  },
};
