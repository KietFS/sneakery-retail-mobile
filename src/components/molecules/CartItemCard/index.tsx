import React from 'react';
import {Image, Text, View, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import useTheme from '../../../hooks/useTheme';
import {ICartItemRespose} from '../../../store/@types';

interface ICartItemCardProps extends ICartItemRespose {
  onPressRemoveItem: (id: string | number) => void;
}

const CartItemCard: React.FC<ICartItemCardProps> = props => {
  const {Colors} = useTheme();
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() =>
        //@ts-ignore
        navigation.navigate('ProductDetail' as never, {id: props?._id} as never)
      }
      activeOpacity={0.8}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        backgroundColor: 'white',
        borderColor: Colors.secondary[300],
        borderWidth: 1,
        marginBottom: 16,
        borderRadius: 16,
        paddingVertical: 8,
        paddingHorizontal: 8,
        minHeight: 120,
        justifyContent: 'space-between',
      }}>
      <Image
        source={{uri: props.productId?.thumbnail as any}}
        style={{width: 120, height: 80}}
      />
      <View style={{maxWidth: '50%'}}>
        <Text
          numberOfLines={1}
          style={{
            fontSize: 16,
            color: Colors.secondary[600],
            fontWeight: '600',
          }}>
          {props.productId?.name}
        </Text>
        <View style={{marginTop: 8, flexDirection: 'row'}}>
          <Text
            numberOfLines={1}
            style={{
              fontSize: 14,
              color: Colors.secondary[500],
              fontWeight: '500',
            }}>
            Giá sản phẩm
          </Text>
          <Text
            numberOfLines={1}
            style={{
              fontSize: 14,
              color: Colors.secondary[600],
              fontWeight: 'bold',
              marginLeft: 8,
            }}>
            {/* @ts-ignore */}${props.price.toString().prettyMoney()}
          </Text>
        </View>
        <View style={{marginTop: 8, flexDirection: 'row'}}>
          <Text
            numberOfLines={1}
            style={{
              fontSize: 14,
              color: Colors.secondary[500],
              fontWeight: '500',
            }}>
            Số lượng
          </Text>
          <Text
            numberOfLines={1}
            style={{
              fontSize: 14,
              color: Colors.secondary[600],
              fontWeight: 'bold',
              marginLeft: 8,
            }}>
            {/* @ts-ignore */}${props.quantity}
          </Text>
        </View>
        <View style={{marginTop: 8, flexDirection: 'row'}}>
          <Text
            numberOfLines={1}
            style={{
              fontSize: 14,
              color: Colors.secondary[500],
              fontWeight: '500',
            }}>
            Size
          </Text>
          <Text
            numberOfLines={1}
            style={{
              fontSize: 14,
              color: Colors.primary[500],
              fontWeight: 'bold',
              marginLeft: 8,
            }}>
            {props.size}
          </Text>
        </View>
      </View>
      {/* Nút xóa */}
      <TouchableOpacity
        onPress={() => {
          props.onPressRemoveItem((props as any)._id);
        }}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          width: 20,
          height: 20,
          backgroundColor: Colors.error[500], // Màu sắc của nút xóa
          borderRadius: 20,
        }}>
        <Text style={{fontSize: 16, color: 'white'}}>-</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default CartItemCard;
