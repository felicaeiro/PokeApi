import {
  SET_SORTER,
  PAGINATION,
  SET_VISIBILITY_FILTER,
} from '../constants/index';

const initialState = {
  filter: [],
  sort: { attribute: '', orderby: '' },
  pagination: { currentPage: 1, pokesPerPage: 12 },
};

const visibility = (state = initialState, action) => {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return {
        ...state,
        filter: state.filter
          .filter((f) => f.key !== action.payload.key)
          .concat([action.payload]),
      };
    case PAGINATION: {
      //action.payload = { currentPage: number, pokesPerPage: 12 }
      return {
        ...state,
        pagination: {
          ...state.pagination,
          currentPage: action.payload.currentPage,
          pokesPerPage: action.payload.pokesPerPage,
        },
      };
    }
    default:
      return state;

    case SET_SORTER: {
      //{attribute: name/strength, order: asc/desc}
      return {
        ...state,
        sort: action.payload,
      };
    }
  }
};

export default visibility;
