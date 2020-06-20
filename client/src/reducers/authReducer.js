import _ from 'lodash';
import { SET_CURRENT_USER, SET_ENABLE2FA, SET_LOADING } from "../actions/type";


const intialState = {
  isAuthenticated: false,
  user: {},
  enable2FA: false,
  isLoading: false
};

export default function(state = intialState, action) {
  switch(action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !(_.isEmpty(action.payload)),
        user: action.payload
      };
    case SET_ENABLE2FA:
      return {
      ...state,
      enable2FA: action.payload
    }
    case SET_LOADING:
      return {
        ...state,
        isLoading: !state.isLoading
      }
    default:
      return state;
  }
}

