import {
  GET_ALL_POKEMONS,
  GET_ALL_TYPES,
  SEARCH_BY_NAME,
  GET_POKEMON_DETAIL,
  LOADING,
  HANDLE_ERROR,
  CREATE_POKEMON,
} from '../constants/index';

const initialState = {
  allPokemon: [],
  types: [],
  search: {},
  pokemonDetail: {},
  loading: false,
  error: null,
};

const data = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_POKEMONS:
      return {
        ...state,
        allPokemon: action.payload,
        loading: false,
        error: null,
      };
    case GET_ALL_TYPES:
      return {
        ...state,
        types: action.payload,
        error: null,
      };
    case CREATE_POKEMON:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case SEARCH_BY_NAME:
      return {
        ...state,
        search: action.payload,
        loading: false,
        error: null,
      };
    case GET_POKEMON_DETAIL:
      return {
        ...state,
        pokemonDetail: action.payload,
        loading: false,
        error: null,
      };
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case HANDLE_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
};

export default data;
