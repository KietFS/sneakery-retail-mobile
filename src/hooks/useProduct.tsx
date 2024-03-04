import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import {getProductDetail, getProductHomePages} from '../store/product/actions';

const useProduct = () => {
  const dispatch = useDispatch();
  const {
    products,
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

  return {
    dispatchGetProductHomePage,
    products,
    isGettingHomePage,
    dispatchGetProductDetail,
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
