import * as React from 'react';
import classNames = require('classnames');
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { ILocation } from 'history';
import { routeActions } from 'react-router-redux';
import getClass from '../../helpers/classesHelper';

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
    const styles = require('../../../sass/common.scss');

    return (
      <nav className={getClass("navbar navbar-light bg-faded container-fluid", styles)}>
        <a className={getClass("navbar-brand", styles)} onClick={() => this.props.push('/')}>
          <i className={getClass("material-icons md-24", styles)} style={{verticalAlign: 'middle'}}>shopping_cart</i>
        </a>
        <ul className={getClass("nav navbar-nav", styles)}>
        {
          links.map((link) => {
            const classes = classNames({
                active: link.path === this.props.routing.pathname
              },
              'nav-item'
            );
            return (
              <li className={getClass(classes, styles)} key={link.title}>
                <a className={getClass("nav-link", styles)} onClick={() => this.props.push(link.path)}>{link.title}</a>
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
