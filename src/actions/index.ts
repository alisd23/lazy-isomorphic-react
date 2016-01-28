import shop from '../api/shop'
import IProduct from '../interfaces/Product';
import { ICartState } from '../reducers/cart'
import * as types from '../constants/ActionTypes'

/**
 * Exposed handlers (With thunk we can return the function which returns the action)
 */
export function getAllProducts() {
  return (dispatch) => {
    shop.getProducts((products: IProduct[]) => {
      dispatch({
        type: types.RECEIVE_PRODUCTS,
        products: products
      });
    });
  };
}

export function addToCart(productId: number) {
  return (dispatch, getState) => {
    if (getState().products[productId].quantity > 0) {
      dispatch({
        type: types.ADD_TO_CART,
        productId: productId
      });
    }
  }
}

export function checkout(products: IProduct[]) {
  return (dispatch, getState) => {
    const cart: ICartState = getState().cart;

    dispatch({
      type: types.CHECKOUT_REQUEST
    });
    shop.buyProducts(products, () => {
      dispatch({
        type: types.CHECKOUT_SUCCESS,
        cart
      });
      // Replace the line above with line below to rollback on failure:
      // dispatch({ type: types.CHECKOUT_FAILURE, cart })
    });
  }
}
