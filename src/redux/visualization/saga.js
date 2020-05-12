import { all, takeLatest, put, call } from 'redux-saga/effects'
import actions from './action'
import appActions from '../app/action'

export function* fetchData() {
  yield put({ type: appActions.API_CALL_START })

  try {
    let res_status = null;
    const response = yield call(() => fetch(
      process.env.REACT_APP_API_ENDPOINT + '/candidates/search'
    ).then(res => {
      res_status = res.status

      if (res.status !== 200)
        return res.text()

      return res.json()
    }))

    if (res_status === 200) {
      yield put({ type: actions.FETCH_DATA_SUCCESS, candidates: response })

    } else {
      throw (response)
    }
  } catch (e) {
    yield put({ type: actions.FETCH_DATA_FAILED })
  }


  yield put({ type: appActions.API_CALL_END })
}

export default function* rootSaga() {
  yield all([
    yield takeLatest(actions.FETCH_DATA, fetchData),
  ])
}
