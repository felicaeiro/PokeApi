import { SORT, PAGINATION, SET_VISIBILITY_FILTER } from '../constants/index';

const initialState = {
  filter: [],
  sort: { attribute: '', orderby: '' },
  pagination: { currentPage: 1, pokesPerPage: 12 },
};

const visibilityFilter = (state = initialState, action) => {
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
    // const
    //   switch (action.type) {
    //     case SET_FILTER:
    //       //action.payload = [{ key:'', value:'' }]
    //       return {
    //         ...state,
    //         filter: action.payload,
    //       };

    //     case SORT: {
    //       //{attribute: name/strength, orderBy: asc/desc}
    //       return {
    //         ...state,
    //         sort: {
    //           ...state,
    //           attribute: action.payload.attribute,
    //           orderby: action.payload.orderby,
    //         },
    //       };
    //     }
  }
};

export default visibilityFilter;
