
import IProduct from '../../interfaces/Product';
import shop from '../../../client/api/shop';
import { CHECKOUT_REQUEST, CHECKOUT_ERROR, ICheckoutAction } from './cart';
import IUser from '../../interfaces/User';

const initialState: IUser = {
  id: null,
  balance: 10000,
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
      { balance: user.balance += Number((action as ICheckoutAction).total) }
    );
    default:
      return user;
  };
}


//----------------------------//
//           Helpers          //
//----------------------------//

export function getBalance(user: IUser) {
  return user.balance.toFixed(2);
}
