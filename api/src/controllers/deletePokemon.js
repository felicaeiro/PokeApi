const { Pokemon } = require('../db');

const deletePokemon = async (req, res, next) => {
  const { idPokemon } = req.params;
  await Pokemon.destroy({ where: { id: idPokemon } });
  res.json('done');
};

module.exports = { deletePokemon };
