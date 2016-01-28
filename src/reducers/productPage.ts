import { combineReducers } from 'redux';
import { CHANGE_RATING } from '../constants/productPage/ActionTypes';
import IProduct from '../interfaces/Product';

export interface IProductPageState {
  rating?: number;
  maxRating?: number;
}
const initialState: IProductPageState = {
  rating: null,
  maxRating: 5
};

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
