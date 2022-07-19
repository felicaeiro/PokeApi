const axios = require('axios'),
  { Type } = require('../db.js');

const urlTypes = 'https://pokeapi.co/api/v2/type';

module.exports = {
  getTypes: async function (req, res) {
    const types = await Type.findAll();
    if (types.length) {
      res.json(types);
    } else {
      const pokeTypes = await axios
        .get(urlTypes)
        .then((response) => response.data.results);
      await Promise.all(
        pokeTypes.map(async (poke) => {
          await Type.create({ name: poke.name });
        })
      );
      //   const types = await Type.findAll();
      res.json(pokeTypes);
    }
  },
};
