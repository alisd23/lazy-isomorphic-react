
import IProduct from '../../interfaces/Product';
import shop from '../../../client/api/shop';
import { CHECKOUT_REQUEST, CHECKOUT_ERROR, ICheckoutAction } from './cart';
import IUser from '../../interfaces/User';
import IAlert from '../../interfaces/Alert';
import IAction from '../../interfaces/Action';
import AlertTypes from '../../constants/AlertTypes';

const ALERT_LIFESPAN = 4000;

export interface IAlertManagerState {
  alerts: IAlert[];
  IDTracker: number;
}
const initialState: IAlertManagerState = {
  alerts: [],
  IDTracker: 0
};

export const ADD_ALERT = 'ADD_ALERT';
export const REMOVE_ALERT = 'REMOVE_ALERT';

//----------------------------//
//           Handler          //
//----------------------------//

export default function handle(state: IAlertManagerState = initialState, action: any) : IAlertManagerState {
  switch (action.type) {
    case ADD_ALERT:
      const alert = (action as IAddAlertAction);
      return {
        IDTracker: state.IDTracker + 1,
        alerts: state.alerts.concat({
          id: state.IDTracker,
          title: alert.title,
          content: alert.content,
          type: alert.alertType
        })
      };
    case REMOVE_ALERT:
      action as IRemoveAlertAction;
      const index = state.alerts.indexOf(getAlert(state.alerts, action.id));
      const newAlerts: IAlert[] = index > -1
        ? state.alerts.slice(0, index).concat(state.alerts.slice(index + 1))
        : state.alerts;
      return Object.assign({},
        state,
        { alerts: newAlerts }
      );
    default:
      return state;
  };
}


//----------------------------//
//           Actions          //
//----------------------------//

export function addAlert(alert: IAlert) {
  return (dispatch, getState) => {
    const addAlertAction: IAddAlertAction = {
      type: ADD_ALERT,
      title: alert.title,
      content: alert.content,
      alertType: alert.type
    }
    dispatch(addAlertAction);
  }
}
export function removeAlert(id: number) {
  return (dispatch, getState) => {
    const removeAlertAction: IRemoveAlertAction = {
      type: REMOVE_ALERT,
      id
    }
    dispatch(removeAlertAction);
  }
}

//----------------------------//
//      Action interfaces     //
//----------------------------//

export interface IAddAlertAction extends IAction {
  title: string;
  content: string;
  alertType: AlertTypes;
}
export interface IRemoveAlertAction extends IAction {
  id: number;
}


//----------------------------//
//           Helpers          //
//----------------------------//

export function getAlert(alerts: IAlert[], id: number) {
  for (let alert of alerts) {
    if (alert.id === id)
      return alert;
  }
}
