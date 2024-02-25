import React from 'react';
import BaseSlider, {SliderProps} from '@react-native-community/slider';
import {Controller} from 'react-hook-form';
import {StyleProp, ViewStyle} from 'react-native';
import {View} from 'react-native';
import {Text} from 'react-native';
import useTheme from '../../../hooks/useTheme';

interface ISliderProps extends SliderProps {
  control: any;
  name: string;
  label: string;
  containerStyles?: StyleProp<ViewStyle>;
}

const Slider: React.FC<ISliderProps> = props => {
  const {Colors} = useTheme();
  return (
    <Controller
      control={props.control}
      name={props.name}
      render={({field: {value, onChange, onBlur}}) => {
        return (
          <View style={props.containerStyles}>
            <View style={{width: '100%', justifyContent: 'space-between'}}>
              <Text
                allowFontScaling={false}
                style={{
                  marginLeft: 4,
                  marginBottom: 4,
                  fontSize: 14,
                  color: Colors.secondary[600],
                  fontWeight: '500',
                }}>
                {props.label}
              </Text>
              <Text
                allowFontScaling={false}
                style={{
                  marginLeft: 4,
                  marginBottom: 4,
                  fontSize: 14,
                  color: Colors.secondary[600],
                  fontWeight: '500',
                }}>
                {(value as number)?.toFixed(0).toString()}
              </Text>
            </View>
            <BaseSlider
              style={{width: '100%', height: 20}}
              value={value as number}
              minimumValue={0}
              maximumValue={100}
              onValueChange={value => onChange(value)}
              minimumTrackTintColor={Colors.primary[500]}
              maximumTrackTintColor={Colors.secondary[300]}
            />
          </View>
        );
      }}
    />
  );
};

export default Slider;
