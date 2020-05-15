import { all, takeEvery, put, call } from 'redux-saga/effects'
import actions from './action'
import appActions from '../app/action'

// visualization saga
export function* fetchData({ uuid = null }) {
  yield put({ type: appActions.API_CALL_START, uuid })

  try {
    let res_status = null;
    if (uuid) {
      const response = yield call(() => fetch(
        process.env.REACT_APP_API_ENDPOINT + '/candidates/search'
      ).then(res => {
        res_status = res.status

        if (res.status !== 200)
          return res.text()

        return res.json()
      }))

      if (res_status === 200) {
        yield put({ type: actions.FETCH_DATA_SUCCESS, uuid, response })

      } else {
        throw (response)
      }
    }
  } catch (e) {
    yield put({ type: actions.FETCH_DATA_FAILED, uuid })
  }


  yield put({ type: appActions.API_CALL_END, uuid })
}

export default function* rootSaga() {
  yield all([
    yield takeEvery(actions.FETCH_DATA, fetchData),
  ])
}
