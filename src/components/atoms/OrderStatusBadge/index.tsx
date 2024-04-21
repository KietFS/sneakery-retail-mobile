import useTheme from '../../../hooks/useTheme';
import {OrderStatusEnum} from '../../../store/@types';
import React from 'react';
import {View, Text} from 'react-native';

interface IOrderStatusBadgeProps {
  status: OrderStatusEnum;
}

const OrderStatusBadge: React.FC<IOrderStatusBadgeProps> = props => {
  const {status} = props;
  const {Colors} = useTheme();

  const backgroundColors = {
    received: Colors.secondary[200],
    processing: Colors.warning[200],
    shipping: Colors.warning[200],
    finished: Colors.success[200],
    canceled: Colors.error[200],
  };

  const textColors = {
    received: Colors.secondary[600],
    processing: Colors.warning[800],
    shipping: Colors.warning[600],
    finished: Colors.success[600],
    canceled: Colors.error[600],
  };

  return (
    <View
      style={{
        paddingVertical: 4,
        paddingHorizontal: 8,

        borderRadius: 10,
        backgroundColor: backgroundColors[status],
      }}>
      <Text
        style={{
          fontSize: 10,
          color: textColors[status],
          fontWeight: '600',
          textAlign: 'center',
        }}>
        {status.toUpperCase()}
      </Text>
    </View>
  );
};

export default OrderStatusBadge;
