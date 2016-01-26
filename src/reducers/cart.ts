
import { ADD_TO_CART, CHECKOUT_REQUEST, CHECKOUT_FAILURE } from '../constants/ActionTypes';

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
