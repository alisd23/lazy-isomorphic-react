import IProduct from '../../interfaces/Product';
import shop from '../../../client/api/shop';

// Constants
import {
  ADD_TO_CART, IAddToCartAction,
  REMOVE_FROM_CART, IRemoveFromCartAction
} from './cart';
const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS';

export interface IProductsState {
  [id: number]: IProduct;
}
const initialState: IProductsState = {};


//----------------------------//
//           Handler          //
//----------------------------//

export default function handle(products: IProductsState = initialState, action) : IProductsState {
  switch (action.type) {
    case RECEIVE_PRODUCTS: {}
      const newProductsMap = {};
      (action as IReceiveProductsAction).products.forEach((product) => {
        newProductsMap[product.id] = product;
      });
      return Object.assign(
        {},
        products,
        newProductsMap
      );
    case ADD_TO_CART: {
      action as IAddToCartAction;
      const productId: number = action.productId;
      if (productId) {
        const product: IProduct = products[productId];
        const newProduct = Object.assign(
          {},
          product,
          { quantity: product.quantity - 1 }
        );
        return Object.assign(
          {},
          products,
          { [productId]: newProduct }
        );
      }
    }
    case REMOVE_FROM_CART: {
      action as IRemoveFromCartAction;
      const productId = action.productId;
      const quantityRemoved = action.quantity;
      if (productId) {
        const product: IProduct = products[productId];
        const newProduct = Object.assign(
          {},
          product,
          { quantity: product.quantity + quantityRemoved }
        );
        return Object.assign(
          {},
          products,
          { [productId]: newProduct }
        );
      }
    }
    default:
      return products;
  }
}


//----------------------------//
//           Actions          //
//----------------------------//

export function getAllProducts() {
 return (dispatch) => {
   shop.getProducts((products: IProduct[]) => {
     const receiveProductsAction: IReceiveProductsAction = {
       type: RECEIVE_PRODUCTS,
       products: products
     }
     dispatch(receiveProductsAction);
   });
 };
}


//----------------------------//
//      Action interfaces     //
//----------------------------//

export interface IReceiveProductsAction {
  type: string;
  products: IProduct[];
}


//----------------------------//
//           Helpers          //
//----------------------------//

export function getProduct(products: IProductsState, id: string | number) : IProduct {
  return products[id];
}

export function getVisibleProducts(products: IProductsState = []) : IProduct[] {
  return Object.keys(products).map((id) => products[id]);
}
