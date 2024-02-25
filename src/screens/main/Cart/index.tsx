import useTheme from '../../../hooks/useTheme';
import React, {useEffect, useState} from 'react';
import {Alert, SafeAreaView, ScrollView, Text} from 'react-native';
import {Image, View} from 'react-native';
import useCart from '../../../hooks/useCart';
import {ICartItem} from '../../../types';
import {FlatList} from 'react-native-gesture-handler';
import {ProductHorizontalCard} from '../../../components/molecules';
import {Button} from '../../../components/atoms';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../store';
import {useAuth} from '../../../hooks/useAuth';
import axios from 'axios';
import {cartReducerActions} from '../../../store/cart/slice';

interface ICartScreenProps {}

const Cart: React.FC<ICartScreenProps> = props => {
  const {Colors} = useTheme();
  const {
    dispatchGetCartItems,
    cartItems,
    dispatchCheckOutCart,
    isCheckingOutCart,
  } = useCart();
  const {accessToken, accountBalance} = useAuth();
  const [shippingFee, setShippingFee] = useState<number>(0);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    dispatchGetCartItems();
  }, []);

  const items: ICartItem[] = cartItems;

  const getPrice = () => {
    let result = 0;
    items?.map((item, index) => {
      result = result + item?.priceWin;
    });

    return result;
  };

  const district = 'Thành phố Thủ Đức';
  const ward = 'Phường Bình Thọ';

  const calculateShippingFee = async () => {
    try {
      const response = await axios.get(
        `https://sneakery.herokuapp.com/api/shipping_fee/get?originDistrict=${district}&destinationDistrict=${ward}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      response && setShippingFee(response.data.data.fee);
    } catch (error) {
      console.log('SHIPPING FEE ERROR', error);
    }
  };

  const checkOut = () => {};

  React.useEffect(() => {
    calculateShippingFee();
  }, []);

  return (
    <SafeAreaView style={{backgroundColor: 'white'}}>
      {items?.length > 0 ? (
        <View
          style={{
            paddingHorizontal: 16,
            marginTop: 24,
          }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '600',
              color: Colors.secondary[500],
            }}>
            Giỏ hàng của bạn
          </Text>
          <Button
            isLoading={loading}
            onPress={() => {
              if (accountBalance < getPrice()) {
                Alert.alert(
                  'Tài khoản bạn không đủ để thực hiện giao dịch này',
                );
              } else {
                setLoading(true);
                setTimeout(() => {
                  setLoading(false);
                  dispatch(cartReducerActions?.setCartItems([]));
                  Alert.alert(
                    'Đặt hàng thành công, đơn hàng sẽ được giao đến địa chỉ mà bạn đã cung cấp cho chúng tôi',
                  );
                }, 3000);
              }
            }}
            label={`Check out ngay ${
              getPrice()?.toString().prettyMoney() || ''
            }$`}
            customStyle={{marginVertical: 16}}
          />
          <FlatList
            style={{
              backgroundColor: 'white',
              marginTop: 16,
            }}
            data={items}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{paddingBottom: 400}}
            renderItem={({item}) => (
              <ProductHorizontalCard {...(item.product as any)} />
            )}
          />
        </View>
      ) : (
        <ScrollView
          style={{backgroundColor: 'white'}}
          contentContainerStyle={{
            paddingHorizontal: 16,
            backgroundColor: 'white',
            minHeight: '100%',
          }}>
          {/* <Text
          style={{
            fontSize: 28,
            fontWeight: 'bold',
            color: Colors.secondary[600],
            marginTop: 24,
          }}>
          Giỏ hàng của bạn
        </Text> */}
          <Empty />
        </ScrollView>
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
