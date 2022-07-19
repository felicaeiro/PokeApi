const axios = require('axios');

const urlPokemon = 'https://pokeapi.co/api/v2/pokemon';

getPokemonsFromAPI = async () => {
  const firstPokePage = await axios.get(urlPokemon);
  const secondPokePage = await axios.get(firstPokePage.data.next);
  let allPokemons = [
    ...firstPokePage.data.results,
    ...secondPokePage.data.results,
  ];
  const allData = await Promise.all(
    allPokemons.map((poke) => getPokemonByIdUrl(poke.url))
  );

  return allData.map((x) => ({
    name: x.name,
    img: x.img,
    types: x.types,
  }));
  // .then((data) => {
  //   let pokeInfo = [];
  //   data.forEach((poke) => {
  //     pokeInfo.push({ name: poke.name, img: poke.img, types: poke.types });
  //   });
  //   return pokeInfo;
  // });
};
getPokemonByIdUrl = async (url) => {
  return await axios.get(url).then((response) => ({
    id: response.data.id,
    name: response.data.name,
    types: response.data.types.map((t) => t.type.name),
    img: response.data.sprites.other.dream_world.front_default,
    life: response.data.stats[0].base_stat,
    attack: response.data.stats[1].base_stat,
    defense: response.data.stats[2].base_stat,
    speed: response.data.stats[5].base_stat,
    height: response.data.height,
    weight: response.data.weight,
  }));
};
getPokemonById = async (id) => {
  return await getPokemonByIdUrl(`https://pokeapi.co/api/v2/pokemon/${id}`);
};
module.exports = {
  getPokemonsFromAPI,
  getPokemonByIdUrl,
  getPokemonById,
};
