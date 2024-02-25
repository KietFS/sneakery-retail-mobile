import {postSignInAccount} from '../../../store/auth/actions';
import React, {useEffect} from 'react';
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
import {validateEmail} from '../../../utils/prototype';

interface ILoginScreenProps {}

const LoginScreen: React.FC<ILoginScreenProps> = props => {
  const {Colors} = useTheme();
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {register, control, handleSubmit, getValues} = useForm();
  const {isSignInLoading} = useSelector(
    (state: RootState) => state?.authReducer,
  );

  const {isAuthenticated} = useAuth();

  const handlePressLogin = () => {
    dispatch(
      postSignInAccount({
        email: getValues('email'),
        password: getValues('password'),
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
                {t('login.enter_your_email_title')}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '500',
                  marginTop: 5,
                  color: Colors.secondary[500],
                }}>
                {t('login.enter_your_email_description')}
              </Text>
              <TextInput
                control={control}
                {...register('email', {
                  required: 'This field is required',
                  validate: validateEmail,
                  minLength: {
                    value: 6,
                    message: 'Mật khẩu phải lớn hơn 6 kí tự',
                  },
                })}
                placeholder={t('login.enter_your_email')}
                label={t('login.email')}
                keyboardType="default"
                customStyle={[styles.textInput, {marginTop: 20}]}
              />
              <TextInput
                control={control}
                {...register('password', {required: 'This field is required'})}
                placeholder={t('login.enter_your_password')}
                label={t('login.password')}
                customStyle={[styles.textInput, {marginTop: 8}]}
                secureTextEntry={true}
                inputMode="text"
              />
              <Text
                style={{
                  marginTop: 10,
                  fontSize: 14,
                  color: Colors.primary[600],
                  fontWeight: '700',
                  textDecorationLine: 'underline',
                }}>
                {t('login.have_problem_with_email')}
              </Text>
            </View>
            <View style={{paddingBottom: Platform.OS == 'android' ? 30 : 0}}>
              <Button
                isLoading={isSignInLoading}
                label={t('login.continue')}
                onPress={handleSubmit(handlePressLogin)}
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

export default LoginScreen;
