import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import placeReducer from '../reducers/placeReducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  user: placeReducer
});

const configureStore = () => {
  return createStore(
    rootReducer,
    undefined,
    compose(applyMiddleware(...[thunk]))
  );
};

export default configureStore;
