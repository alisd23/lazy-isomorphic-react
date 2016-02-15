import * as React from 'react';
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux'
import { routeActions } from 'react-router-redux'
import Navbar from './Navbar';
import Alerts from './Alerts/GlobalAlerts';
import PageLoader from '../components/PageLoader';
import AddFundsModal from '../containers/Modals/AddFundsModal';
import IAppState from '../interfaces/AppState';
import Modals from '../constants/Modals';
import config from '../../config';
import { ILocation } from 'history';
const Helmet = require('react-helmet');


interface IAppProps {
  children: React.ReactElement<any>;
  location?: ILocation; // React router gives this to us
  loading?: boolean;
  openModal?: Modals;
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

          { /* MAIN SECTION */ }
          <div id ="main-container" className="flex-expand">
            { this.props.children }
            {
              this.props.loading && <PageLoader />
            }
          </div>

          { /* MODALS */ }
          <div id="modals">
            <ReactCSSTransitionGroup
              transitionName="modal"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={500}
            >

              {
                (() => {
                  switch (this.props.openModal) {
                    case Modals.ADD_FUNDS:
                      return <AddFundsModal />
                    default:
                      return null;
                  }
                })()
              }

            </ReactCSSTransitionGroup>
          </div>

        </div>
      </div>
    )
  }
}

function mapStateToProps(state: IAppState) {
  return {
    loading: state.global.loading,
    openModal: state.global.openModal
  }
}

export default connect(
  mapStateToProps,
  null
)(App)
