import {
  SET_SORTER,
  SET_PAGINATION,
  SET_FILTER,
  REMOVE_FILTER,
  SET_STATS_FILTER,
  SEARCH_BY_NAME,
  RESET_FILTERS,
} from '../constants/index';

const initialState = {
  filter: [],
  sort: { attribute: 'id', order: 'asc' },
  pagination: { currentPage: 1, pokesPerPage: 12 },
  pokeSearch: '',
};

const visibility = (state = initialState, action) => {
  switch (action.type) {
    case SET_STATS_FILTER:
      return {
        ...state,
        filter: state.filter
          .filter((f) => action.payload.every((a) => f.key !== a.key))
          .concat(action.payload),
        pagination: { ...state.pagination, currentPage: 1 },
      };
    case SET_FILTER:
      return {
        ...state,
        filter: state.filter.concat([action.payload]),
        pagination: { ...state.pagination, currentPage: 1 },
      };
    case REMOVE_FILTER:
      return {
        ...state,
        filter: state.filter.filter((f) => f.value !== action.payload.value),
      };
    case SET_PAGINATION: {
      return {
        ...state,
        pagination: {
          ...state.pagination,
          currentPage: action.payload.currentPage,
          pokesPerPage: action.payload.pokesPerPage,
        },
      };
    }
    case SET_SORTER: {
      //{attribute: name/strength, order: asc/desc}
      return {
        ...state,
        sort: action.payload,
      };
    }
    case SEARCH_BY_NAME:
      return {
        ...state,
        pokeSearch: action.payload,
        pagination: { ...state.pagination, currentPage: 1 },
      };
    case RESET_FILTERS:
      return {
        ...state,
        filter: [],
        pokeSearch: '',
      };
    default:
      return state;
  }
};

export default visibility;
