import * as React from 'react';
import { connect } from 'react-redux'
import { routeActions } from 'react-router-redux'
import IAlert from '../../interfaces/Alert';
import { alertClasses } from '../../constants/AlertTypes';
const Helmet = require('react-helmet');
const classNames = require('classnames');

const ALERT_LIFESPAN = 300000;
interface IAlertProps {
  key?: any;
  alert?: IAlert;
  dismissAlert?: Function;
}

export default class Alert extends React.Component<IAlertProps, {}> {

  componentDidMount() {
    setTimeout(this.props.dismissAlert, ALERT_LIFESPAN);
  }

  render() : React.ReactElement<IAlertProps> {
    console.log(this.props.alert);

    return (
      <div className={classNames("alert", alertClasses[this.props.alert.type])}
          onClick={() => this.props.dismissAlert()}>
        <h5>{this.props.alert.title}</h5>
        <p className="small" dangerouslySetInnerHTML={{ __html: this.props.alert.content }}></p>
      </div>
    )
  }
}
