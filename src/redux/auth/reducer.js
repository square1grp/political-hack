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
          disctrict: null,
          birthday: "Jan 1, 2000",
          party: null,
          tenur: null,
          gender: "Female",
          occupation: null,
          headquarters: null,
          party_percent: null,
          industry: null,
          org_type: "Corp",
          comments: null
        }
      }
    default:
      return state;
  }
}
