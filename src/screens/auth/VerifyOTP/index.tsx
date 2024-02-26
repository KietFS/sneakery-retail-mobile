import {postSignInAccount, postVerifyOTP} from '../../../store/auth/actions';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  Text,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import Button from '../../../components/atoms/Button';
import TextInput from '../../../components/atoms/TextInput';
import AuthNavigateHeader from '../../../components/organisms/AuthNavigateHeader';
import useTheme from '../../../hooks/useTheme';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {RootState} from '../../../store';
import {useAuth} from '../../../hooks/useAuth';
import {validateEmail} from '../../../utils/prototype';
import OTPInput from '../../../components/atoms/OTPInput';

interface IVerifyOTPScreenProps {}

const VerifyOTPScreen: React.FC<IVerifyOTPScreenProps> = props => {
  const {Colors} = useTheme();
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [code, setCode] = useState<string>('');

  const route: any = useRoute();

  console.log('route is', route?.params);

  const handlePressVerify = () => {
    dispatch(
      postVerifyOTP({
        userId: route?.params?.userId,
        code: code,
      }),
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <SafeAreaView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <AuthNavigateHeader />
            <View style={{height: '75%'}}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '700',
                  color: Colors.secondary[600],
                }}>
                Xác nhận OTP của bạn
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '500',
                  marginTop: 5,
                  color: Colors.secondary[500],
                }}>
                Chúng tôi đã gửi OTP gồm 6 chữ số đến email của bạn
              </Text>
              <OTPInput otpValue={code} setOtpValue={value => setCode(value)} />
              <Text
                style={{
                  marginTop: 10,
                  fontSize: 14,
                  color: Colors.primary[600],
                  fontWeight: '700',
                  textDecorationLine: 'underline',
                }}>
                Không nhận được email, gửi lại sau 60s
              </Text>
            </View>
            <View style={{paddingBottom: Platform.OS == 'android' ? 30 : 0}}>
              <Button label={'Xác nhận'} onPress={handlePressVerify} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    height: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'space-between',
  },
  textInput: {
    height: 40,
    borderColor: '#000000',
    borderBottomWidth: 1,
    marginBottom: 36,
  },
  btnContainer: {},
});

export default VerifyOTPScreen;
