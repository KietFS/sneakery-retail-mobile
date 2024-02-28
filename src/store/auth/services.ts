import {apiURl} from '../../constants';
import axios from 'axios';

const postSignIn = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${apiURl}/users/login`, {
      email: email,
      password: password,
    });
    if (response) return response;
  } catch (error: any) {
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

const verifyOTPService = async (userId: string, code: string) => {
  try {
    const response = await axios.post(`${apiURl}/users/verifyOTP/${userId}`, {
      code: code,
    });
    if (response) return response;
  } catch (error) {
    console.log('Verify OTP Error', JSON.stringify(error));
  }
};

export {postSignIn, registerService, verifyOTPService};
