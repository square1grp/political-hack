import { all } from 'redux-saga/effects'

import authSaga from './auth/saga'
import visualizationSaga from './visualization/saga'

export default function* rootSaga(getState) {
  yield all([
    authSaga(),
    visualizationSaga()
  ]);
}
