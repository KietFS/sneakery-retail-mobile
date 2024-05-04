import axios from 'axios';
import {apiURl} from '../../constants';

const getOrderItemService = async (token: string) => {
  try {
    const response = await axios.get(`${apiURl}/orders/`, {
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

const getOrderDetailService = async (token: string, id: string | number) => {
  try {
    const response = await axios.get(`${apiURl}/orders/${id}/`, {
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

const cancelOrderService = async (token: string, id: string | number) => {
  try {
    const response = await axios.put(`${apiURl}/orders/cancel/${id}/`, {
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

const rateOrderService = async (
  token: string,
  id: string | number,
  rate: string | number,
) => {
  try {
    const response = await axios.post(
      `${apiURl}/orders/rate/${id}/`,
      {
        rate: Number(rate),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (response) {
      return response;
    }
  } catch (error) {
    console.log('Error', error);
  }
};

export {
  getOrderItemService,
  getOrderDetailService,
  cancelOrderService,
  rateOrderService,
};
