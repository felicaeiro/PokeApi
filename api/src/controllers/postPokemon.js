const { createPokemon } = require('../services/pokeDb.js');

module.exports = {
  postPokemon: async function (req, res) {
    const newPoke = await createPokemon(req.body);
    res.send(newPoke);
  },
};
