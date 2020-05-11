const actions = {
  FETCH_DATA: 'FETCH_DATA',
  FETCH_DATA_SUCCESS: 'FETCH_DATA_SUCCESS',
  FETCH_DATA_FAILED: 'FETCH_DATA_SUCCESS',

  fetchData: () => (dispatch) => {
    dispatch({ type: actions.FETCH_DATA });
  }
};

export default actions;
