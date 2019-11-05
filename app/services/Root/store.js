import { createStore, combineReducers } from 'redux';
import placeReducer from './reducers/placeReducer';

const rootReducer = combineReducers({
  api: placeReducer
});

const configureStore = () => {
  return createStore(rootReducer);
};

export default configureStore;
