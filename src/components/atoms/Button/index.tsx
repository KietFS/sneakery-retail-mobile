import React, {lazy} from 'react';
import {StyleProp, Text, useColorScheme, View, ViewStyle} from 'react-native';
import useTheme from '../../../hooks/useTheme';
import {ActivityIndicator} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

type IVariant = 'primary' | 'outline';

interface IButtonProps {
  label: string;
  variant?: IVariant;
  customStyle?: any;
  onPress?: () => void;
  isLoading?: boolean;
}

const Button: React.FC<IButtonProps> = props => {
  const {Colors} = useTheme();
  const {customStyle, variant = 'primary', onPress, isLoading = false} = props;
  return (
    <TouchableOpacity
      onPress={() => onPress?.()}
      style={[
        {
          width: '100%',
          backgroundColor:
            variant === 'primary' ? Colors.primary[500] : Colors.secondary[50],
          borderWidth: variant === 'outline' ? 1 : 0,
          borderColor:
            variant === 'outline' ? Colors.primary[500] : 'transparent',
          height: 45,
          justifyContent: 'center',
          borderRadius: 10,
        },
        customStyle,
      ]}>
      {isLoading === true ? (
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size={'small'} color="white" />
        </View>
      ) : (
        <Text
          style={{
            textAlign: 'center',
            color:
              variant === 'primary'
                ? Colors.secondary[50]
                : Colors.primary[500],
            fontSize: 14,
            fontWeight: '600',
          }}>
          {props.label}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
