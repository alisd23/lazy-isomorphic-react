import * as React from 'react';
import classNames = require('classnames');
import ILink from '../interfaces/Link';
import IUser from '../interfaces/User';


// Import styles

interface INavbarProps {
  clickNavLink?: (string) => any;
  routing?: any;
  user?: IUser;
  links: ILink[];
}


export default class NavbarComponent extends React.Component<INavbarProps, {}> {

  render() : React.ReactElement<{}> {

    return (
      <div className="flex-static bg-faded p-y-1">
        <div className="container">
          <nav className="navbar navbar-light container-fluid flex row-center">
            <a className="navbar-brand m-r-2 flex-static" onClick={() => this.props.clickNavLink('/')}>
              <i className="material-icons md-24 text-success">shopping_cart</i>
            </a>
            <ul className="nav navbar-nav flex-expand">
            {
              this.props.links.map((link) => {
                const classes = classNames(
                  {
                    'strong active': link.path === (this.props.routing.location
                      && this.props.routing.location.pathname)
                  },
                  'nav-item'
                );
                return (
                  <li className={classes} key={link.title}>
                    <a className="nav-link small-caps" onClick={() => this.props.clickNavLink(link.path)}>
                      {link.title}
                    </a>
                  </li>
                )
              })
            }
            </ul>
            <div className="flex-static">
              <span className="small-caps small">Balance: </span>
              <span><strong> £{this.props.user.balance.toFixed()}</strong></span>
            </div>
          </nav>
        </div>
      </div>
    )
  }
}
