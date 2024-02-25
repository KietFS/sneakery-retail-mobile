import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import {
  deposit,
  logOutAccount,
  postRegisterAccount,
  refreshWallet,
} from '../store/auth/actions';

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

  const dispatchDeposit = (chargeAmount: number) => {
    dispatch(deposit({userId: userInfo?.id, chargeAmount, token: accessToken}));
  };

  const dispatchRefreshWallet = () => {
    dispatch(refreshWallet({userId: userInfo.id}));
  };

  const dispatchRegisterAccount = (
    email: string,
    password: string,
    username: string,
    phoneNumber?: string,
  ) => {
    dispatch(postRegisterAccount({email, password, username, phoneNumber}));
  };

  const isAuthenticated = !!accessToken;

  return {
    isAuthenticated,
    isRegisterLoading,
    accessToken,
    dispatchLogoutAccount,
    userInfo,
    accountBalance,
    dispatchDeposit,
    isDepositting,
    dispatchRefreshWallet,
    dispatchRegisterAccount,
  };
};

export {useAuth};
