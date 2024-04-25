import {useForm} from 'react-hook-form';
import {Button, TextInput} from '../../../components/atoms';
import {BaseBottomSheet} from '../../../components/molecules';
import React, {useState} from 'react';
import {Text, View} from 'react-native';
import BottomSheetCustom from '../../../components/molecules/BottomSheetCustom';
import useTheme from '../../../hooks/useTheme';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {OrderPaymentType, OrderStatusEnum} from '../../../store/@types';

interface ISelectOrderTypeProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (orderType: OrderPaymentType) => void;
}

const SelectOrderType: React.FC<ISelectOrderTypeProps> = props => {
  const orderTypeOptions = [
    {
      id: 'cod',
      name: 'Thanh toán khi nhận hàng',
    },
    {
      id: 'e-wallet',
      name: 'Thanh toán qua ví điện tử',
    },
  ];

  const {isOpen, onClose, onSubmit} = props;
  const {Colors} = useTheme();
  const [orderTypeSelected, setOrderTypeSelected] = useState<{
    id: string;
    name: string;
  }>(orderTypeOptions[0]);

  return (
    <>
      {isOpen ? (
        <BottomSheetCustom
          handleCloseSheet={onClose}
          snapPoints={['30%']}
          children={
            <View
              style={{
                paddingVertical: 10,
                paddingHorizontal: 20,
                height: '88%',
                justifyContent: 'space-between',
              }}>
              <View style={{rowGap: 4}}>
                <TouchableOpacity
                  onPress={() => setOrderTypeSelected(orderTypeOptions[0])}
                  style={{
                    flexDirection: 'row',
                    paddingVertical: 8,
                    paddingHorizontal: 16,
                    height: 50,
                    backgroundColor:
                      orderTypeSelected.id == 'cod'
                        ? Colors.secondary[100]
                        : 'white',
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: Colors.secondary[600],
                      fontWeight: '600',
                    }}>
                    Thanh toán khi nhận hàng
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setOrderTypeSelected(orderTypeOptions[1])}
                  style={{
                    marginTop: 12,
                    height: 50,
                    paddingVertical: 8,
                    paddingHorizontal: 16,
                    backgroundColor:
                      orderTypeSelected.id == 'e-wallet'
                        ? Colors.secondary[100]
                        : 'white',
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: '600',
                      color: Colors.secondary[600],
                    }}>
                    Thanh toán qua ví điện tử
                  </Text>
                </TouchableOpacity>
              </View>

              <Button
                label="Xác nhận"
                onPress={() => {
                  onSubmit(orderTypeSelected.id as any);
                }}
              />
            </View>
          }
        />
      ) : null}
    </>
  );
};

export default SelectOrderType;
