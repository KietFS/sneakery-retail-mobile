import {useForm} from 'react-hook-form';
import {Button, TextInput} from '../../../components/atoms';
import {BaseBottomSheet} from '../../../components/molecules';
import React, {useState} from 'react';
import {Text, View} from 'react-native';
import BottomSheetCustom from '../../../components/molecules/BottomSheetCustom';
import useTheme from '../../../hooks/useTheme';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface IAddToCartBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (quantity: number) => void;
  size: number;
}

const AddToCartBottomSheet: React.FC<IAddToCartBottomSheetProps> = props => {
  const {isOpen, onClose, onAddToCart, size} = props;
  const {control} = useForm();
  const {Colors} = useTheme();
  const [quantity, setQuantity] = useState<number>(1);

  const handleIncreaseQuantity = () => {
    setQuantity(quantity => quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity >= 2) {
      setQuantity(quantity => quantity - 1);
    }
  };

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
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: Colors.secondary[600],
                      fontWeight: '600',
                    }}>
                    Size bạn chọn:
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      color: Colors.secondary[500],
                      fontWeight: 'normal',
                      marginLeft: 4,
                    }}>
                    {size}
                  </Text>
                </View>
                <View style={{marginTop: 12}}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: '600',
                      color: Colors.secondary[600],
                    }}>
                    Số lượng
                  </Text>
                  <View
                    style={{
                      width: '100%',
                      marginTop: 16,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity
                      onPress={handleDecreaseQuantity}
                      style={{
                        height: 40,
                        width: 40,
                        justifyContent: 'center',
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: Colors.secondary[300],
                      }}>
                      <Text style={{fontSize: 25, textAlign: 'center'}}>-</Text>
                    </TouchableOpacity>

                    <Text
                      style={{
                        fontSize: 20,
                        color: Colors.secondary[600],
                        fontWeight: '600',
                      }}>
                      {quantity}
                    </Text>

                    <TouchableOpacity
                      onPress={handleIncreaseQuantity}
                      style={{
                        height: 40,
                        width: 40,
                        justifyContent: 'center',
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: Colors.secondary[300],
                      }}>
                      <Text style={{fontSize: 25, textAlign: 'center'}}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <Button
                label="Xác nhận"
                onPress={() => {
                  onAddToCart(quantity);
                }}
              />
            </View>
          }
        />
      ) : null}
    </>
  );
};

export default AddToCartBottomSheet;
