import {
  GET_ALL_POKEMONS,
  GET_ALL_TYPES,
  GET_POKEMON_DETAIL,
  LOADING,
  HANDLE_ERROR,
  CREATE_POKEMON,
  GET_EVOLUTION_CHAIN,
  CLEAR_EVOLUTION_CHAIN,
  DELETE_POKEMON,
  UPDATE_POKEMON,
} from '../constants/index';

const initialState = {
  allPokemon: [],
  types: [],
  pokemonDetail: {},
  createdPokemon: {},
  updatedPokemon: [],
  deletedPokemon: [],
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
        createdPokemon: action.payload,
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
    case GET_EVOLUTION_CHAIN:
      return {
        ...state,
        evolutionChain: action.payload,
        error: null,
      };
    case CLEAR_EVOLUTION_CHAIN:
      return {
        ...state,
        evolutionChain: [],
      };
    case UPDATE_POKEMON:
      return {
        ...state,
        updatedPokemon: action.payload,
        loading: false,
        error: null,
      };
    case DELETE_POKEMON:
      return {
        ...state,
        deletedPokemon: action.payload,
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
