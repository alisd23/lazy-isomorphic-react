
import IProduct from '../../interfaces/Product';
import shop from '../../api/shop';
import { IProductsState, getProduct } from './products';

export const ADD_TO_CART = 'ADD_TO_CART';
export const CHECKOUT_REQUEST = 'CHECKOUT_REQUEST';
export const CHECKOUT_FAILURE = 'CHECKOUT_FAILURE';
export const CHECKOUT_SUCCESS = 'CHECKOUT_SUCCESS';

interface ICartItem {
  id: number;
  quantity: number;
}
export interface ICartState {
  [id: number]: ICartItem;
}

const initialState: ICartState = {}


//----------------------------//
//           Handler          //
//----------------------------//

export default function handle(state: ICartState = initialState, action) : ICartState {
  switch (action.type) {
    case CHECKOUT_REQUEST:
      return initialState;
    case CHECKOUT_FAILURE:
      return action.cart;
    case ADD_TO_CART:
      const productId = action.productId as number;
      const currentItems = state;
      const newItems = Object.assign(
        {},
        currentItems,
        {
          [productId]: {
            quantity: (currentItems[productId] ? currentItems[productId].quantity : 0) + 1
          }
        }
      );
      return newItems;
    default:
      return state;
  };
}


//----------------------------//
//           Actions          //
//----------------------------//

export function checkout(products: IProduct[]) {
 return (dispatch, getState) => {
   const cart: ICartState = getState().cart;
   const products: IProductsState = getState().products;

   const checkoutRequestAction: ICheckoutAction = {
     type: CHECKOUT_REQUEST,
     cart,
     total: Number(getTotal(products, cart))
   }
   dispatch(checkoutRequestAction);

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

export function addToCart(productId: number) {
  return (dispatch, getState) => {
    if (getState().products[productId].quantity > 0) {
      const addToCartAction: IAddToCartAction = {
        type: ADD_TO_CART,
        productId: productId
      }
      dispatch(addToCartAction);
    }
  }
}

//----------------------------//
//      Action interfaces     //
//----------------------------//

export interface ICheckoutAction {
  type: string;
  cart: ICartState;
  total: number;
}
export interface IAddToCartAction {
  type: string;
  productId: number;
}


//----------------------------//
//           Helpers          //
//----------------------------//

export function getProducts(products: IProductsState, cart: ICartState) : IProduct[] {
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

export function getQuantity(state: ICartState, productId: number | string) : number {
  return state[productId].quantity || 0;
}

export function getAddedIds(state: ICartState) : string[] {
  return Object.keys(state);
}
