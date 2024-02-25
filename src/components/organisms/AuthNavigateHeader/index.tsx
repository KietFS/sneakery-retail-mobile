import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import useTheme from '../../../hooks/useTheme';

import ArrowLeftIcon from '../../../assets/icons/ArrowLeft.png';
import InfoFillIcon from '../../../assets/icons/InfoFill.png';
import {useNavigation} from '@react-navigation/native';

interface IAuthNavigateHeaderProps {}

const AuthNavigateHeader: React.FC<IAuthNavigateHeaderProps> = props => {
  const {Colors} = useTheme();
  const navigation = useNavigation();
  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <TouchableOpacity
        style={{flexDirection: 'row', alignItems: 'center'}}
        onPress={() => navigation.goBack()}>
        <Image source={ArrowLeftIcon} style={{width: 30, height: 30}} />
        <Text
          style={{
            fontSize: 24,
            fontWeight: '800',
            color: Colors.primary[500],
          }}>
          Sneakery
        </Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Image source={InfoFillIcon} style={{width: 25, height: 25}} />
      </TouchableOpacity>
    </View>
  );
};

export default AuthNavigateHeader;
