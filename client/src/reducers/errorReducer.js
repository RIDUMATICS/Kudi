
import { GET_ERROR } from './../actions/type';

const intialState = {
  component: '',
  message: ''
};

export default function(state = intialState, action) {
  switch(action.type) {
    case GET_ERROR:
      return {
        ...state,
        component: action.payload.component,
        message: action.payload.error
      }
    default:
      return state;
  }
}

