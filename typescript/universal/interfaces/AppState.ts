import { IAlertManagerState } from '../redux/modules/alertManager';
import { IProductsState } from '../redux/modules/products';
import { ICartState } from '../redux/modules/cart';
import { IProductPageState } from '../redux/modules/productPage';
import IRoutingState from './RoutingState';
import IGlobalState from './GlobalState';
import IUser from './User';

interface IAppState {
  // Core reducers
  global: IGlobalState;
  alertManager: IAlertManagerState;
  user: IUser[];
  products: IProductsState;
  cart: ICartState;
  routing: IRoutingState;

  // Additional
  productPage: IProductPageState;
}

export default IAppState;
