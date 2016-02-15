import * as React from 'react';
import * as classNames from 'classnames';
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import IAppState from '../interfaces/AppState';

interface IAddFundsFormProps {
  onSubmit: Function;
}
interface IAddFundsFormState {

}

export default class AddFundsForm extends React.Component<IAddFundsFormProps, {}> {
  render() : React.ReactElement<IAddFundsFormProps> {

    return (
      <div className='add-funds-form'>
        <label className="small-caps small text-muted">Amount</label>
        <input className="form-control form-control-lg" />

        <button className="btn btn-block btn-lg btn-success-outline m-t-3">
          <span className="small-caps small strong">ADD FUNDS</span>
        </button>

      </div>
    );
  }
}
