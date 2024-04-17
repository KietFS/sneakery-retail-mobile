import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import {
  commentOnProduct,
  getFilteredProducts,
  getProductComments,
  getProductDetail,
  getProductHomePages,
} from '../store/product/actions';
import {IAddToCartPayload, ICommentItem, IProduct} from '../store/@types';
import {addToCart} from '../store/cart/actions';

const useProduct = () => {
  const dispatch = useDispatch();
  const {
    products: storedProducts,
    filterProducts: storedFilterProducts,
    productComments: storedProductComments,
    totalRecords,
    isGettingHomePage,
    isGettingProductDetail,
    isGettingProductComments,
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

  const dispatchGetProductHomePage = (page: number, limit: number) => {
    dispatch(getProductHomePages({page: page, limit: limit}));
  };

  const dispatchGetProductDetail = (id: string) => {
    dispatch(getProductDetail({id: id}));
  };

  const dispatchGetProductComments = (id: string) => {
    dispatch(getProductComments({id: id}));
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

  const dispatchAddProductToCart = (payload: IAddToCartPayload) => {
    dispatch(addToCart(payload));
  };

  const dispatchCommentOnProduct = (id: string, content: string) => {
    dispatch(commentOnProduct({content: content, id: id}));
  };

  const products = storedProducts as IProduct[];
  const filteredProducts = storedFilterProducts as IProduct[];
  const productComments = storedProductComments as ICommentItem[];

  return {
    products,
    totalRecords,
    filteredProducts,

    productDetail,
    productComments,

    isGettingHomePage,
    isGettingProductDetail,
    isGettingProductComments,

    keyWord,
    priceStart,
    priceEnd,
    condition,
    category,
    brand,
    color,
    size,

    //dispatch
    dispatchGetProductDetail,
    dispatchFilterProduct,
    dispatchAddProductToCart,
    dispatchGetProductHomePage,
    dispatchGetProductComments,
    dispatchCommentOnProduct,
  };
};

export default useProduct;
