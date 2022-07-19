const { Pokemon, Type } = require('../db');

module.exports = {
  getPokemonsFromDB: async () => {
    let dbPokemons = await Pokemon.findAll({
      attributes: ['name'],
      include: {
        model: Type,
        as: 'types',
        attributes: ['name'],
        through: { attributes: [] },
      },
    });

    return dbPokemons.map((result) => result.dataValues);
  },

  createPokemon: async (pokemonCreate) => {
    const { name, types, img, life, attack, defense, speed, height, weight } =
      pokemonCreate;
    const poke = await Pokemon.create({
      name,
      img,
      life,
      attack,
      defense,
      speed,
      height,
      weight,
    });
    const type = await Type.findAll({ where: { name: types } });
    await poke.addType(type);

    return { ...poke.dataValues };
  },
};
