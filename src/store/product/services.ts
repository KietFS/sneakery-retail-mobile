import axios from 'axios'
import { IProductCondition } from '../../types'

const getNikeProductsService = async () => {
  try {
    const response = await axios.get(
      `https://sneakery-develop-4ba9beca2712.herokuapp.com/products?keyword=dunkie`,
    )
    if (response) {

      return response
    }
  } catch (error: any) {
    return error
  }
}

const getAdidasProductsService = async () => {
  try {
    const response = await axios.get(
      `https://sneakery-develop-4ba9beca2712.herokuapp.com/api/products?keyword=trunkie`,
    )
    if (response) return response
  } catch (error: any) {
    return error
  }
}

const getPumaProductsService = async () => {
  try {
    const response = await axios.get(
      `https://sneakery-develop-4ba9beca2712.herokuapp.com/api/products?&brand=puma`,
    )
    if (response) return response
  } catch (error: any) {
    return error
  }
}

const getLVProductsService = async () => {
  try {
    const response = await axios.get(
      `https://sneakery-develop-4ba9beca2712.herokuapp.com/api/products?&brand=lv`,
    )
    if (response) return response
  } catch (error: any) {
    return error
  }
}

const getProductDetailService = async (id: string) => {
  try {
    const response = await axios.get(
      `https://sneakery.herokuapp.com/api/products/${id}`,
    )
    if (response) return response
  } catch (error: any) {
    return error
  }
}

const getProductBidHistoryService = async (id: string) => {
  try {
    const response = await axios.get(
      `https://sneakery.herokuapp.com/api/bid_history/product/${id}`,
    )
    if (response) return response
  } catch (error: any) {
    return error
  }
}

const bidProductService = async (
  id: string,
  accessToken: string,
  bidValue: number,
) => {
  console.log('access token service', accessToken)
  console.log('bid value', bidValue)
  console.log('id', id)
  try {
    const response = await axios.post(
      'https://sneakery.herokuapp.com/api/bids',
      {
        amount: Number(bidValue),
        productId: Number(id),
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      },
    )
    if (response) return response
  } catch (error: any) {
    console.log(error?.response?.data)
    return error
  }
}

const filterProductServices = async (
  keyWord: string,
  priceStart: string,
  priceEnd: string,
  condition: IProductCondition,
  category: string,
  brand: string[],
  color: string[],
  size: string[],
) => {
  try {
    const url = `https://sneakery.herokuapp.com/api/products?${
      keyWord !== null ? `keyword=${keyWord}` : ''
    }${condition !== null ? `&condition=${condition}` : ''}${
      category !== null ? `&category=${category}` : ''
    }${
      brand.length > 0
        ? `&brand=${brand.map((item, index) =>
            index !== brand.length ? `${item}` : `${item}`,
          )}`
        : ''
    }${
      color.length > 0
        ? `&color=${color.map((item, index) =>
            index !== color.length ? `${item}` : `${item}`,
          )}`
        : ''
    }${
      size.length > 0
        ? `&size=${size.map((item, index) =>
            index !== size.length ? `${item}` : `${item}`,
          )}`
        : ''
    }${priceStart !== null ? `&priceStart=${priceStart}` : ''}${
      priceEnd !== null ? `&priceEnd=${priceEnd}` : ''
    }`
    console.log('URL here', url)
    const response = await axios.get(url)
    if (response?.data) {
      return response
    }
  } catch (error) {
    return error
  }
}

export {
  getNikeProductsService,
  getAdidasProductsService,
  getLVProductsService,
  getPumaProductsService,
  getProductDetailService,
  getProductBidHistoryService,
  bidProductService,
  filterProductServices,
}
