import {
  GET_ALL_POKEMONS,
  GET_ALL_TYPES,
  LOADING,
  GET_POKEMON_DETAIL,
  PAGINATION,
  SET_VISIBILITY_FILTER,
  SET_SORTER,
} from '../constants/index';

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

export const getAllTypes = () => {
  return function (dispatch) {
    dispatch(loading());
    fetch('http://localhost:3001/types')
      .then((response) => response.json())
      .then((response) => dispatch({ type: GET_ALL_TYPES, payload: response }))
      .catch((error) => error);
  };
};

export const getPokemonDetail = (idPokemon) => {
  return function (dispatch) {
    dispatch(loading());
    fetch(`http://localhost:3001/pokemons${idPokemon}`)
      .then((response) => response.json())
      .then((response) =>
        dispatch({ type: GET_POKEMON_DETAIL, payload: response })
      );
  };
};

export const setVisibilityFilter = (filter) => {
  return { type: SET_VISIBILITY_FILTER, payload: filter };
};

//{attribute: name/strength, orderBy: asc/desc}
export const setSort = (sort) => {
  return { type: SET_SORTER, payload: sort };
};

export const setPagination = (pagination) => {
  return { type: PAGINATION, payload: pagination };
};

//export const setPokesPerPage = (po)

export const loading = () => {
  return { type: LOADING };
};
