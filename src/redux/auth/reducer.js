import authActions from './action';

const initialState = {
  user: null,
}

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case authActions.SIGNIN_SUCCESS:
      return {
        user: {
          firstname: "Jane",
          lastname: "Doe",
          hometown: "Los Angeles",
          state: "CA",
          disctrict: "",
          birthday: "Jan 1, 2000",
          party: "",
          tenur: "",
          gender: "Female",
          occupation: ""
        }
      }
    default:
      return state;
  }
}
