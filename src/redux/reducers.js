import { combineReducers } from "redux"
import { connectRouter } from "connected-react-router"
import App from './app/reducer'
import Auth from './auth/reducer'
import Visualization from './visualization/reducer'

export default (history) => combineReducers({
  router: connectRouter(history),
  App,
  Auth,
  Visualization
});