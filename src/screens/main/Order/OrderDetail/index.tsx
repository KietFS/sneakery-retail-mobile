import React, {useEffect, useState} from 'react';
import {Image, SafeAreaView, ScrollView, Text, View} from 'react-native';
import ArrowLeftIcon from '../../../../assets/icons/ArrowLeft.png';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation, useRoute} from '@react-navigation/native';

import OrderReceivedImage from '../../../../assets/images/OrderReceive.png';
import OrderProcessingImage from '../../../../assets/images/OrderProcessing.png';
import OrderShippingImage from '../../../../assets/images/OrderShipping.png';
import OrderFinishedImage from '../../../../assets/images/OrderFinished.png';
import OrderCanceldImage from '../../../../assets/images/OrderCancel.png';
import OrderNewImage from '../../../../assets/images/OrderNew.png';

import {Button} from '../../../../components/atoms';

//hooks
import useOrders from '../../../../hooks/useOrders';
import useTheme from '../../../../hooks/useTheme';
import RateOrderBottomSheet from '../../../../components/molecules/RateOrderBottomSheet';
import dayjs from 'dayjs';

interface IOrderDetailScreenProps {}

const OrderDetail: React.FC<IOrderDetailScreenProps> = props => {
  const {Colors} = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const {
    dispatchGetOrderDetail,
    orderDetail,
    isCancelingOrder,
    dispatchCancelOrder,
  } = useOrders();
  const [openRateOrderBottomSheet, setOpenRateOrderBottomSheet] =
    useState<boolean>(false);

  const images = {
    new: OrderNewImage,
    received: OrderReceivedImage,
    processing: OrderProcessingImage,
    shipping: OrderShippingImage,
    finished: OrderFinishedImage,
    canceled: OrderCanceldImage,
  };

  const titles = {
    new: 'Đơn hàng của bạn đã được tạo mới.',
    received: 'Chúng tôi đã nhận được đơn hàng của bạn',
    processing: 'Chúng tôi đang xử lý đơn hàng của bạn',
    shipping: 'Chúng tôi đang giao đơn hàng của bạn',
    finished: 'Đơn hàng đã được giao đến tay bạn !',
    canceled: 'Đơn hàng của bạn đã bị hủy',
  };

  const descriptions = {
    new: 'Hãy vui lòng đợi chúng tôi xử lý đơn hàng của bạn',
    received: 'Hãy vui lòng đợi chúng tôi xử lý đơn hàng của bạn',
    processing: 'Hãy vui lòng đợi chúng tôi xử lý đơn hàng của bạn',
    shipping: 'Hãy vui lòng đợi chúng tôi xử lý đơn hàng của bạn',
    finished: 'Hãy vui lòng đợi chúng tôi xử lý đơn hàng của bạn',
    canceled:
      'Đơn hàng này đã bị hủy, vui lòng quay trở lại để tiếp tục mua sắm',
  };

  useEffect(() => {
    dispatchGetOrderDetail((route.params as any)?.id);
  }, []);

  const handleCancelOrder = () => {
    dispatchCancelOrder((route.params as any)?.id);
  };

  const shouldCancel = () => {
    let result = true;
    let now = Date.now();
    if (
      now - dayjs(orderDetail?.createdAt)?.toDate().getTime() >
      15 * 60 * 1000
    ) {
      result = false;
    }

    return result;
  };

  return (
    <>
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
                  {orderDetail?.userId?.address ||
                    '2A Phan Chu Trinh, Hiệp Phú'}
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
                  {orderDetail?.userId?.phoneNumber || 'Không có'}
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
                  Phương thức thanh toán:{' '}
                </Text>
                <Text
                  numberOfLines={3}
                  style={{
                    color: Colors.secondary[500],
                    fontWeight: '500',
                    fontSize: 16,
                  }}>
                  {orderDetail?.paymentType == 'cod'
                    ? 'Nhận tiền khi giao hàng'
                    : 'Thanh toán qua ví điện tử'}
                </Text>
              </View>
            </View>
          </ScrollView>
          {orderDetail?.status == 'new' && shouldCancel() && (
            <Button
              label="Hủy đơn hàng"
              variant="primary"
              isLoading={isCancelingOrder}
              onPress={() => handleCancelOrder()}
            />
          )}
          {orderDetail?.status == 'finished' &&
            Number(orderDetail?.rate) < 1 && (
              <Button
                label="Đánh giá đơn hàng"
                variant="primary"
                isLoading={false}
                onPress={() => setOpenRateOrderBottomSheet(true)}
              />
            )}
          <Button
            label="Quay về"
            variant="outline"
            customStyle={{marginTop: 10}}
            onPress={() => navigation.goBack()}
          />
        </View>
      </SafeAreaView>

      {openRateOrderBottomSheet ? (
        <RateOrderBottomSheet
          orderId={orderDetail?._id}
          isOpen={openRateOrderBottomSheet}
          onClose={() => setOpenRateOrderBottomSheet(false)}
        />
      ) : null}
    </>
  );
};

export default OrderDetail;
