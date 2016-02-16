
import IProduct from '../../interfaces/Product';
import IAction from '../../interfaces/Action';
import shop from '../../../client/api/shop';
import { IProductsState, getProduct } from './products';
import { ADD_ALERT, addAlert } from './alertManager';
import AlertTypes, { alertClasses } from '../../constants/AlertTypes';

export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const DELETE_FROM_CART = 'DELETE_FROM_CART';
export const CHECKOUT_REQUEST = 'CHECKOUT_REQUEST';
export const CHECKOUT_ERROR = 'CHECKOUT_FAILURE';
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

export default function handle(cart: ICartState = initialState, action) : ICartState {
  switch (action.type) {

    //---------------------//
    //  CHECKOUT HANDLERS  //
    //---------------------//
    case CHECKOUT_REQUEST:
      // Empty cart
      return initialState;
    case CHECKOUT_SUCCESS:
    case CHECKOUT_ERROR: {
      const { cart } = action as ICheckoutAction;
      return cart;
    }
    //------------------------//
    //  ADD NEW ITEM TO CART  //
    //------------------------//
    case ADD_TO_CART: {
      const { productId } = action as IAddToCartAction;
      const newCart = Object.assign(
        {},
        cart,
        {
          [productId]: {
            id: productId,
            quantity: (cart[productId] ? cart[productId].quantity : 0) + 1
          }
        }
      );
      return newCart;
    }
    //-------------------------//
    //  REMOVE ITEM FROM CART  //
    //-------------------------//
    case REMOVE_FROM_CART: {
      const { productId } = action as IRemoveFromCartAction;
      const newCart = Object.assign(
        {},
        cart,
        {
          [productId]: {
            id: productId,
            quantity: (cart[productId] ? cart[productId].quantity : 0) - 1
          }
        }
      );
      if (newCart[productId].quantity <= 0) {
        delete newCart[productId];
      }
      return newCart;
    }
    //-------------------------//
    //  DELETE ITEM FROM CART  //
    //-------------------------//
    case DELETE_FROM_CART: {
      const { productId } = action as IDeleteFromCartAction;
      const newCart = Object.assign(
        {},
        cart
      );
      delete newCart[productId];
      return newCart;
    }

    default:
      return cart;
  };
}


//----------------------------//
//           Actions          //
//----------------------------//

export function checkout(products: IProduct[]) {
 return (dispatch, getState) => {
   const cart: ICartState = getState().cart;
   const products: IProductsState = getState().products;
   const balance: number = getState().user.balance;
   const total: number = Number(getTotal(products, cart));

   const checkoutRequestAction: ICheckoutAction = {
     type: CHECKOUT_REQUEST,
     cart,
     total
   }

   // Dispatch checkout request (Optimistic UI)
   dispatch(checkoutRequestAction);

   shop.buyProducts(
     getProducts(products, cart),
     total,
     balance,
     // Success
     () => {
       dispatch({
         type: CHECKOUT_SUCCESS,
         cart: getState().cart  // Return whatever CURRENT cart value is
       });
       dispatch(addAlert({
         title: 'Thanks for shopping!',
         content: `Your purchase of <strong>£${total}</strong> was successful`,
         type: AlertTypes.SUCCESS
       }));
     },
     // ERROR
     (errMsg) => {
       dispatch({
         type: CHECKOUT_ERROR,
         cart, // Return cart value before checkout action occurred
         total: total
       });
       dispatch(addAlert({
         title: 'Checkout error :(',
         content: errMsg || 'Sorry, a checkout error occurs 40% of the time, this application consistently doesn\'t work very well.',
         type: AlertTypes.ERROR
       }));
     }
     // Replace the line above with line below to rollback on failure:
     // dispatch({ type: types.CHECKOUT_FAILURE, cart })
   );
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

export function removeFromCart(productId: number) {
  return (dispatch, getState) => {
    const cartProduct = getState().cart[productId];
    if (cartProduct && cartProduct.quantity > 0) {
      const removeFromCartAction: IRemoveFromCartAction = {
        type: REMOVE_FROM_CART,
        productId: productId
      }
      dispatch(removeFromCartAction);
    }
  }
}

export function deleteFromCart(productId: number) {
  return (dispatch, getState) => {
    const cartProduct: IProduct = getState().cart[productId];
    if (cartProduct) {
      const deleteFromCartAction: IDeleteFromCartAction = {
        type: DELETE_FROM_CART,
        productId: productId,
        oldQuantity: cartProduct.quantity
      }
      dispatch(deleteFromCartAction);
    }
  }
}

//----------------------------//
//      Action interfaces     //
//----------------------------//

export interface ICheckoutAction extends IAction {
  cart: ICartState;
  total: number;
}
export interface IAddToCartAction extends IAction {
  productId: number;
}
export interface IRemoveFromCartAction extends IAction {
  productId: number;
}
export interface IDeleteFromCartAction extends IAction {
  productId: number;
  oldQuantity: number;
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
