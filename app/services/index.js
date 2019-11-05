import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import Navigation from './Navigation';

const navReducer = (state, action) => {
  const newState = Navigation.router.getStateForAction(action, state);
  return newState || state;
};

export default () => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    nav: navReducer
  });

  // return store
  return createStore(rootReducer);
};
