import { SET_ACCOUNTS } from "../actions/type";

const intialState = [];

export default function(state = intialState, action) {
  switch(action.type) {
    case SET_ACCOUNTS:
      return action.payload
    default:
      return state;
  }
}

