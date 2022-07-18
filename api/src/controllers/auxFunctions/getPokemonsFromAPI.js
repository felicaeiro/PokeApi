const axios = require('axios'),
  { getPokemonById } = require('../getPokemonById');

const urlPokemon = 'https://pokeapi.co/api/v2/pokemon';

module.exports = {
  getPokemonsFromAPI: async function () {
    const firstPokePage = await axios.get(urlPokemon);
    const secondPokePage = await axios.get(firstPokePage.data.next);
    let allPokemons = [
      ...firstPokePage.data.results,
      ...secondPokePage.data.results,
    ];
    return Promise.all(
      allPokemons.map((poke) => getPokemonById(poke.url))
    ).then((data) => {
      let pokeInfo = [];
      data.forEach((poke) => {
        pokeInfo.push({ name: poke.name, img: poke.img, types: poke.types });
      });
      return pokeInfo;
    });
  },
};
