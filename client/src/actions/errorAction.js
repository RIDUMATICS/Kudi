import {
  GET_ERROR
} from './type';

export const clearError = () => ({
  type: GET_ERROR,
  payload: {
    component: '',
    error: ''
  }
})