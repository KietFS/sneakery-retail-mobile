import useTheme from '../../../../hooks/useTheme';
import React, {useEffect} from 'react';
import {Image, SafeAreaView, ScrollView, Text, View} from 'react-native';
import ArrowLeftIcon from '../../../../assets/icons/ArrowLeft.png';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation, useRoute} from '@react-navigation/native';

import OrderReceivedImage from '../../../../assets/images/OrderReceive.png';
import OrderProcessingImage from '../../../../assets/images/OrderProcessing.png';
import OrderShippingImage from '../../../../assets/images/OrderShipping.png';
import OrderFinishedImage from '../../../../assets/images/OrderFinished.png';
import useOrders from '../../../../hooks/useOrders';
import CartItemCard from '../../../../components/molecules/CartItemCard';

interface IOrderDetailScreenProps {}

const OrderDetail: React.FC<IOrderDetailScreenProps> = props => {
  const {Colors} = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const {dispatchGetOrderDetail, orderDetail} = useOrders();

  const images = {
    received: OrderReceivedImage,
    processing: OrderProcessingImage,
    shipping: OrderShippingImage,
    finished: OrderFinishedImage,
  };

  const titles = {
    received: 'Chúng tôi đã nhận được đơn hàng của bạn',
    processing: 'Chúng tôi đang xử lý đơn hàng của bạn',
    shipping: 'Chúng tôi đang giao đơn hàng của bạn',
    finished: 'Đơn hàng đã được giao đến tay bạn !',
  };

  const descriptions = {
    received: 'Hãy vui lòng đợi chúng tôi xử lý đơn hàng của bạn',
    processing: 'Hãy vui lòng đợi chúng tôi xử lý đơn hàng của bạn',
    shipping: 'Hãy vui lòng đợi chúng tôi xử lý đơn hàng của bạn',
    finished: 'Hãy vui lòng đợi chúng tôi xử lý đơn hàng của bạn',
  };

  useEffect(() => {
    dispatchGetOrderDetail((route.params as any)?.id);
  }, []);

  return (
    <SafeAreaView style={{backgroundColor: Colors.secondary[50]}}>
      <View
        style={{
          height: '100%',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          paddingVertical: 20,
          backgroundColor: Colors.secondary[50],
        }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{maxHeight: '90%'}}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={ArrowLeftIcon}
              style={{height: 35, width: 35, marginRight: 4}}
            />
            <Text
              style={{
                fontSize: 24,
                fontWeight: 'bold',
                color: Colors.secondary[600],
              }}>
              Thông tin chi tiết đơn hàng
            </Text>
          </TouchableOpacity>
          <View style={{width: '100%', alignItems: 'center', marginTop: 10}}>
            <Image
              style={{height: 300, width: 300}}
              source={images[orderDetail?.status]}
              width={100}
              height={100}
            />
          </View>

          <View>
            <Text
              style={{
                color: Colors.secondary[600],
                fontWeight: '600',
                fontSize: 18,
                textAlign: 'center',
              }}>
              {titles[orderDetail?.status]}
            </Text>
            <Text
              style={{
                color: Colors.secondary[500],
                fontWeight: '500',
                fontSize: 14,
                textAlign: 'center',
                marginTop: 4,
              }}>
              {descriptions[orderDetail?.status]}
            </Text>
          </View>

          <View
            style={{
              marginTop: 20,
              borderTopWidth: 1,
              borderColor: Colors.secondary[300],
              paddingTop: 20,
            }}>
            <Text
              style={{
                color: Colors.secondary[500],
                fontWeight: '600',
                fontSize: 18,
              }}>
              Thông tin chi tiết đơn hàng
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 16,
              }}>
              <Text
                style={{
                  color: Colors.secondary[500],
                  fontWeight: '500',
                  fontSize: 16,
                }}>
                Giá trị đơn hàng:{' '}
              </Text>
              <Text
                style={{
                  color: Colors.success[500],
                  fontWeight: '600',
                  fontSize: 16,
                }}>
                ${orderDetail?.totalPrice?.toString().prettyMoney()}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 8,
                flexWrap: 'wrap',
              }}>
              <Text
                style={{
                  color: Colors.secondary[500],
                  fontWeight: '500',
                  fontSize: 16,
                }}>
                Địa chỉ giao hàng:{' '}
              </Text>
              <Text
                numberOfLines={3}
                style={{
                  color: Colors.primary[500],
                  fontWeight: '500',
                  fontSize: 16,
                }}>
                {orderDetail?.userId?.address || '2A Phan Chu Trinh, Hiệp Phú'}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 8,
                flexWrap: 'wrap',
              }}>
              <Text
                style={{
                  color: Colors.secondary[500],
                  fontWeight: '500',
                  fontSize: 16,
                }}>
                Số điện thoại giao hàng:{' '}
              </Text>
              <Text
                numberOfLines={3}
                style={{
                  color: Colors.secondary[500],
                  fontWeight: '500',
                  fontSize: 16,
                }}>
                {orderDetail?.userId?.phoneNumber ||
                  '2A Phan Chu Trinh, Hiệp Phú'}
              </Text>
            </View>

            {/* <View
              style={{
                marginTop: 8,
                flexWrap: 'wrap',
              }}>
              <Text
                style={{
                  color: Colors.secondary[500],
                  fontWeight: '500',
                  fontSize: 16,
                }}>
                Các sản phẩm:{' '}
              </Text>
              <View>
                {orderDetail?.items?.map((cart, cartIndex) => (
                  <CartItemCard {...cart} onPressRemoveItem={() => {}} />
                ))}
              </View>
            </View> */}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default OrderDetail;
