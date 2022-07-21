import { GET_ALL_POKEMONS, LOADING } from '../actions';

const initialState = {
  allPokemon: [],
  pokemonDetail: [],
  loading: false,
};
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_POKEMONS:
      return {
        ...state,
        allPokemon: action.payload,
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

export default rootReducer;
