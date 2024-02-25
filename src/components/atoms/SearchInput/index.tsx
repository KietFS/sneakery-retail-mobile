import React, {useState} from 'react';
import {
  StyleProp,
  Text,
  TextInput as RNTextInput,
  View,
  ViewStyle,
  TextInputProps,
  Image,
  TouchableOpacity,
} from 'react-native';

import useTheme from '../../../hooks/useTheme';
import {Controller} from 'react-hook-form';

interface ITextInputProps extends TextInputProps {
  label?: string;
  placeholder: string;
  customStyle?: StyleProp<ViewStyle>;
  onIconPress?: () => void;
}

const TextInput: React.FC<ITextInputProps> = props => {
  const {label, customStyle, placeholder, onIconPress} = props;
  const {Colors} = useTheme();
  const [isFocus, setIsFocus] = useState<boolean>(false);

  return (
    <View style={customStyle}>
      {label ? (
        <Text
          style={{
            fontSize: 14,
            color: isFocus ? Colors?.primary[500] : Colors.secondary[600],
            fontWeight: '600',
            marginBottom: 4,
            marginLeft: 4,
          }}>
          {label || ''}
        </Text>
      ) : null}
      <View
        style={{
          borderColor: isFocus ? Colors.secondary[300] : Colors.secondary[200],
          borderWidth: 1,
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderRadius: 16,
          padding: 4,
          paddingRight: 16,
        }}>
        <RNTextInput
          {...props}
          onFocus={() => setIsFocus(true)}
          placeholderTextColor={Colors.secondary[400]}
          onPressIn={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          placeholder={placeholder}
          style={{
            backgroundColor: 'white',
            paddingHorizontal: 10,
            width: '80%',
            height: 40,
            color: Colors.secondary[600],
            fontWeight: '500',
            fontSize: 14,
          }}
        />
        <TouchableOpacity onPress={() => onIconPress?.()}>
          <Image
            source={require('../../../assets/icons/Filter.png')}
            style={{width: 24, height: 24}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TextInput;
