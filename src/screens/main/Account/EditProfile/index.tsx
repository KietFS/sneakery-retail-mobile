import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import useTheme from '../../../../hooks/useTheme';
import {Button, TextInput} from '../../../../components/atoms';
import {useForm} from 'react-hook-form';
import {ScrollView} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../../../../hooks/useAuth';
import {IUser} from '../../../../store/@types';
import {useDispatch} from 'react-redux';
import {updateUserProfile} from '../../../../store/auth/actions';

interface IEditProfileProps {}

const EditProfile: React.FC<IEditProfileProps> = props => {
  const {Colors} = useTheme();
  const {control, setValue, getValues, handleSubmit} = useForm();
  const navigation = useNavigation();
  const {userInfo} = useAuth();

  const dispatch = useDispatch();

  useEffect(() => {
    if (!!userInfo) {
      setValue('name', (userInfo as IUser).username);
      setValue('phoneNumber', (userInfo as IUser).phoneNumber);
    }
  }, [userInfo]);

  const handlePressUpdateProfile = (values: any) => {
    dispatch(
      updateUserProfile({
        username: values.name,
        phoneNumber: values?.phoneNumber,
      }),
    );
  };

  return (
    <View
      style={{
        height: '100%',
        justifyContent: 'space-between',
      }}>
      <ScrollView
        style={{height: '80%'}}
        contentContainerStyle={{paddingVertical: 24, paddingHorizontal: 16}}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: Colors.secondary[500],
          }}>
          Chỉnh sửa thông tin cá nhân
        </Text>
        <View style={{marginTop: 24}}>
          <TextInput
            control={control}
            name="name"
            placeholder="Nhập tên của bạn"
            label="Tên"
            inputMode="text"
          />

          <TextInput
            control={control}
            name="phoneNumber"
            placeholder="Nhập số điện thoại của bạn"
            label="Số điện thoại"
            inputMode="text"
            customStyle={{marginTop: 16}}
          />
        </View>
      </ScrollView>
      <View
        style={{
          height: '20%',
          justifyContent: 'center',
          alignItems: 'center',
          borderTopWidth: 1,
          borderTopColor: Colors.secondary[300],
          paddingVertical: 24,
          paddingHorizontal: 16,
        }}>
        <Button
          label="Lưu lại"
          customStyle={{marginBottom: 12, width: 380}}
          onPress={handleSubmit(handlePressUpdateProfile)}
        />
        <Button
          variant="outline"
          customStyle={{width: 380}}
          label="Quay về"
          onPress={() => navigation.goBack()}
        />
      </View>
    </View>
  );
};

export default EditProfile;
