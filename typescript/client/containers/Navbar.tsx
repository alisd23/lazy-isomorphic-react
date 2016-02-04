import * as React from 'react';
import classNames = require('classnames');
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { ILocation } from 'history';
import { routeActions } from 'react-router-redux';

// Import styles

interface INavbarProps {
  push?: (String) => any;
  routing?: ILocation;
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
      <nav className="navbar navbar-light bg-faded container-fluid">
        <a className="navbar-brand" onClick={() => this.props.push('/')}>
          <i className="material-icons md-24 text-success">shopping_cart</i>
        </a>
        <ul className="nav navbar-nav">
        {
          links.map((link) => {
            const classes = classNames({
                active: link.path === this.props.routing.pathname
              },
              'nav-item'
            );
            return (
              <li className={classes} key={link.title}>
                <a className="nav-link" onClick={() => this.props.push(link.path)}>{link.title}</a>
              </li>
            )
          })
        }
        </ul>
      </nav>
    )
  }
}

function mapStateToProps(state) {
  return {
    routing: state.routing
  }
}

export default connect(
  mapStateToProps,
  routeActions as any
)(Navbar)
