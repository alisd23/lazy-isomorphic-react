import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as classNames from 'classnames';
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import IAppState from '../interfaces/AppState';
import Finput from './Finput';

interface IAddFundsFormProps {
  onSubmit: Function;
}
interface IAddFundsFormState {}

export default class AddFundsForm extends React.Component<IAddFundsFormProps, {}> {
  render() : React.ReactElement<IAddFundsFormProps> {

    return (
      <div className='add-funds-form'>
        <label className="small-caps small text-muted">Amount</label>
        <Finput className="form-control form-control-lg" ref="finput" />

        <button className="btn btn-block btn-lg btn-success-outline m-t-3"
          onClick={() => this.addFunds()}>
          <span className="small-caps small strong">ADD FUNDS</span>
        </button>

      </div>
    );
  }

  addFunds() {
    console.log(this.refs['finput']);
    const finput = this.refs['finput'] as Finput;
    this.props.onSubmit(finput.getRawValue());
  }
}
