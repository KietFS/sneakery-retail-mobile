import {apiURl} from '../../constants';
import axios from 'axios';

const postSignIn = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${apiURl}/user/login`, {
      email: email,
      password: password,
    });
    if (response) return response;
  } catch (error: any) {
    return error;
  }
};

const getWalletInfoService = async (id: string) => {
  try {
    const response = await axios.get(
      `https://sneakery.herokuapp.com/api/wallet/get/${id}`,
    );
    if (response) return response;
  } catch (error: any) {
    return error;
  }
};

const depositService = async (
  userId: number,
  chargeAmount: number,
  token: string,
) => {
  console.log('charge amount', chargeAmount);
  try {
    const response = await axios.post(
      'https://sneakery.herokuapp.com/api/transaction/deposit',
      {
        userId: Number(userId),
        amount: Number(chargeAmount),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (response) {
      console.log('DEPOSIT RESPONSE', response?.data);
      // window.open(data.data.message);
      return response;
    }
  } catch (error: any) {
    console.log('DEPOSIT ERROR', error?.response);
    return error;
  }
};

const registerService = async (
  email: string,
  password: string,
  username: string,
  phoneNumber?: string,
) => {
  console.log(
    'username',
    username,
    'password',
    password,
    'email',
    email,
    'phoneNumber',
    phoneNumber,
  );
  try {
    const response = await axios.post(`${apiURl}/users/register`, {
      username: username,
      email: email,
      password: password,
      phoneNumber: phoneNumber,
    });
    if (response) return response;
  } catch (error) {
    console.log('REGISTER ERROR', JSON.stringify(error));
  }
};

export {postSignIn, getWalletInfoService, depositService, registerService};
