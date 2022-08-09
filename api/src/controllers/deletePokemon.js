const { deletePokemonFrokmDb } = require('../services/pokeDb');

const deletePokemon = async (req, res, next) => {
  try {
    await deletePokemonFrokmDb(req.params.idPokemon);
    res.json(`${req.params.idPokemon} deleted`);
  } catch (error) {
    next(error);
  }
};

module.exports = { deletePokemon };
