import useTheme from '../../../hooks/useTheme';
import React, {useEffect, useState} from 'react';
import {Alert, SafeAreaView, ScrollView, Text} from 'react-native';
import {Image, View} from 'react-native';
import useCart from '../../../hooks/useCart';
import {FlatList} from 'react-native-gesture-handler';
import {ProductHorizontalCard} from '../../../components/molecules';
import {Button} from '../../../components/atoms';
import CartItemCard from '../../../components/molecules/CartItemCard';
import ConfirmCheckOutBottomSheetProps from '../../../components/organisms/ConfirmCheckOutBottomSheet';
import {OrderPaymentType, OrderStatusEnum} from '../../../store/@types';
import {useAuth} from '../../../hooks/useAuth';

interface ICartScreenProps {}

const Cart: React.FC<ICartScreenProps> = props => {
  const {
    cartItems,
    dispatchGetCartItems,
    dispatchRemoveCartItem,
    dispatchCheckOutCart,
  } = useCart();
  const [items, setItems] = useState<any[]>([]);
  const {Colors} = useTheme();
  const [openSelectOrderType, setOpenSelectOrderType] =
    useState<boolean>(false);
  const [orderTypeSelected, setOrderTypeSelected] =
    useState<OrderPaymentType>('cod');
  const {userInfo} = useAuth();

  useEffect(() => {
    dispatchGetCartItems();
  }, []);

  useEffect(() => {
    setItems(cartItems);
  }, [cartItems]);

  const handleRemoveCartItem = async (id: number | string) => {
    dispatchRemoveCartItem(id);
  };

  const calculateTotalPrice = () => {
    let finalTotalPrice = 0;
    cartItems?.forEach((cart, cartIndex) => {
      if (cart?.isVisible == true) {
        finalTotalPrice = finalTotalPrice + cart?.price;
      }
    });

    return finalTotalPrice;
  };

  const handlePressCheckout = () => {
    setOpenSelectOrderType(true);
  };

  const visibleCart = cartItems?.filter(
    cartItem => cartItem?.isVisible == true,
  );

  const usableRewardPoints =
    Number(userInfo?.rewardPoints) > (5 / 100) * Number(calculateTotalPrice())
      ? (5 / 100) * (Number(calculateTotalPrice()) as any)?.toFixed(0)
      : null;

  console.log('usableRewardPoints', usableRewardPoints);

  return (
    <>
      <SafeAreaView>
        {cartItems?.length == 0 ? (
          <Empty />
        ) : (
          <View
            style={{
              height: '100%',
              justifyContent: 'space-between',
              paddingHorizontal: 20,
              paddingVertical: 20,
            }}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{maxHeight: '90%'}}>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: 'bold',
                  color: Colors.secondary[600],
                  marginBottom: 16,
                }}>
                Giỏ hàng của bạn
              </Text>
              {visibleCart?.map((cart, cartIndex) => (
                <>
                  {cart?.isVisible ? (
                    <CartItemCard
                      {...cart}
                      onPressRemoveItem={handleRemoveCartItem}
                    />
                  ) : null}
                </>
              ))}
            </ScrollView>
            {/* @ts-ignore */}
            {visibleCart?.length > 0 && (
              <Button
                onPress={handlePressCheckout}
                label={`Thanh toán - ${calculateTotalPrice()
                  ?.toString()
                  ?.prettyMoney()}$`}
              />
            )}
          </View>
        )}
      </SafeAreaView>
      {openSelectOrderType ? (
        <ConfirmCheckOutBottomSheetProps
          onClose={() => setOpenSelectOrderType(false)}
          isOpen={openSelectOrderType}
          pointUsed={usableRewardPoints}
          onSubmit={(orderType, rewardPoints) => {
            dispatchCheckOutCart(
              cartItems?.map(item => item?._id),
              '',
              rewardPoints,
              orderType,
            );
            setOpenSelectOrderType(false);
          }}
        />
      ) : null}
    </>
  );
};

const Empty = () => {
  const {Colors} = useTheme();
  return (
    <View
      style={{
        width: '100%',
        height: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
      }}>
      <Image
        style={{width: 300, height: 300}}
        source={require('../../../assets/images/EmptyCartStorySet.png')}
      />
      <Text
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          color: Colors.secondary[500],
          marginTop: 8,
          textAlign: 'center',
        }}>
        Giỏ hàng của bạn hiện đang trống
      </Text>
      <Text
        style={{
          fontSize: 14,
          fontWeight: 'normal',
          color: Colors.secondary[600],
          marginTop: 8,
          textAlign: 'center',
        }}>
        Hãy tham gia các cuộc đấu giá và các sản phẩm sẽ xuất hiện ở đây
      </Text>
    </View>
  );
};

export default Cart;
