const axios = require('axios');

const PATHPokemon = 'https://pokeapi.co/api/v2/pokemon';
const PATHTypes = 'https://pokeapi.co/api/v2/type?limit=18';

getPokemonsFromAPI = async () => {
  let allPokemons = [];
  await axios
    .get(`${PATHPokemon}?limit=151`)
    .then((response) => (allPokemons = response.data.results))
    .catch((error) => {
      error.status = 502;
      error.message = 'Unable to get pokemons from API';
      throw error;
    });

  const allData = await Promise.all(
    allPokemons.map((x) => getPokemonUrl(x.url))
  ).catch((error) => {
    error.status = 502;
    error.message = 'Unable to get pokemons from API';
    throw error;
  });

  return allData;
};

getPokemonUrl = async (url) => {
  return await axios
    .get(url)
    .then((response) => ({
      id: response.data.id,
      name: response.data.name,
      types: response.data.types.map((t) => t.type.name),
      img: response.data.sprites.other['official-artwork'].front_default,
      hp: response.data.stats[0].base_stat,
      attack: response.data.stats[1].base_stat,
      specialAttack: response.data.stats[3].base_stat,
      defense: response.data.stats[2].base_stat,
      specialDefense: response.data.stats[4].base_stat,
      speed: response.data.stats[5].base_stat,
      height: Math.round(response.data.height * 10) / 100,
      weight: Math.round(response.data.weight * 10) / 100,
    }))
    .catch((error) => {
      error.status = 502;
      error.message = 'Unable to get Pokemon info';
      throw error;
    });
};

getPokemonByIdFromApi = async (id) => {
  return await getPokemonUrl(`${PATHPokemon}/${id}`).catch((error) => {
    error.status = 404;
    error.message = `The id doesn't belong to any Pokemon`;
    throw error;
  });
};

getTypesFromApi = async () => {
  const types = await axios
    .get(PATHTypes)
    .then((response) => response.data.results)
    .catch((error) => {
      error.status = 502;
      error.message = 'Unable to get types from API';
      throw error;
    });

  return types;
};

getEvolutionChainFromApi = async (id) => {
  const evolutionChain = [];
  let evolutions = await axios
    .get(`${PATHPokemon}/${id}`)
    .then((response) => axios.get(response.data.species.url))
    .then((response) => axios.get(response.data['evolution_chain'].url))
    .then((response) => {
      evolutionChain.push(response.data.chain.species.name);
      return response.data.chain;
    })
    .catch((error) => {
      error.status = 404;
      error.message = `The id doesn't belong to any Pokemon`;
      throw error;
    });

  while (evolutions['evolves_to'].length > 0) {
    evolutionChain.push(evolutions['evolves_to'][0].species.name);
    evolutions = evolutions['evolves_to'][0];
  }

  return evolutionChain;
};

module.exports = {
  getPokemonsFromAPI,
  getPokemonUrl,
  getPokemonByIdFromApi,
  getTypesFromApi,
  getEvolutionChainFromApi,
};
