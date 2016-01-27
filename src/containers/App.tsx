import * as React from 'react';
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { routeActions } from 'react-router-redux'
import Navbar from './Navbar'

interface IAppProps {
  children: React.ReactElement<any>[];
}

class App extends React.Component<IAppProps, {}> {

  render() : React.ReactElement<{}> {
    return (
      <div>
        <Navbar />
        <div className="container">
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default connect(
  null,
  null
)(App)
