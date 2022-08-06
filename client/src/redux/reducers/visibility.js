import {
  SET_SORTER,
  SET_PAGINATION,
  SET_FILTER,
  REMOVE_FILTER,
  SET_STATS_FILTER,
} from '../constants/index';

const initialState = {
  filter: [],
  sort: { attribute: 'id', order: 'asc' },
  pagination: { currentPage: 1, pokesPerPage: 12 },
};

const visibility = (state = initialState, action) => {
  switch (action.type) {
    case SET_STATS_FILTER:
      return {
        ...state,
        filter: state.filter
          .filter((f) => action.payload.every((a) => f.key !== a.key))
          .concat(action.payload),
      };
    case SET_FILTER:
      return {
        ...state,
        filter: state.filter.concat([action.payload]),
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
          pokesPerPage:
            action.payload.pokesPerPage || state.pagination.pokesPerPage,
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
    default:
      return state;
  }
};

export default visibility;
