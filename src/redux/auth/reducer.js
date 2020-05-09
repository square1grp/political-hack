import authActions from './action';

const initialState = {
  user: null,
}

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case authActions.SIGNIN_SUCCESS:
      return {}
    default:
      return state;
  }
}
