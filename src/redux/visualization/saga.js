import { all, takeLatest, put, call, delay } from 'redux-saga/effects'
import actions from './action'
import appActions from '../app/action'

export function* fetchData() {
  yield put({ type: appActions.API_CALL_START })

  try {
    const propublica_url = 'https://api.propublica.org/campaign-finance/v1/2016/candidates/search.json'
    const response = yield call(() => fetch(propublica_url, {
      headers: { 'X-API-Key': 'SMkxRIqNMxu2V1f4cpr3RZiZ9zjvbRaS1LHLptem' }
    }).then(res => {
      // yield put({ type: actions.FETCH_DATA_SUCCESS })
      return res.json()
    }))

    console.log(response)
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
