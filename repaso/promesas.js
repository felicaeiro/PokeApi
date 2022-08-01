getPokemonByIdFromApi = async (id) => {
  return await getPokemonUrl(`${urlPokemon}/${id}`);
};

getPokemonByIdFromApi = (id) => {
  return new Promise((resolve, reject) => {
    resolve(getPokemonUrl(`${urlPokemon}/${id}`));
  });
};
