import axios from 'axios';
import {IAddToCartPayload, OrderStatusEnum} from '../@types';
import {apiURl} from '../../constants';

const getCartItems = async (token: string) => {
  try {
    const response = await axios.get(`${apiURl}/carts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response) {
      return response;
    }
  } catch (error) {
    console.log('Error', error);
  }
};

const addToCartService = async (token: string, payload: IAddToCartPayload) => {
  try {
    const response = await axios.post(
      `${apiURl}/carts`,
      {
        ...payload,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (response) return response;
  } catch (error) {
    console.log('ADD TO CART ERROR', JSON.stringify(error));
  }
};

const removeCartItemService = async (token: string, id: string | number) => {
  try {
    const response = await axios.delete(`${apiURl}/carts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response) return response;
  } catch (error) {
    console.log('ADD TO CART ERROR', JSON.stringify(error));
  }
};

const checkOutCartService = async (
  token: string,
  cartId: string[],
  address: string,
  rewardPoints?: number,
  paymentType?: string,
) => {
  try {
    const response = await axios.post(
      `${apiURl}/orders`,
      {
        cartId: cartId,
        address: address,
        rewardPoints: rewardPoints,
        paymentType: paymentType,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (response) return response;
  } catch (error) {
    console.log('ADD TO CART ERROR', JSON.stringify(error));
  }
};

export {
  getCartItems,
  addToCartService,
  removeCartItemService,
  checkOutCartService,
};
