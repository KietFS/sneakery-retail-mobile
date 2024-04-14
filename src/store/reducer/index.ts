import {combineReducers} from 'redux';
import {authReducer} from '../auth/slice';
import {productReducer} from '../product/slice';
import {cartReducer} from '../cart/slice';
import {orderReducer} from '../order/slice';

const rootReducer = combineReducers({
  authReducer,
  productReducer,
  cartReducer,
  orderReducer,
});

export default rootReducer;
