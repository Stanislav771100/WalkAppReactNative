import { ADD_API } from '../actions/types';

const initialState = {
  api: ''
};

const placeReducer = (state = initialState, action) => {
  console.log('Redux', state);
  switch (action.type) {
    case ADD_API:
      return { ...state, api: action.payload };
    default:
      return state;
  }
};

export default placeReducer;
