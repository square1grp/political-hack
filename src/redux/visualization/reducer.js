import visActions from './action';

const initialState = {
  visData: {}
}

// visualization reducer
export default function visReducer(state = initialState, action) {
  switch (action.type) {
    case visActions.FETCH_DATA_SUCCESS:
      return {
        ...state,
        visData: {
          ...state.visData,
          [action.uuid]: action.response
        }
      }

    case visActions.FETCH_DATA_FAILED:
      return {
        ...state,
        visData: {
          ...state.visData,
          [action.uuid]: []
        }
      }

    default:
      return state;
  }
}
