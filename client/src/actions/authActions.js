import axios from 'axios';
import _ from 'lodash';
import {
  GET_ERROR,
  SET_CURRENT_USER,
  SET_ENABLE2FA,
  SET_LOADING
} from './type';
import setAuthToken from '../utils/setAuthToken';

// Register User
export const registerUser = (data, history) => dispatch => {
  dispatch({
    type: SET_LOADING
  });
  return axios
    .post('http://localhost:4000/api/v1/auth/signup', data)
    .then((res) => {
      const {
        token,
        user
      } = res.data.data;
      // save token to localStorage
      localStorage.setItem('jwtToken', token);
      // set token to Auth header
      setAuthToken(token);
      dispatch({
        type: SET_LOADING
      });
      dispatch({
        type: GET_ERROR,
        payload: '',
      });
      dispatch({
        type: SET_CURRENT_USER,
        payload: user
      });
      return history.push('/dashboard')
    })
    .catch((err) => {
      let errorResp;
      if (_.has(err.response, 'data')) {
        const {
          error,
          status
        } = err.response.data;
        if (status === 500) {
          errorResp = 'This is not you, Please try again';
        } else {
          errorResp = error;
        }
      } else {
        errorResp = 'This is not you, Please try again';
      }
      dispatch({
        type: SET_LOADING
      });
      return dispatch({
        type: GET_ERROR,
        payload: {
          component: 'signUp',
          error: errorResp
        },
      })
    })
}

// Login User
export const loginUser = (data, history) => dispatch => {
  dispatch({
    type: SET_LOADING
  });
  return axios
    .post('http://localhost:4000/api/v1/auth/signin', data)
    .then((res) => {
      const {
        token,
        user
      } = res.data.data;

      // save token to localStorage
      localStorage.setItem('jwtToken', token);
      // set token to Auth header
      setAuthToken(token);
      dispatch({
        type: SET_LOADING
      });
      dispatch({
        type: SET_CURRENT_USER,
        payload: user
      });

      if (user.enable2FA) {
        dispatch({
          type: SET_ENABLE2FA,
          payload: true,
        });

      } else {
        dispatch({
          type: GET_ERROR,
          payload: '',
        });

        return history.push('/dashboard');
      }
    })
    .catch(err => {
      console.log(err.response)
      let errorResp;
      if (_.has(err.response, 'data')) {
        const {
          error,
          status
        } = err.response.data;
        if (status === 500) {
          errorResp = 'This is not you, Please try again';
        } else {
          errorResp = error;
        }
      } else {
        errorResp = 'This is not you, Please try again';
      }
      dispatch({
        type: SET_LOADING
      });
      return dispatch({
        type: GET_ERROR,
        payload: {
          component: 'logIn',
          error: errorResp
        },
      })
    })
}

export const disable2FA = () => ({
  type: SET_ENABLE2FA,
  payload: false
})

export const verifyToken = (data, history) => (dispatch) => {
  dispatch({
    type: SET_LOADING
  });
  axios
    .post('http://localhost:4000/api/v1/auth/2fa', data)
    .then(res => {
      const {
        token,
        user
      } = res.data.data;

      dispatch({
        type: SET_LOADING
      });

      // save token to localStorage
      localStorage.setItem('jwtToken', token);
      // set token to Auth header
      setAuthToken(token);
      dispatch({
        type: SET_CURRENT_USER,
        payload: user
      });
      dispatch({
        type: SET_ENABLE2FA,
        payload: false,
      });

      return history.push('/dashboard');
    })
    .catch(err => {
      dispatch({
        type: SET_LOADING
      });

      return dispatch({
        type: GET_ERROR,
        payload: {
          component: 'verifyToken',
          error: err.response.data.error
        },
      });
    });

}

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  dispatch({
    type: SET_LOADING
  });
  // Remove token from localStorage
  localStorage.removeItem('jwtToken');
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};

export const changePassword = (data) => dispatch => {
  dispatch({
    type: SET_LOADING
  });
  axios
    .patch('http://localhost:4000/api/v1/auth/update', data)
    .then(res => logoutUser())
    .catch(err => console.log(err.response));
}

export const updateDetails = (data) => dispatch => {
  dispatch({
    type: SET_LOADING
  });
  axios
    .patch('http://localhost:4000/api/v1/auth/update', data)
    .then(res => {
      console.log(res)
      dispatch({
        type: SET_CURRENT_USER,
        payload: res.data.data
      });
    })
    .catch(err => console.log(err.response));
}