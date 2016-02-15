import * as React from 'react';
import classNames = require('classnames');
import { connect } from 'react-redux'
import { routeActions } from 'react-router-redux';
import ILink from '../interfaces/Link';
import IUser from '../interfaces/User';
import IAppState from '../interfaces/AppState';
import Modals from '../constants/Modals';
import NavbarComponent from '../components/Navbar';
import { openModal } from '../redux/modules/global';

// Import styles

interface INavbarProps {
  push?: (String) => any;
  routing?: any;
  user?: IUser;
  openModal?: (modal: Modals) => any;
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
        onLinkClick={(route) => this.props.push(route)}
        onAddFundsClick={() => this.props.openModal(Modals.ADD_FUNDS)}
        routing={this.props.routing}
        user={this.props.user}
        links={links}
      />
    )
  }
}

function mapStateToProps(state: IAppState) {
  return {
    routing: state.routing,
    user: state.user
  }
}

export default connect(
  mapStateToProps,
  Object.assign({},
    routeActions as any,
    { openModal }
  )
)(NavbarContainer)
