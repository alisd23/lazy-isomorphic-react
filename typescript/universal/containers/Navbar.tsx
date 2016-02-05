import * as React from 'react';
import classNames = require('classnames');
import { connect } from 'react-redux'
import { routeActions } from 'react-router-redux';
import ILink from '../interfaces/Link';
import IUser from '../interfaces/User';
import NavbarComponent from '../components/Navbar';

// Import styles

interface INavbarProps {
  push?: (String) => any;
  routing?: any;
  user?: IUser;
}

const links: ILink[] = [
  {
    title: 'Home',
    path: '/'
  }
]

class NavbarContainer extends React.Component<INavbarProps, {}> {

  render() : React.ReactElement<{}> {
    require('../../../sass/common.scss');

    return (
      <NavbarComponent
        clickNavLink={(route) => this.props.push(route)}
        routing={this.props.routing}
        user={this.props.user}
        links={links}
      />
    )
  }
}

function mapStateToProps(state) {
  return {
    routing: state.routing,
    user: state.user
  }
}

export default connect(
  mapStateToProps,
  routeActions as any
)(NavbarContainer)
