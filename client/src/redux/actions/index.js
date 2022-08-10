import axios from 'axios';
import {
  GET_ALL_POKEMONS,
  GET_ALL_TYPES,
  CREATE_POKEMON,
  GET_POKEMON_DETAIL,
  DELETE_POKEMON,
  SEARCH_BY_NAME,
  SET_PAGINATION,
  SET_FILTER,
  SET_SORTER,
  LOADING,
  HANDLE_ERROR,
  REMOVE_FILTER,
  SET_STATS_FILTER,
  RESET_FILTERS,
  GET_EVOLUTION_CHAIN,
  CLEAR_EVOLUTION_CHAIN,
  UPDATE_POKEMON,
} from '../constants/index';

export const handleError = (error) => {
  return { type: HANDLE_ERROR, error: error.message };
};

export const getAllPokemon = () => {
  return async function (dispatch) {
    dispatch(loading());
    await axios
      .get('/pokemons')
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
      .get('/types')
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
      .post('/pokemons', data)
      .then((response) =>
        dispatch({ type: CREATE_POKEMON, payload: response.data })
      )
      .catch((error) => {
        dispatch(handleError(error));
        console.error('Unable to createPokemon: ' + error.message);
      });
  };
};

export const getEvolutionChain = (id) => {
  return async function (dispatch) {
    dispatch(loading());
    await axios
      .get(`/evolutionChain/${id}`)
      .then((response) =>
        dispatch({ type: GET_EVOLUTION_CHAIN, payload: response.data })
      )
      .catch((error) => {
        dispatch(handleError(error));
        console.error('Unable to getEvolutionChain: ' + error.message);
      });
  };
};

export const clearEvolutionChain = () => {
  return { type: CLEAR_EVOLUTION_CHAIN };
};

export const getPokemonDetail = (idPokemon) => {
  return async function (dispatch) {
    dispatch(loading());
    await axios
      .get(`/pokemons/${idPokemon}`)
      .then((response) =>
        dispatch({ type: GET_POKEMON_DETAIL, payload: response.data })
      )
      .catch((error) => {
        dispatch(handleError(error));
        console.error('Unable to getPokemonDetail: ' + error.message);
      });
  };
};

export const deletePokemon = (id) => {
  return async function (dispatch) {
    dispatch(loading);
    await axios
      .delete(`/pokemons/${id}`)
      .then((response) =>
        dispatch({ type: DELETE_POKEMON, payload: response.data })
      )
      .catch((error) => {
        dispatch(handleError(error));
        console.error('Unable to deletePokemon: ' + error.message);
      });
  };
};

export const updatePokemon = (data) => {
  return async function (dispatch) {
    dispatch(loading());
    await axios
      .put('/pokemons', data)
      .then((response) =>
        dispatch({ type: UPDATE_POKEMON, payload: response.data })
      )
      .catch((error) => {
        dispatch(handleError(error));
        console.error('Unable to updatePokemon: ' + error.message);
      });
  };
};

export const getPokeByName = (name) => {
  return { type: SEARCH_BY_NAME, payload: name };
};

export const setFilter = (filter) => {
  return { type: SET_FILTER, payload: filter };
};

export const removeFilter = (filter) => {
  return { type: REMOVE_FILTER, payload: filter };
};

export const setStatFilter = (filter) => {
  return { type: SET_STATS_FILTER, payload: filter };
};
export const resetFilters = () => {
  return { type: RESET_FILTERS };
};
export const setSort = (sort) => {
  return { type: SET_SORTER, payload: sort };
};

export const setPagination = (pagination) => {
  return { type: SET_PAGINATION, payload: pagination };
};

export const loading = () => {
  return { type: LOADING };
};
