import { combineReducers } from 'redux';
import visibility from './visibility';
import data from './data';

const rootReducer = combineReducers({
  data,
  visibility,
});

export default rootReducer;
