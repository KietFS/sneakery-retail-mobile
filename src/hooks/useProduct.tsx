import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import {
  getFilteredProducts,
  getProductDetail,
  getProductHomePages,
} from '../store/product/actions';
import {IProduct} from '@/store/@types';

const useProduct = () => {
  const dispatch = useDispatch();
  const {
    products: storedProducts,
    filterProducts: storedFilterProducts,
    isGettingHomePage,
    isGettingProductDetail,
    productDetail,

    keyWord,
    priceStart,
    priceEnd,
    condition,
    category,
    brand,
    color,
    size,
  } = useSelector((state: RootState) => state?.productReducer);

  const dispatchGetProductHomePage = () => {
    dispatch(getProductHomePages());
  };

  const dispatchGetProductDetail = (id: string) => {
    dispatch(getProductDetail({id: id}));
  };

  const dispatchFilterProduct = (
    name?: string,
    brand?: string,
    size?: number,
    category?: string,
  ) => {
    dispatch(
      getFilteredProducts({
        name: name,
        brand: brand,
        size: size,
        category: category,
      }),
    );
  };

  const products = storedProducts as IProduct[];
  const filteredProducts = storedFilterProducts as IProduct[];

  return {
    dispatchGetProductHomePage,
    products,
    filteredProducts,
    isGettingHomePage,
    dispatchGetProductDetail,
    dispatchFilterProduct,
    isGettingProductDetail,
    productDetail,

    keyWord,
    priceStart,
    priceEnd,
    condition,
    category,
    brand,
    color,
    size,
  };
};

export default useProduct;
