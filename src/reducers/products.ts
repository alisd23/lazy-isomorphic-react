import { combineReducers } from 'redux';
import { RECEIVE_PRODUCTS, ADD_TO_CART } from '../constants/ActionTypes';
import IProduct from '../interfaces/Product';

export interface IProductsState {
  [id: number]: IProduct;
}
const initialState: IProductsState = {};

export default function handle(state: IProductsState = initialState, action) : IProductsState {
  switch (action.type) {
    case RECEIVE_PRODUCTS:
      const newProductsMap = {};
      action.products.forEach((product) => newProductsMap[product.id] = product);
      return Object.assign(
        {},
        state,
        newProductsMap
      );
    case ADD_TO_CART:
      const productId: number = action.productId;
      if (productId) {
        const product: IProduct = state[productId];
        const newProduct = Object.assign(
          {},
          product,
          { quantity: product.quantity - 1 }
        );
        return Object.assign(
          {},
          state,
          { [productId]: newProduct }
        );
      }
    default:
      return state;
  }
}

export function getProduct(products: IProductsState, id) : IProduct {
  return products[id];
}

export function getVisibleProducts(products: IProductsState) : IProduct[] {
  return Object.keys(products).map((id) => products[id]);
}
