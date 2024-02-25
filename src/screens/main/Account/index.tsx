import useTheme from '../../../hooks/useTheme';
import React, {useState} from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AccountCard from '../../../components/molecules/AccountCard';
import {useAuth} from '../../../hooks/useAuth';
import {useNavigation} from '@react-navigation/native';

import BaseBottomSheet from '../../../components/molecules/BaseBottomSheet';
import {useTranslation} from 'react-i18next';

interface IAccountScreenProps {}

const Account: React.FC<IAccountScreenProps> = props => {
  const {Colors} = useTheme();
  const {dispatchLogoutAccount, userInfo} = useAuth();
  const navigation = useNavigation();
  const [openLanguageSetting, setOpenLanguageSetting] =
    useState<boolean>(false);
  const {i18n, t} = useTranslation();

  return (
    <SafeAreaView style={{backgroundColor: 'white'}}>
      <ScrollView
        style={{backgroundColor: 'white', height: '100%', marginTop: 24}}
        contentContainerStyle={{paddingHorizontal: 16}}>
        <View
          style={{
            marginTop: 16,
            width: '100%',
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'row',
              width: '85%',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                width: 50,
                height: 50,
                borderRadius: 50,
                backgroundColor: Colors.primary[500],
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 16,
              }}>
              <Text
                style={{
                  fontSize: 24,
                  color: 'white',
                  fontWeight: 'bold',
                }}>
                HK
              </Text>
            </TouchableOpacity>
            <View>
              <Text
                style={{
                  fontSize: 16,
                  color: Colors.secondary[500],
                  fontWeight: 'bold',
                }}>
                {userInfo.username}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: Colors.secondary[400],
                  fontWeight: 'normal',
                  marginTop: 8,
                }}>
                {userInfo.email}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={{padding: 8}}
            onPress={() => navigation.navigate('EditProfile' as never)}>
            <Image
              source={require('../../../assets/icons/Edit.png')}
              style={{width: 20, height: 20}}
            />
          </TouchableOpacity>
        </View>

        <View style={{marginTop: 36}}>
          <Text
            style={{
              marginBottom: 18,
              fontSize: 16,
              fontWeight: 'bold',
              color: Colors.secondary[600],
            }}>
            {t('account.account')}
          </Text>
          <AccountCard
            title={t('account.shipping_information')}
            onPress={() => navigation.navigate('EditAddress' as never)}
            iconSource={require('../../../assets/icons/MapPin.png')}
          />
          <AccountCard
            title={t('account.your_wallet')}
            onPress={() => navigation.navigate('EditWallet' as never)}
            iconSource={require('../../../assets/icons/Wallet.png')}
          />
          <AccountCard
            title={t('account.language_settings')}
            onPress={() => setOpenLanguageSetting(true)}
            iconSource={require('../../../assets/icons/World.png')}
          />
        </View>
        <View style={{marginTop: 36}}>
          <Text
            style={{
              marginBottom: 18,
              fontSize: 16,
              fontWeight: 'bold',
              color: Colors.secondary[600],
            }}>
            {t('account.general_info')}
          </Text>
          <AccountCard
            onPress={() => navigation.navigate('Policy' as never)}
            title={t('account.term_of_use')}
            iconSource={require('../../../assets/icons/Book.png')}
          />
          <AccountCard
            onPress={() => navigation.navigate('Security' as never)}
            title={t('account.security_policies')}
            iconSource={require('../../../assets/icons/Guard.png')}
          />
          <AccountCard
            title={t('account.log_out')}
            iconSource={require('../../../assets/icons/Exit.png')}
            onPress={() => {
              Alert.alert('Bạn chắc chắn muốn đăng xuất không', '', [
                {
                  text: 'Hủy bỏ',
                },
                {
                  text: 'Xác nhận',
                  onPress: () => dispatchLogoutAccount(),
                },
              ]);
            }}
          />
        </View>
      </ScrollView>
      {openLanguageSetting ? (
        <BaseBottomSheet
          initialSnapPoints={['22%']}
          children={
            <View style={{paddingVertical: 20}}>
              <TouchableOpacity
                onPress={() => {
                  i18n.changeLanguage('vi');
                  setOpenLanguageSetting(false);
                }}
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'space-between',
                  paddingVertical: 15,
                  paddingHorizontal: 20,
                  borderBottomColor: Colors.secondary[300],
                  borderBottomWidth: 1,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: Colors.secondary[600],
                    fontWeight: '500',
                  }}>
                  {t('welcome.vietnamese')} (VN)
                </Text>
                <Image
                  source={require('../../../assets/icons/VietNam.png')}
                  style={{width: 30, height: 30}}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  i18n.changeLanguage('en');
                  setOpenLanguageSetting(false);
                }}
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'space-between',
                  paddingVertical: 15,
                  paddingHorizontal: 20,
                  borderBottomColor: Colors.secondary[300],
                  borderBottomWidth: 1,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: Colors.secondary[600],
                    fontWeight: '500',
                  }}>
                  {t('welcome.english')} (EN)
                </Text>
                <Image
                  source={require('../../../assets/icons/UnitedKingdom.png')}
                  style={{width: 30, height: 30}}
                />
              </TouchableOpacity>
            </View>
          }
          isOpen={openLanguageSetting}
        />
      ) : null}
    </SafeAreaView>
  );
};

export default Account;
