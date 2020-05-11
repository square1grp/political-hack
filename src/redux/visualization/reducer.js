import visActions from './action';

const initialState = {
  visJSONData: []
}

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case visActions.FETCH_DATA_SUCCESS:
      return {
        visJSONData: []
      }

    case visActions.FETCH_DATA_FAILED:
      return {
        visJSONData: []
      }

    default:
      return state;
  }
}
