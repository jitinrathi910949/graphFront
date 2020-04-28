import { combineReducers } from 'redux'
import { routerReducer } from "react-router-redux";
import graphReducer from './graphReducer';

export const rootReducers = combineReducers({
  routing: routerReducer,
  graphReducer
  });