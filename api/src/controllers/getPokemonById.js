const axios = require('axios');

module.exports = {
  getPokemonById: async function (url) {
    return await axios.get(url).then((response) => {
      const poke = {
        id: response.data.id,
        name: response.data.name,
        types: response.data.types.map((t) => t.type.name),
        img: response.data.sprites.other.dream_world.front_default,
        height: response.data.height,
        weight: response.data.weight,
        life: response.data.stats[0].base_stat,
        attack: response.data.stats[1].base_stat,
        defense: response.data.stats[2].base_stat,
        speed: response.data.stats[5].base_stat,
      };
      return poke;
    });
  },
};
