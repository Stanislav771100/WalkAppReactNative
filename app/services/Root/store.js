import { createStore, combineReducers } from 'redux';
import Navigation from '../../../app/components/Navigation';

const navReducer = (state, action) => {
  const newState = Navigation.router.getStateForAction(action, state);
  return newState || state;
};

const rootReducer = combineReducers({
  nav: navReducer
});

const configureStore = () => {
  return createStore(rootReducer);
};

export default configureStore;
