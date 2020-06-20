import { GET_TRANSACTIONS } from '../actions/type';

const intialState = [];

export default function(state = intialState, action) {
  switch(action.type) {
    case GET_TRANSACTIONS:
      return action.payload
    default:
      return state;
  }
}

