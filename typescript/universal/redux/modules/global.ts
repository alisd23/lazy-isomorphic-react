
import IGlobalState from '../../interfaces/GlobalState';
import { UPDATE_LOCATION } from 'react-router-redux';

const START_LOADING = UPDATE_LOCATION;
const END_LOADING = 'END_LOADING';

const initialState: IGlobalState = {
  loading: false
}


//----------------------------//
//           Handler          //
//----------------------------//

export default function handle(state: IGlobalState = initialState, action: any) : IGlobalState {
  switch (action.type) {
    case START_LOADING:
      return Object.assign({},
        state,
        { loading: true }
      );
    case END_LOADING:
      return Object.assign({},
        state,
        { loading: false }
      );
    default:
      return state;
  };
}


//----------------------------//
//           Actions          //
//----------------------------//

export function startLoading() {
  return (dispatch) => {
    dispatch({
      type: START_LOADING
    });
  }
}

export function endLoading() {
  return (dispatch) => {
    dispatch({
      type: END_LOADING
    });
  }
}
