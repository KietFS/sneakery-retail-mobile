import {combineReducers} from 'redux';
import {authReducer} from '../auth/slice';
import {productReducer} from '../product/slice';
import { cartReducer } from '../cart/slice';

const rootReducer = combineReducers({
  authReducer,
  productReducer,
  cartReducer,
});

export default rootReducer;
