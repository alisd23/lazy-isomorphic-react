import { combineReducers } from 'redux';
import IProduct from '../../interfaces/Product';

// Action constants
const CHANGE_RATING = 'CHANGE_RATING';

export interface IProductPageState {
  rating?: number;
  maxRating?: number;
}
const initialState: IProductPageState = {
  rating: 0,
  maxRating: 5
};

//----------------------------//
//           Handler          //
//----------------------------//

export default function handle(state: IProductPageState = initialState, action) : IProductPageState {
  switch (action.type) {
    case CHANGE_RATING:
      const rating: number = action.rating || 0;
      return Object.assign(
        {},
        state,
        { rating: rating }
      );
    default:
      return state;
  }
}


//----------------------------//
//           Actions          //
//----------------------------//

export function changeRating(rating: number) {
  return (dispatch) => {
    const changeRatingAction: IChangeRatingAction = {
      type: CHANGE_RATING,
      rating: rating
    }
    dispatch(changeRatingAction);
  };
}


//----------------------------//
//      Action interfaces     //
//----------------------------//

export interface IChangeRatingAction {
  type: string;
  rating: number;
}
