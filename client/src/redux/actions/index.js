export const GET_ALL_POKEMONS = 'GET_ALL_POKEMONS';
export const LOADING = 'LOADING';

export const getAllPokemon = () => {
  return function (dispatch) {
    dispatch(loading());
    fetch('http://localhost:3001/pokemons')
      .then((response) => response.json())
      .then((response) =>
        dispatch({ type: GET_ALL_POKEMONS, payload: response })
      )
      .catch((error) => error);
  };
};

export const loading = () => {
  return { type: LOADING };
};
