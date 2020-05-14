import actions from './action';

const initialState = {
  apiProcessing: {},
}

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case actions.API_CALL_START:
      return {
        ...state,
        apiProcessing: {
          ...state.apiProcessing,
          [action.uuid]: true
        }
      }
    case actions.API_CALL_END:
      return {
        ...state,
        apiProcessing: {
          ...state.apiProcessing,
          [action.uuid]: false
        }
      }
    default:
      return state;
  }
}
