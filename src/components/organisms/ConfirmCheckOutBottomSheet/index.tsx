import {useForm} from 'react-hook-form';
import {Button, TextInput} from '../../atoms';
import {BaseBottomSheet} from '../../molecules';
import React, {useState} from 'react';
import {Text, View} from 'react-native';
import BottomSheetCustom from '../../molecules/BottomSheetCustom';
import useTheme from '../../../hooks/useTheme';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {OrderPaymentType, OrderStatusEnum} from '../../../store/@types';
import {useAuth} from '../../../hooks/useAuth';

interface ConfirmCheckoutBottomSheet {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (orderType: OrderPaymentType, rewardPoints?: number) => void;
  pointUsed: number;
}

const ConfirmCheckOutBottomSheetProps: React.FC<ConfirmCheckoutBottomSheet> =
  props => {
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
    const {userInfo} = useAuth();

    const {isOpen, onClose, onSubmit} = props;
    const {Colors} = useTheme();
    const [orderTypeSelected, setOrderTypeSelected] = useState<{
      id: string;
      name: string;
    }>(orderTypeOptions[0]);
    const [isUseRewards, setIsUseRewards] = useState<boolean>(false);

    return (
      <>
        {isOpen ? (
          <BottomSheetCustom
            handleCloseSheet={onClose}
            snapPoints={['60%']}
            children={
              <View
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  height: '95%',
                  justifyContent: 'space-between',
                }}>
                <View>
                  <View style={{rowGap: 4}}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: '600',
                        color: Colors.secondary[600],
                      }}>
                      Phương thức thanh toán
                    </Text>
                    <TouchableOpacity
                      onPress={() => setOrderTypeSelected(orderTypeOptions[0])}
                      style={{
                        flexDirection: 'row',
                        paddingVertical: 8,
                        paddingHorizontal: 16,
                        marginTop: 12,
                        height: 50,
                        alignItems: 'center',
                        backgroundColor:
                          orderTypeSelected.id == 'cod'
                            ? Colors.secondary[100]
                            : 'white',
                      }}>
                      <Text
                        style={{
                          fontSize: 14,
                          color: Colors.secondary[500],
                        }}>
                        Thanh toán khi nhận hàng
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => setOrderTypeSelected(orderTypeOptions[1])}
                      style={{
                        marginTop: 4,
                        height: 50,
                        flexDirection: 'row',
                        paddingVertical: 8,
                        paddingHorizontal: 16,
                        alignItems: 'center',
                        backgroundColor:
                          orderTypeSelected.id == 'e-wallet'
                            ? Colors.secondary[100]
                            : 'white',
                      }}>
                      <Text
                        style={{
                          fontSize: 14,
                          color: Colors.secondary[500],
                        }}>
                        Thanh toán qua ví điện tử
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View style={{rowGap: 4, marginTop: 16}}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: '600',
                        color: Colors.secondary[600],
                      }}>
                      Sử dụng điểm thưởng (tối đa 5% giá trị đơn hàng)
                    </Text>
                    {!!props.pointUsed && (
                      <TouchableOpacity
                        onPress={() => setIsUseRewards(true)}
                        style={{
                          flexDirection: 'row',
                          paddingVertical: 8,
                          paddingHorizontal: 16,
                          marginTop: 12,
                          height: 50,
                          alignItems: 'center',
                          backgroundColor: isUseRewards
                            ? Colors.secondary[100]
                            : 'white',
                        }}>
                        <Text
                          style={{
                            fontSize: 14,
                            color: Colors.secondary[500],
                          }}>
                          Sử dụng {props.pointUsed.toString().prettyMoney()}$
                          cho sản phẩm này
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>

                <Button
                  label="Xác nhận"
                  onPress={() => {
                    if (isUseRewards) {
                      onSubmit(orderTypeSelected.id as any, props.pointUsed);
                    } else {
                      onSubmit(orderTypeSelected.id as any);
                    }
                  }}
                />
              </View>
            }
          />
        ) : null}
      </>
    );
  };

export default ConfirmCheckOutBottomSheetProps;
