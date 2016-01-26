import { combineReducers } from 'redux'
import { default as cart, ICartState, getQuantity, getAddedIds } from './cart'
import { default as products, IProductsState, getProduct } from './products'

interface IMainState {
  cart?: ICartState;
  products?: IProductsState;
}

export function getTotal(state: IMainState) {
  return getAddedIds(state.cart).reduce((total, id) =>
    total + getProduct(state.products, id).price * getQuantity(state.cart, id),
    0
  ).toFixed(2);
}

export function getCartProducts(state: IMainState) {
  return getAddedIds(state.cart).map(id => (
    Object.assign(
      {},
      getProduct(state.products, id),
      { quantity: getQuantity(state.cart, id) }
    )
  ))
}


// Top level Reducers
export default combineReducers({
  cart,
  products
})
