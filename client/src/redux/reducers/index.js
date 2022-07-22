import { combineReducers } from 'redux';
import visibilityFilter from './visibilityFilter';
import data from './data';

const rootReducer = combineReducers({
  data,
  visibilityFilter,
});

export default rootReducer;
