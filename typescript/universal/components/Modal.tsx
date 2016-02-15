import * as React from 'react';
import * as classNames from 'classnames';
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import IAppState from '../interfaces/AppState';

const PAGE_LENGTH = 10;

interface IModalProps {
  title: string;
  modalClasses?: string;
  onClose: React.EventHandler<any>;
  children?: JSX.Element[];
}
interface IModalState {}

export default class Modal extends React.Component<IModalProps, {}> {
  render() : React.ReactElement<IModalProps> {

    return (
      <div className={classNames('modal', this.props.modalClasses)}>
        <div className="modal-backdrop" onClick={this.props.onClose}></div>
        <div className="modal-content">
          <h2 className="modal-header small-caps">{this.props.title}</h2>
          <div className="close" onClick={this.props.onClose}>
            <i className="material-icons md-36">close</i>
          </div>
          <div className="modal-body">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}
