import React from 'react';
import BottomSheetCustom from '../BottomSheetCustom';
import {Text, View} from 'react-native';
import axios from 'axios';
import useTheme from '../../../hooks/useTheme';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {IconButton, MD3Colors} from 'react-native-paper';
import BottomSheetSelector from '../BottomSheetSelector';
import {useForm} from 'react-hook-form';
import {Button} from '../../../components/atoms';
import useProduct from '../../../hooks/useProduct';
import useOrders from '../../../hooks/useOrders';

interface IRateOrderBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
}

const RateOrderBottomSheet: React.FC<IRateOrderBottomSheetProps> = props => {
  const {isOpen, onClose, orderId} = props;
  const {Colors} = useTheme();
  const {control, watch} = useForm();

  const {dispatchRateProduct} = useProduct();
  const {dispatchRateOrder} = useOrders();

  return (
    <>
      {isOpen ? (
        <BottomSheetCustom
          snapPoints={['35%']}
          children={
            <View style={{paddingHorizontal: 16, paddingVertical: 10}}>
              <View style={{flexDirection: 'row-reverse'}}>
                {/* <TouchableOpacity onPress={() => onClose()}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: 'bold',
                        color: Colors.primary[500],
                      }}>
                      Đóng
                    </Text>
                  </TouchableOpacity> */}
              </View>

              <View style={{justifyContent: 'space-between'}}>
                <View>
                  <Text
                    style={{
                      fontSize: 16,
                      color: Colors.secondary[600],
                      fontWeight: 'bold',
                    }}>
                    Đánh giá sản phẩm
                  </Text>

                  <BottomSheetSelector
                    control={control}
                    searchable={false}
                    customStyles={{marginTop: 10}}
                    placeholder="Chọn điểm cho đơn hàng"
                    name="rate"
                    optionLabelField="name"
                    optionValueField="id"
                    options={[
                      {
                        id: '1',
                        name: '1',
                      },
                      {
                        id: '2',
                        name: '2',
                      },
                      {
                        id: '3',
                        name: '3',
                      },
                      {
                        id: '4',
                        name: '4',
                      },
                      {
                        id: '5',
                        name: '5',
                      },
                    ]}
                  />
                  <Text
                    style={{
                      fontSize: 14,
                      fontStyle: 'italic',
                      color: Colors.secondary[500],
                    }}>
                    Sau khi đánh giá bạn sẽ có thêm điểm reward poinst vào tải
                    khoản dựa trên giá trị đơn hàng
                  </Text>
                </View>

                <Button
                  onPress={() => {
                    console.log('wat', watch('rate')?.id);
                    dispatchRateOrder(orderId, watch('rate')?.id);
                    onClose();
                  }}
                  label="Xác nhận"
                  customStyle={{marginTop: 60}}
                />
              </View>
            </View>
          }
          handleCloseSheet={onClose}
        />
      ) : null}
    </>
  );
};

export default RateOrderBottomSheet;
