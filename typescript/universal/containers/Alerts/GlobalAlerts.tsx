import * as React from 'react';
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux'
import { routeActions } from 'react-router-redux'
import IAlert from '../../interfaces/Alert';
import IAppState from '../../interfaces/AppState';
import Alert from '../../components/Alerts/Alert';
import { removeAlert } from '../../redux/modules/alertManager';
const Helmet = require('react-helmet');

interface IGlobalAlertsProps {
  alerts?: IAlert[];
  removeAlert?: (number) => any;
}

class GlobalAlerts extends React.Component<IGlobalAlertsProps, {}> {

  render() : React.ReactElement<IGlobalAlertsProps> {

    return (
      <div className="global-alerts">
        <ReactCSSTransitionGroup transitionName="global-alert" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
          {
            this.props.alerts.map((a) => (
              <Alert alert={a} dismissAlert={() => this.props.removeAlert(a.id)} key={a.id} />
            ))
          }
        </ReactCSSTransitionGroup>
      </div>
    )
  }
}

function mapStateToProps(state: IAppState) {
  return {
    alerts: state.alertManager.alerts
  }
}

export default connect(
  mapStateToProps,
  { removeAlert }
)(GlobalAlerts)
