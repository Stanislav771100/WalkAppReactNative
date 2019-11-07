import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import placeReducer from '../reducers/userReducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  user: userReducer
});

const configureStore = () => {
  return createStore(
    rootReducer,
    undefined,
    compose(applyMiddleware(...[thunk]))
  );
};

export default configureStore;
