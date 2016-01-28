import shop from '../../api/shop';
import * as types from '../../constants/productPage/ActionTypes';

/**
 * Exposed handlers (With thunk we can return the function which returns the action)
 */
export function changeRating(rating: number) {
  return (dispatch) => {
    dispatch({
      type: types.CHANGE_RATING,
      rating: rating
    });
  };
}
