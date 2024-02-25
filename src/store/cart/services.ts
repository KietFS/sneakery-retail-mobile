import axios from 'axios';

const getCartItems = async (token: string) => {
  try {
    const response = await axios.get(
      `https://sneakery.herokuapp.com/api/orders/get_all`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (response) {
      console.log('CART RESPONSE IS', response?.data);
      return response;
    }
  } catch (error) {
    console.log('CART RESPONSE IS', error);
    return error;
  }
};

const checkOutService = async (
  orderId: number,
  balance: number,
  shippingFee: number,
  totalPrice: number,
  token: string,
) => {
  console.log(
    'order id',
    orderId,
    'balance',
    balance,
    'shipping fee',
    shippingFee,
    'total price',
    totalPrice,
    'token',
    token,
  );
  try {
    if (balance >= Number((shippingFee / 23000).toFixed(0))) {
      const response = await axios.get(
        `https://sneakery.herokuapp.com/api/transaction/paid?orderId=${orderId}&shippingFee=${(
          shippingFee / 23000
        ).toFixed(0)}&subtotal=${
          totalPrice + Number((shippingFee / 23000).toFixed(0))
        }`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response) {
        return response;
      }
    }
  } catch (error: any) {
    console.log(error?.response);
    return error;
  }
};

export {getCartItems, checkOutService};
