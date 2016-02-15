
import IGlobalState from '../../interfaces/GlobalState';
import IAppState from '../../interfaces/AppState';
import IAction from '../../interfaces/Action';
import Modals from '../../constants/Modals';
import { UPDATE_LOCATION } from 'react-router-redux';

const START_LOADING = UPDATE_LOCATION;
const END_LOADING = 'END_LOADING';
const OPEN_MODAL = 'OPEN_MODAL';
const CLOSE_MODAL = 'CLOSE_MODAL';

const initialState: IGlobalState = {
  loading: false,
  openModal: null
}


//----------------------------//
//           Handler          //
//----------------------------//

export default function handle(state: IGlobalState = initialState, action: any) : IGlobalState {
  switch (action.type) {
    case START_LOADING:
      return Object.assign({},
        state,
        { loading: true }
      );
    case END_LOADING:
      return Object.assign({},
        state,
        { loading: false }
      );
    case OPEN_MODAL:
      const { modal } = action as IOpenModalAction;
      return Object.assign({},
        state,
        { openModal: modal }
      );
    case CLOSE_MODAL:
      return Object.assign({},
        state,
        { openModal: null }
      );
    default:
      return state;
  };
}


//----------------------------//
//           Actions          //
//----------------------------//

export function startLoading() {
  return (dispatch) => {
    dispatch({
      type: START_LOADING
    });
  }
}

export function endLoading(path: string) {
  return (dispatch, getState) => {
    const state: IAppState = getState();

    if (state.routing.location.pathname === path) {
      dispatch({
        type: END_LOADING
      });
    }
  }
}

export function openModal(modal: Modals) {
  return (dispatch) => {
    const action: IOpenModalAction = {
      type:   OPEN_MODAL,
      modal:  modal
    }
    dispatch(action);
  }
}

export function closeModal(modal: Modals) {
  return (dispatch, getState) => {
    const state: IAppState = getState();
    if (state.global.openModal === modal) {
      dispatch({
        type: CLOSE_MODAL
      });
    }
  }
}


//-------------------------------//
//       Action Interfaces       //
//-------------------------------//

interface IOpenModalAction extends IAction {
  modal: Modals;
}
