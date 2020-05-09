import * as React from 'react'
import { ConnectedRouter } from 'connected-react-router'
import { Route, Switch } from 'react-router'
import { Header } from '../components'
import { BrowsePage, PoliticiansPage, DonorsPage } from '../pages'

class RoutedApplication extends React.Component {
  render() {
    return (
      <ConnectedRouter history={this.props.history}>

        <Header />

        <Switch>
          <Route path='/' exact component={BrowsePage} />

          <Route path='/politicians' component={PoliticiansPage} />

          <Route path='/donors' component={DonorsPage} />
        </Switch>

        <footer className="py-5">
          <p className="text-center"><small>Copyright © 2020 Political Hack, All Rights Reserved.</small></p>
        </footer>

      </ConnectedRouter>
    )
  }
}

export default RoutedApplication;