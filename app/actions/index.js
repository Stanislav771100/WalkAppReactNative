export function changeStateProp(prop, value, reducer) {
  return dispatch => {
    dispatch({
      type: reducer.toUpperCase() + 'CHANGE_STATE_PROP',
      state: {
        prop: prop,
        value: value
      }
    });
  };
}
