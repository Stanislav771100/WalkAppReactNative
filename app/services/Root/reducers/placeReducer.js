import { ADD_PLACE } from '../actions/types'

const initialState = {
  placeName: '',
  places: []
}

const placeReducer = (state = initialState, action) => {
    console.log(state.places)
  switch (action.type) {
    case ADD_PLACE:
      return {
        ...state,
        places: state.places.concat({
          value: action.payload
        })
      }
    default:
      return state
  }
}

export default placeReducer
