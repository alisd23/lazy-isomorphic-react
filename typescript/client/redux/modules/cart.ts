
import IProduct from '../../interfaces/Product';
import shop from '../../api/shop';
import { ADD_TO_CART } from './shared';
import { IProductsState, getProduct } from './products';

const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS';
const CHECKOUT_SUCCESS = 'CHECKOUT_REQUEST';
const CHECKOUT_REQUEST = 'CHECKOUT_REQUEST';
const CHECKOUT_FAILURE = 'CHECKOUT_FAILURE';

interface ICartItem {
  id: number;
  quantity: number;
}
interface ICartItemsObject {
  [id: number]: ICartItem;
}
export interface ICartState {
  items: ICartItemsObject;
}

const initialState: ICartState  = {
  items: []
}

export default function handle(state: ICartState = initialState, action) : ICartState {
  switch (action.type) {
    case CHECKOUT_REQUEST:
      return initialState;
    case CHECKOUT_FAILURE:
      return action.cart;
    case ADD_TO_CART:
      const productId = action.productId as number;
      const currentItems = state.items;
      const newItems = Object.assign(
        {},
        currentItems,
        {
          [productId]: {
            quantity: (currentItems[productId] ? currentItems[productId].quantity : 0) + 1
          }
        }
      );

      return {
        items: newItems
      }
    default:
      return {
        items: state.items
      };
  };
}

export function getQuantity(state: ICartState, productId: number | string) : number {
  return state.items[productId].quantity || 0;
}

export function getAddedIds(state: ICartState) : string[] {
  return Object.keys(state.items);
}

// Actions
export function checkout(products: IProduct[]) {
 return (dispatch, getState) => {
   const cart: ICartState = getState().cart;

   dispatch({
     type: CHECKOUT_REQUEST
   });
   shop.buyProducts(products, () => {
     dispatch({
       type: CHECKOUT_SUCCESS,
       cart
     });
     // Replace the line above with line below to rollback on failure:
     // dispatch({ type: types.CHECKOUT_FAILURE, cart })
   });
 }
}

export function getProducts(products: IProductsState, cart: ICartState) {
  return getAddedIds(cart).map(id => (
    Object.assign(
      {},
      getProduct(products, id),
      { quantity: getQuantity(cart, id) }
    )
  ))
}

export function getTotal(products: IProductsState, cart: ICartState) {
  return getAddedIds(cart).reduce((total, id) =>
    total + getProduct(products, id).price * getQuantity(cart, id),
    0
  ).toFixed(2);
}
