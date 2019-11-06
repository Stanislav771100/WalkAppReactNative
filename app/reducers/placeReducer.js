import { USER_CHANGE } from '../actions/types';
import update from 'immutability-helper';

const initialState = {
  data: {}
};

const placeReducer = (state = initialState, action) => {

  switch (action.type) {
    case USER_CHANGE:
      return update(state, {
        [action.state.prop]: { $set: action.state.value }
      });
    default:
      return state;
  }
};

export default placeReducer;
