import * as React from 'react';
import { connect } from 'react-redux'
import { routeActions } from 'react-router-redux'
import IAlert from '../../interfaces/Alert';
import { alertClasses } from '../../constants/AlertTypes';
const Helmet = require('react-helmet');
const classNames = require('classnames');

const ALERT_LIFESPAN = 4000;
interface IAlertProps {
  key?: any;
  alert?: IAlert;
  dismissAlert?: Function;
}

export default class Alert extends React.Component<IAlertProps, {}> {
  alertTimeout: number;

  componentDidMount() {
    this.alertTimeout = setTimeout(this.props.dismissAlert, ALERT_LIFESPAN);
  }

  render() : React.ReactElement<IAlertProps> {
    return (
      <div className={classNames("alert", alertClasses[this.props.alert.type])}
          onClick={() => this.dismissAlert()}>
        <h5>{this.props.alert.title}</h5>
        <p className="small" dangerouslySetInnerHTML={{ __html: this.props.alert.content }}></p>
      </div>
    )
  }

  private dismissAlert() {
    this.props.dismissAlert();
    clearTimeout(this.alertTimeout);
  }
}
