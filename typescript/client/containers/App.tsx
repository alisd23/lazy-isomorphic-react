import * as React from 'react';
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { routeActions } from 'react-router-redux'
import Navbar from './Navbar';
import config from '../../config';
import getClass from '../../helpers/classesHelper';
const Helmet = require('react-helmet');

interface IAppProps {
  children: React.ReactElement<any>[];
}

class App extends React.Component<IAppProps, {}> {

  render() : React.ReactElement<{}> {
    const styles = require('../../../sass/common.scss');

    return (
      <div>
        <Helmet {...config.app.head}/>
        <Navbar />
        <div className={getClass('container', styles)}>
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
