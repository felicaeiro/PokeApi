import axios from 'axios';
import {
  GET_ALL_POKEMONS,
  GET_ALL_TYPES,
  CREATE_POKEMON,
  GET_POKEMON_DETAIL,
  SEARCH_BY_NAME,
  SET_PAGINATION,
  SET_FILTER,
  SET_SORTER,
  LOADING,
  HANDLE_ERROR,
  REMOVE_FILTER,
} from '../constants/index';

export const handleError = (error) => {
  return { type: HANDLE_ERROR, error: error.message };
};

export const getAllPokemon = () => {
  return async function (dispatch) {
    dispatch(loading());
    await axios
      .get('http://localhost:3001/pokemons')
      .then((response) =>
        dispatch({ type: GET_ALL_POKEMONS, payload: response.data })
      )
      .catch((error) => {
        dispatch(handleError(error));
        console.error('Unable to getAllPokemon: ' + error.message);
      });
  };
};

export const getAllTypes = () => {
  return async function (dispatch) {
    await axios
      .get('http://localhost:3001/types')
      .then((response) =>
        dispatch({ type: GET_ALL_TYPES, payload: response.data })
      )
      .catch((error) => {
        dispatch(handleError(error));
        console.error('Unable to getAllTypes: ' + error.message);
      });
  };
};

export const createPokemon = (data) => {
  return async function (dispatch) {
    dispatch(loading());
    await axios
      .post('http://localhost:3001/pokemons', data)
      .then((response) =>
        dispatch({ type: CREATE_POKEMON, payload: response.data })
      )
      .catch((error) => {
        dispatch(handleError(error));
        console.error('Unable to createPokemon: ' + error.message);
      });
  };
};

export const getPokeByName = (name) => {
  return async function (dispatch) {
    dispatch(loading());
    await axios
      .get(`http://localhost:3001/pokemons?name=${name}`)
      .then((response) =>
        dispatch({ type: SEARCH_BY_NAME, payload: response.data[0] })
      )
      .catch((error) => {
        dispatch(handleError(error));
        console.error('Unable to getPokeByName: ' + error.message);
      });
  };
};

export const getPokemonDetail = (idPokemon) => {
  return async function (dispatch) {
    dispatch(loading());
    await axios
      .get(`http://localhost:3001/pokemons/${idPokemon}`)
      .then((response) =>
        dispatch({ type: GET_POKEMON_DETAIL, payload: response.data })
      )
      .catch((error) => {
        dispatch(handleError(error));
        console.error('Unable to getPokemonDetail: ' + error.message);
      });
  };
};

export const setFilter = (filter) => {
  return { type: SET_FILTER, payload: filter };
};

export const removeFilter = (filter) => {
  return { type: REMOVE_FILTER, payload: filter };
};

//{attribute: name/strength, orderBy: asc/desc}
export const setSort = (sort) => {
  return { type: SET_SORTER, payload: sort };
};

export const setPagination = (pagination) => {
  return { type: SET_PAGINATION, payload: pagination };
};

export const loading = () => {
  return { type: LOADING };
};
