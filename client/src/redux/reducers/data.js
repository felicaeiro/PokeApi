import {
  GET_ALL_POKEMONS,
  GET_ALL_TYPES,
  GET_POKEMON_DETAIL,
  LOADING,
} from '../constants/index';

const initialState = {
  allPokemon: [],
  types: [],
  pokemonDetail: [],
  loading: false,
};

const data = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_POKEMONS:
      return {
        ...state,
        allPokemon: action.payload,
        loading: false,
      };
    case GET_ALL_TYPES:
      return {
        ...state,
        types: action.payload,
      };
    case GET_POKEMON_DETAIL:
      return {
        ...state,
        pokemonDetail: action.payload,
        loading: false,
      };
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default data;
