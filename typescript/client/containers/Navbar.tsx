import * as React from 'react';
import classNames = require('classnames');
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { ILocation } from 'history';
import { routeActions } from 'react-router-redux';
import { IUserState } from '../redux/modules/user';

// Import styles

interface INavbarProps {
  push?: (String) => any;
  routing?: any;
  user?: IUserState;
}

const links = [
  {
    title: 'Home',
    path: '/'
  }
]

class Navbar extends React.Component<INavbarProps, {}> {

  render() : React.ReactElement<{}> {
    require('../../../sass/common.scss');

    return (
      <div className="bg-faded p-y-1">
        <div className="container">
          <nav className="navbar navbar-light container-fluid flex row-center">
            <a className="navbar-brand m-r-2 flex-static" onClick={() => this.props.push('/')}>
              <i className="material-icons md-24 text-success">shopping_cart</i>
            </a>
            <ul className="nav navbar-nav flex-expand">
            {
              links.map((link) => {
                const classes = classNames(
                  {
                    'strong active': link.path === (this.props.routing.location
                      && this.props.routing.location.pathname)
                  },
                  'nav-item'
                );
                return (
                  <li className={classes} key={link.title}>
                    <a className="nav-link small-caps" onClick={() => this.props.push(link.path)}>{link.title}</a>
                  </li>
                )
              })
            }
            </ul>
            <div className="flex-static">
              <span className="small-caps small">Balance: </span>
              <span><strong> £{this.props.user.balance}</strong></span>
            </div>
          </nav>
        </div>
      </div>
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
)(Navbar)
