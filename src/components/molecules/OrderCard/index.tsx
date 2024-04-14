import OrderStatusBadge from '../../../components/atoms/OrderStatusBadge';
import useTheme from '../../../hooks/useTheme';
import {IOrderItem} from '../../../store/@types';
import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';

interface IOrderCardProps extends IOrderItem {
  onPress: (item: IOrderItem) => void;
}

const OrderCard: React.FC<IOrderCardProps> = props => {
  const {userId} = props;
  const {Colors} = useTheme();
  return (
    <TouchableOpacity
      onPress={() => props.onPress(props)}
      style={{
        borderWidth: 1,
        borderColor: Colors.secondary[300],
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 10,
        marginBottom: 20,
        backgroundColor: Colors.secondary[50],
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '600',
            color: Colors.secondary[500],
          }}>
          Order vào ngày:
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '600',
            marginLeft: 4,
            color: Colors.primary[500],
          }}>
          {props.createdAt?.toString().prettyDate()}
        </Text>
      </View>
      <View style={{marginTop: 8, flexDirection: 'row', alignItems: 'center'}}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '600',
            marginRight: 8,
            color: Colors.secondary[500],
          }}>
          Trạng thái:
        </Text>
        <OrderStatusBadge status={props.status} />
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 8}}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '600',
            color: Colors.secondary[500],
          }}>
          Giá trị đơn hàng:
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '500',
            marginLeft: 4,
            color: Colors.success[500],
          }}>
          ${props.totalPrice?.toString().prettyMoney()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default OrderCard;
