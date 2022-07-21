const axios = require('axios');
const { createTypes } = require('./pokeDb');

const urlPokemon = 'https://pokeapi.co/api/v2/pokemon';
const urlTypes = 'https://pokeapi.co/api/v2/type';

getPokemonsFromAPI = async () => {
  const firstApiPage = await axios.get(urlPokemon).catch((error) => {
    error.status = 502;
    error.message = 'Unable to get Pokemons from API';
    throw error;
  });

  const secondApiPage = await axios
    .get(firstApiPage.data.next)
    .catch((error) => {
      error.status = 502;
      error.message = 'Unable to get Pokemons from API';
      throw error;
    });

  const allPokemons = [
    ...firstApiPage.data.results,
    ...secondApiPage.data.results,
  ];

  const allData = await Promise.all(
    allPokemons.map((x) => getPokemonUrl(x.url))
  );

  return allData.map((x) => ({
    id: x.id,
    name: x.name,
    img: x.img,
    types: x.types,
  }));
};

getPokemonUrl = async (url) => {
  return await axios
    .get(url)
    .then((response) => ({
      id: response.data.id,
      name: response.data.name,
      types: response.data.types.map((t) => t.type.name),
      img: response.data.sprites.other.dream_world.front_default,
      hp: response.data.stats[0].base_stat,
      attack: response.data.stats[1].base_stat,
      defense: response.data.stats[2].base_stat,
      speed: response.data.stats[5].base_stat,
      height: response.data.height,
      weight: response.data.weight,
    }))
    .catch((error) => {
      error.status = 404;
      error.message = `The id doesn't belong to any Pokemon`;
      throw error;
    });
};

getPokemonByIdFromApi = async (id) => {
  return await getPokemonUrl(`${urlPokemon}/${id}`);
};

getTypesFromApi = async () => {
  const types = await axios
    .get(urlTypes)
    .then((response) => response.data.results)
    .catch((error) => {
      error.status = 502;
      error.message = 'Unable to get types from API';
      throw error;
    });

  return types;
};

module.exports = {
  getPokemonsFromAPI,
  getPokemonUrl,
  getPokemonByIdFromApi,
  getTypesFromApi,
};
