const { getTypesFromApi } = require('./services/pokeApi');
const { createTypes } = require('./services/pokeDb');

module.exports = {
  populateTypes: async () => {
    const types = await getTypesFromApi();
    await createTypes(types);
  },
};
