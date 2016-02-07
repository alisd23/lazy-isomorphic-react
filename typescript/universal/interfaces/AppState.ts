import { IAlertManagerState } from '../redux/modules/alertManager';
import { IProductsState } from '../redux/modules/products';
import { ICartState } from '../redux/modules/cart';
import { IProductPageState } from '../redux/modules/productPage';
import IUser from './User';

interface IAppState {
  // Core reducers
  alertManager: IAlertManagerState;
  user: IUser[];
  products: IProductsState;
  cart: ICartState;

  // Additional
  productPage: IProductPageState;
}

export default IAppState;
