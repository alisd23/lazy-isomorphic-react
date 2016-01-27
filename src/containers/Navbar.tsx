import * as React from 'react';
import classNames = require('classnames');
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { Location } from 'history';
import { routeActions } from 'react-router-redux';

interface INavbarProps {
  push?: (String) => any;
  routing?: Location;
}

const links = [
  {
    title: 'Home',
    path: '/'
  }
]

class Navbar extends React.Component<INavbarProps, {}> {

  render() : React.ReactElement<{}> {
    return (
      <nav className="navbar navbar-light bg-faded container-fluid">
        <a className="navbar-brand" onClick={() => this.props.push('/')}>
          <i className="material-icons md-48" style={{verticalAlign: 'middle'}}>shopping_cart</i>
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
