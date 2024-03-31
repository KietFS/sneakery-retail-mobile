import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import {logOutAccount, postRegisterAccount} from '../store/auth/actions';

const useAuth = () => {
  const {
    accessToken,
    userInfo,
    accountBalance,
    isDepositting,
    isRegisterLoading,
  } = useSelector((state: RootState) => state.authReducer);
  const dispatch = useDispatch();

  const dispatchLogoutAccount = () => dispatch(logOutAccount());

  const dispatchRegisterAccount = (
    email: string,
    password: string,
    username: string,
    phoneNumber?: string,
  ) => {
    dispatch(postRegisterAccount({email, password, username, phoneNumber}));
  };

  const isAuthenticated = !!accessToken;

  console.log('ACCESS TOKEN IS', accessToken);

  return {
    isAuthenticated,
    isRegisterLoading,
    accessToken,
    dispatchLogoutAccount,
    userInfo,
    accountBalance,
    isDepositting,
    dispatchRegisterAccount,
  };
};

export {useAuth};
