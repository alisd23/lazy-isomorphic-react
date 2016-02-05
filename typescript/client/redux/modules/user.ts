
import IProduct from '../../interfaces/Product';
import shop from '../../api/shop';
import { CHECKOUT_REQUEST, CHECKOUT_FAILURE, ICheckoutAction } from './cart';
import IUser from '../../interfaces/User';

export interface IUserState extends IUser {}

const initialState: IUserState = {
  id: null,
  balance: 10000,
  name: 'Guest'
}


//----------------------------//
//           Handler          //
//----------------------------//

export default function handle(user: IUserState = initialState, action: any) : IUserState {
  switch (action.type) {
    case CHECKOUT_REQUEST:
      return Object.assign({},
        user,
        { balance: user.balance -= Number((action as ICheckoutAction).total) }
      );
    case CHECKOUT_FAILURE:
    return Object.assign({},
      user,
      { balance: user.balance += Number((action as ICheckoutAction).total) }
    );
    default:
      return user;
  };
}


//----------------------------//
//           Helpers          //
//----------------------------//

export function getBalance(user: IUserState) {
  return user.balance.toFixed(2);
}
