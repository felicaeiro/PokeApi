module.exports = {
  getPokemonById: async function (req, res) {
    const { idPokemon } = req.params;

    // if (idPokemon) {
    //   const filtered = allPokemons.filter(
    //     (poke) => String(poke.id) === idPokemon
    //   );
    //   return res.json(filtered);
    // }
  },
};
