const actions = {
  SIGNIN: 'SIGNIN',
  SIGNUP: 'SIGNUP',
  SIGNIN_SUCCESS: 'SIGNIN_SUCCESS',

  signin: ({ username, password }) => (dispatch) => {
    dispatch({ type: actions.SIGNIN, username, password });
  }
};

export default actions;
