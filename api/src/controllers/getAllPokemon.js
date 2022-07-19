const { getPokemonsFromDB } = require('../services/pokeDb');
const { getPokemonsFromAPI } = require('../services/pokeApi');

module.exports = {
  getAllPokemon: async function (req, res) {
    const { name } = req.query;
    let pokemonsFromApi = await getPokemonsFromAPI();
    let pokemonsFromDb = await getPokemonsFromDB();
    pokemonsFromDb.forEach((p) => {
      p.types = p.types.map((t) => t.name);
    });

    let result = [...pokemonsFromApi, ...pokemonsFromDb];
    if (name) result = result.filter((poke) => poke.name === name);

    return res.json(result);
  },
};
