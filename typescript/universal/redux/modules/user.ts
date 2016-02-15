
import IProduct from '../../interfaces/Product';
import shop from '../../../client/api/shop';
import { CHECKOUT_REQUEST, CHECKOUT_ERROR, ICheckoutAction } from './cart';
import IUser from '../../interfaces/User';
import IAction from '../../interfaces/Action';

const ADD_FUNDS = 'ADD_FUNDS';

const initialState: IUser = {
  id: null,
  balance: 2000,
  name: 'Guest'
}


//----------------------------//
//           Handler          //
//----------------------------//

export default function handle(user: IUser = initialState, action: any) : IUser {
  switch (action.type) {
    case CHECKOUT_REQUEST:
      return Object.assign({},
        user,
        { balance: user.balance -= Number((action as ICheckoutAction).total) }
      );
    case CHECKOUT_ERROR:
      return Object.assign({},
        user,
        { balance: user.balance += (action as ICheckoutAction).total }
      );
    case ADD_FUNDS:
      const { amount } = action as IAddFundsAction;
      return Object.assign({},
        user,
        { balance: user.balance += amount }
      );
    default:
      return user;
  };
}


//----------------------------//
//           Actions          //
//----------------------------//

export function addFunds(amount: number) {
  return (dispatch) => {
    const addFundsAction: IAddFundsAction = {
      type: ADD_FUNDS,
      amount: amount
    }
    dispatch(addFundsAction);
  }
}


//-------------------------------//
//       Action Interfaces       //
//-------------------------------//

interface IAddFundsAction extends IAction {
  amount: number;
}


//----------------------------//
//           Helpers          //
//----------------------------//

export function getBalance(user: IUser) : string {
  return user.balance.toFixed(2);
}
