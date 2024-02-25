import {postSignInAccount} from '../../../store/auth/actions';
import React, {useEffect, useRef} from 'react';
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
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {RootState} from '../../../store';
import {useAuth} from '../../../hooks/useAuth';
import {ScrollView} from 'react-native-gesture-handler';
import {validateEmail} from '../../../utils/prototype';

interface IRegisterScreenProps {}

const RegisterScreen: React.FC<IRegisterScreenProps> = props => {
  const {Colors} = useTheme();
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {register, control, handleSubmit, getValues, watch} = useForm();
  const {isRegisterLoading} = useSelector(
    (state: RootState) => state?.authReducer,
  );
  const password = useRef({});
  password.current = watch('password', '');

  const {dispatchRegisterAccount} = useAuth();

  const handlePressRegister = () => {
    const email = getValues('email');
    const username = getValues('name');
    const password = getValues('password');
    const phoneNumber = getValues('phoneNumber');
    dispatchRegisterAccount(email, password, username, phoneNumber);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <SafeAreaView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <AuthNavigateHeader />
            <ScrollView
              style={{height: '75%'}}
              contentContainerStyle={{paddingBottom: 200}}
              showsVerticalScrollIndicator={false}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '700',
                  color: Colors.secondary[600],
                  marginTop: 24,
                }}>
                {t('register.enter_your_email_title')}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '500',
                  marginTop: 5,
                  color: Colors.secondary[500],
                }}>
                {t('register.enter_your_email_description')}
              </Text>
              <TextInput
                control={control}
                {...register('name', {required: 'This field is required'})}
                placeholder={t('register.enter_your_full_name')}
                label={t('register.full_name')}
                customStyle={[styles.textInput, {marginTop: 20}]}
              />
              <TextInput
                control={control}
                {...register('email', {
                  required: 'This field is required',
                  validate: validateEmail,
                })}
                placeholder={t('register.enter_your_email')}
                label={t('register.email')}
                customStyle={[styles.textInput, {marginTop: 8}]}
              />
              <TextInput
                control={control}
                {...register('phoneNumber')}
                placeholder={t('register.enter_your_phone_number')}
                label={t('register.phone_number')}
                customStyle={[styles.textInput, {marginTop: 8}]}
              />
              <TextInput
                control={control}
                {...register('password', {
                  required: 'This field is required',
                  minLength: {
                    value: 6,
                    message: 'Mật khẩu phải lớn hơn 6 kí tự',
                  },
                })}
                placeholder={t('register.enter_your_password')}
                label={t('register.password')}
                customStyle={[styles.textInput, {marginTop: 8}]}
                secureTextEntry={true}
                inputMode="text"
              />
              <TextInput
                control={control}
                {...register('confirm_password', {
                  required: 'This field is required',
                  validate: value =>
                    value === password.current || 'Mật khẩu không trùng khớp',
                })}
                placeholder={t('register.enter_confirm_password')}
                label={t('register.confirm_password')}
                customStyle={[styles.textInput, {marginTop: 8}]}
                secureTextEntry={true}
                inputMode="text"
              />
              <Text
                style={{
                  marginTop: 20,
                  fontSize: 14,
                  color: Colors.primary[600],
                  fontWeight: '700',
                  textDecorationLine: 'underline',
                }}>
                {t('register.have_problem_with_email')}
              </Text>
            </ScrollView>
            <View style={{paddingBottom: Platform.OS == 'android' ? 30 : 0}}>
              <Button
                isLoading={isRegisterLoading}
                label={t('register.continue')}
                onPress={handleSubmit(handlePressRegister)}
              />
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

export default RegisterScreen;
