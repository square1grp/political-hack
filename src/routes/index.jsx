import * as React from 'react'
import { ConnectedRouter } from 'connected-react-router'
import { Route, Switch } from 'react-router'
import { Header } from '../components'
import { BrowsePage, PoliticiansPage } from '../pages'

class RoutedApplication extends React.Component<any> {
  render() {
    return (
      <ConnectedRouter history={this.props.history}>

        <Header />

        <Switch>
          <Route
            path='/'
            exact
            component={BrowsePage}
          />

          <Route
            path='/politicians'
            component={PoliticiansPage}
          />
        </Switch>

      </ConnectedRouter>
    )
  }
}

export default RoutedApplication;