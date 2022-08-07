import {
  GET_ALL_POKEMONS,
  GET_ALL_TYPES,
  GET_POKEMON_DETAIL,
  LOADING,
  HANDLE_ERROR,
  CREATE_POKEMON,
  GET_EVOLUTION_CHAIN,
} from '../constants/index';

const initialState = {
  allPokemon: [],
  types: [],
  pokemonDetail: {},
  evolutionChain: [],
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
    case GET_POKEMON_DETAIL:
      return {
        ...state,
        pokemonDetail: action.payload,
        error: null,
      };
    case GET_EVOLUTION_CHAIN:
      return {
        ...state,
        evolutionChain: action.payload,
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
