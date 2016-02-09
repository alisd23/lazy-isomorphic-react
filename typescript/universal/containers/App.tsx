import * as React from 'react';
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux'
import { routeActions } from 'react-router-redux'
import Navbar from './Navbar';
import Alerts from './Alerts/GlobalAlerts';
import IAppState from '../interfaces/AppState';
import config from '../../config';
import { ILocation } from 'history';
const Helmet = require('react-helmet');


interface IAppProps {
  children: React.ReactElement<any>;
  location?: ILocation;
}

class App extends React.Component<IAppProps, {}> {

  render() : React.ReactElement<{}> {
    // Import styles
    require('../../../sass/common.scss');

    return (
      <div>
        <Helmet {...config.app.head}/>
        <Alerts />
        <div className="cover">
          <Navbar />
          <div className="main-container flex-expand">
            { this.props.children }
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state: IAppState) {
  return {
    location: state.routing.location
  }
}

export default connect(
  mapStateToProps,
  null
)(App)
