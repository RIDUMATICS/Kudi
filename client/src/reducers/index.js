import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import accountsReducer from './accountsReducer';
import transactionsReducer from './transactionsReducer';
import accountReducer from './accountReducer';


export default combineReducers({
  auth: authReducer,
  accounts: accountsReducer,
  account: accountReducer,
  transactions: transactionsReducer,
  error: errorReducer
})