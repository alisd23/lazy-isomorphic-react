
export const ADD_TO_CART = 'ADD_TO_CART';

export function addToCart(productId: number) {
  return (dispatch, getState) => {
    if (getState().products[productId].quantity > 0) {
      dispatch({
        type: ADD_TO_CART,
        productId: productId
      });
    }
  }
}
