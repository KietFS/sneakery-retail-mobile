import axios from 'axios';
import {apiURl} from '../../constants';

const getProducts = async () => {
  try {
    const response = await axios.get(`${apiURl}/products/`);
    if (response) return response;
  } catch (error: any) {
    return error;
  }
};

const getProductDetailService = async (id: string) => {
  try {
    const response = await axios.get(
      `https://sneakery.herokuapp.com/api/products/${id}`,
    );
    if (response) return response;
  } catch (error: any) {
    return error;
  }
};

export {getProducts, getProductDetailService};
