import * as React from 'react';
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import IAppState from '../../interfaces/AppState';
import Modal from '../../components/Modal';
import AddFundsForm from '../../components/AddFundsForm';
import Modals from '../../constants/Modals';
import { closeModal } from '../../redux/modules/global';
import { addFunds } from '../../redux/modules/user';

interface IAddFundsModalProps {
  closeModal?: (modal: Modals) => any;
  addFunds?: (amount: number) => any;
}
interface IAddFundsModalState {}

class AddFundsModal extends React.Component<IAddFundsModalProps, {}> {

  render() : React.ReactElement<IAddFundsModalProps> {

    return (
      <Modal
        onClose={() => this.props.closeModal(Modals.ADD_FUNDS)}
        title="Add Funds"
        modalClasses="add-funds-modal"
      >
        <AddFundsForm onSubmit={(amount) => this.props.addFunds(amount)} />
      </Modal>
    );
  }
}

function mapStateToProps(state: IAppState) {
  return {
    balance: state.user.balance
  }
}

export default connect(
  mapStateToProps,
  { closeModal, addFunds }
)(AddFundsModal)
