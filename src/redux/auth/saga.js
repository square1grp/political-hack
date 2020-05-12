import { all, takeLatest, put } from 'redux-saga/effects'
import actions from './action'
import appActions from '../app/action'

export function* signin({ username, password }) {
  yield put({ type: appActions.API_CALL_START })

  yield put({ type: actions.SIGNIN_SUCCESS })

  yield put({ type: appActions.API_CALL_END })
}

export default function* rootSaga() {
  yield all([
    yield takeLatest(actions.SIGNIN, signin),
  ])
}
