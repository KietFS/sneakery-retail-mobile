import useTheme from '../../../hooks/useTheme';
import React, {useEffect, useState} from 'react';
import {Alert, SafeAreaView, ScrollView, Text} from 'react-native';
import {Image, View} from 'react-native';
import useCart from '../../../hooks/useCart';
import {FlatList} from 'react-native-gesture-handler';
import {ProductHorizontalCard} from '../../../components/molecules';
import {Button} from '../../../components/atoms';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../store';
import {useAuth} from '../../../hooks/useAuth';
import axios from 'axios';
import {cartReducerActions} from '../../../store/cart/slice';
import CartItemCard from '../../../components/molecules/CartItemCard';

interface ICartScreenProps {}

const Cart: React.FC<ICartScreenProps> = props => {
  const {cartItems, dispatchGetCartItems, dispatchRemoveCartItem} = useCart();
  const [items, setItems] = useState<any[]>([]);
  const {Colors} = useTheme();

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
      finalTotalPrice = finalTotalPrice + cart?.totalPrice;
    });

    return finalTotalPrice;
  };

  return (
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
            {items?.map((cart, cartIndex) => (
              <CartItemCard
                {...cart}
                onPressRemoveItem={handleRemoveCartItem}
              />
            ))}
          </ScrollView>
          {/* @ts-ignore */}
          <Button
            label={`Thanh toán - ${calculateTotalPrice()
              ?.toString()
              ?.prettyMoney()}$`}
          />
        </View>
      )}
    </SafeAreaView>
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
