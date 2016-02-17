
import { default as global} from './modules/global';
import { default as cart} from './modules/cart';
import { default as products} from './modules/products';
import { default as user} from './modules/user';
import { default as alertManager} from './modules/alertManager';
import { routeReducer } from 'react-router-redux';

const reducers = {
  global,
  cart,
  products,
  user,
  alertManager,

  // Third party
  routing: routeReducer
}

// FOR REDUCER HOT RELOADING //

export default reducers;
