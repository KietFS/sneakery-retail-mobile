import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import {
  bidProduct,
  filterProducts,
  getProductDetail,
  getProductHomePages,
} from '../store/product/actions';
import {IProductCondition} from '../types';

const useProduct = () => {
  const dispatch = useDispatch();
  const {
    nikeProducts,
    adidasProducts,
    pumaProducts,
    lvProducts,
    isGettingHomePage,
    isGettingProductDetail,
    productDetail,
    productBidHistory,
    isBiddingProduct,

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

  const dispatchBidProduct = (
    id: string,
    accessToken: string,
    bidValue: number,
  ) => {
    dispatch(bidProduct({id, accessToken, bidValue}));
  };

  const dispatchFilterProduct = (
    keyWord: string | null,
    priceStart: string | null,
    priceEnd: string | null,
    condition: IProductCondition | null,
    category: string | null,
    brand: string[],
    color: string[],
    size: string[],
  ) => {
    dispatch(
      filterProducts({
        keyWord,
        priceStart,
        priceEnd,
        condition,
        category,
        color,
        brand,
        size,
      }),
    );
  };

  return {
    dispatchGetProductHomePage,
    nikeProducts,
    adidasProducts,
    pumaProducts,
    lvProducts,
    isGettingHomePage,
    dispatchGetProductDetail,
    isGettingProductDetail,
    productDetail,
    productBidHistory,
    dispatchBidProduct,
    isBiddingProduct,
    filterProducts,
    dispatchFilterProduct,

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
