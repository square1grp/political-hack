import visActions from './action';

const initialState = {
  visData: {}
}

// visualization reducer
export default function visReducer(state = initialState, action) {
  switch (action.type) {
    // fetch data is success
    case visActions.FETCH_DATA_SUCCESS:
      // set data to the state, so visualization component can use it
      return {
        ...state,
        visData: {
          ...state.visData,
          [action.uuid]: action.response
        }
      }
    // fetch data is failed
    case visActions.FETCH_DATA_FAILED:
      // set visualization data as empty
      return {
        ...state,
        visData: {
          ...state.visData,
          [action.uuid]: []
        }
      }

    // other cases
    default:
      return state;
  }
}
