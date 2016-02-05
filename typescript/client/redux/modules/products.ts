import IProduct from '../../interfaces/Product';
import shop from '../../api/shop';

// Constants
import { ADD_TO_CART, IAddToCartAction } from './cart';
const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS';

export interface IProductsState {
  [id: number]: IProduct;
}
const initialState: IProductsState = {};


//----------------------------//
//           Handler          //
//----------------------------//

export default function handle(state: IProductsState = initialState, action) : IProductsState {
  switch (action.type) {
    case RECEIVE_PRODUCTS:
      const newProductsMap = {};
      (action as IReceiveProductsAction).products.forEach((product) => {
        newProductsMap[product.id] = product;
      });
      return Object.assign(
        {},
        state,
        newProductsMap
      );
    case ADD_TO_CART:
      const productId: number = (action as IAddToCartAction).productId;
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
