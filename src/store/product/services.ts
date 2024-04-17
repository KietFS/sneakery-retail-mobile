import axios from 'axios';
import {apiURl} from '../../constants';
import querystring from 'querystring';

const getProducts = async (page: number, limit: number) => {
  try {
    const response = await axios.get(
      `${apiURl}/products/?page=${page}&limit=${limit}`,
    );
    if (response) return response;
  } catch (error: any) {
    return error;
  }
};

const getFilteredProductsService = async (
  name?: string,
  brand?: string,
  size?: number,
  category?: string,
) => {
  try {
    const queryConditions: {[key: string]: any} = {};

    if (brand) {
      queryConditions.brand = brand;
    }

    if (name) {
      queryConditions.name = name;
    }

    if (size) {
      queryConditions.size = size;
    }

    if (category) {
      queryConditions.category = category;
    }

    const queryString = querystring.stringify(queryConditions);
    const apiUrlWithQuery = `${apiURl}/products?${queryString}`;

    console.log('API URL', apiUrlWithQuery);

    const response = await axios.get(apiUrlWithQuery);

    return response;
  } catch (error) {
    console.error(error);
    return {error: 'Failed to fetch products'};
  }
};

const getProductDetailService = async (id: string) => {
  try {
    const response = await axios.get(`${apiURl}/products/${id}`);
    if (response) return response;
  } catch (error: any) {
    return error;
  }
};

const getProductCommentsService = async (id: string) => {
  try {
    const response = await axios.get(`${apiURl}/comments/${id}`);
    if (response) return response;
  } catch (error: any) {
    return error;
  }
};

const postCommentOnProductService = async (
  accessToken: string,
  id: string,
  content: string,
) => {
  try {
    const response = await axios.post(
      `${apiURl}/comments/${id}`,
      {
        content: content,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    if (response) return response;
  } catch (error: any) {
    return error;
  }
};

export {
  getProducts,
  getProductDetailService,
  getFilteredProductsService,
  getProductCommentsService,
  postCommentOnProductService,
};
