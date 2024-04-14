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
  console.log('ID is', id);
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

export {getOrderItemService, getOrderDetailService};
