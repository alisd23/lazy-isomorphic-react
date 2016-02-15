import IProduct from '../../interfaces/Product';
import IAction from '../../interfaces/Action';
import shop from '../../../client/api/shop';

// Constants
import {
  ADD_TO_CART, IAddToCartAction,
  REMOVE_FROM_CART, IRemoveFromCartAction,
  DELETE_FROM_CART, IDeleteFromCartAction
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

    //--------------------------------//
    //  RECEIVE PRODUCTS FROM SERVER  //
    //--------------------------------//
    case RECEIVE_PRODUCTS: {
      const newProducts = (action as IReceiveProductsAction).products;
      const newProductsMap = {};
      newProducts.forEach((product) => {
        newProductsMap[product.id] = product;
      });

      return Object.assign(
        {},
        products,
        newProductsMap
      );
    }
    //------------------------//
    //  ADD NEW ITEM TO CART  //
    //------------------------//
    case ADD_TO_CART: {
      const { productId} = action as IAddToCartAction;

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
      break;
    }
    //-------------------------//
    //  REMOVE ITEM FROM CART  //
    //-------------------------//
    case REMOVE_FROM_CART: {
      const { productId} = action as IRemoveFromCartAction;

      if (productId) {
        const product: IProduct = products[productId];
        const newProduct = Object.assign(
          {},
          product,
          { quantity: product.quantity + 1 }
        );
        return Object.assign(
          {},
          products,
          { [productId]: newProduct }
        );
      }
      break;
    }
    //-------------------------//
    //  DELETE ITEM FROM CART  //
    //-------------------------//
    case DELETE_FROM_CART: {
      const { productId, oldQuantity} = action as IDeleteFromCartAction;

      if (productId) {
        const product: IProduct = products[productId];
        const newProduct = Object.assign(
          {},
          product,
          { quantity: product.quantity + oldQuantity }
        );
        return Object.assign(
          {},
          products,
          { [productId]: newProduct }
        );
      }
      break;
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

export function newProductReceived(product: IProduct) {
  return (dispatch) => {
    const receiveProductsAction: IReceiveProductsAction = {
      type: RECEIVE_PRODUCTS,
      products: [product]
    }
    dispatch(receiveProductsAction);
  };
}


//----------------------------//
//      Action interfaces     //
//----------------------------//

export interface IReceiveProductsAction extends IAction {
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
