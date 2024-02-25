import React from 'react';
import {View, Text} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import useTheme from '../../../../hooks/useTheme';
import {Button} from '../../../../components/atoms';
import {useNavigation} from '@react-navigation/native';
import NavigationHeader from '../../../../components/molecules/NavigationHeader';
import {SafeAreaView} from 'react-native-safe-area-context';

interface INotifycationProps {}

const Notification: React.FC<INotifycationProps> = props => {
  const {Colors} = useTheme();
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{backgroundColor: 'white'}}>
      <View style={{borderColor: 'white', height: '100%'}}>
        <NavigationHeader title="Thông báo của bạn" />
      </View>
    </SafeAreaView>
  );
};

export default Notification;
