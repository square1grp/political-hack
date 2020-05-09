import { combineReducers } from "redux"
import { connectRouter } from "connected-react-router"
import Auth from './auth/reducer'

export default (history) => combineReducers({
  router: connectRouter(history),
  Auth,
});