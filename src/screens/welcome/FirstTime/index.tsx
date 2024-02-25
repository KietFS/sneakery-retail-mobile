import React, { useState } from 'react'
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
} from 'react-native'
import { Button } from '../../../components/atoms'
import WelcomSlider from '../../../components/molecules/WelcomeSlider'
import useTheme from '../../../hooks/useTheme'

import WorldIcon from '../../../assets/icons/World.png'
import { useNavigation } from '@react-navigation/native'
import BaseBottomSheet from '../../../components/molecules/BaseBottomSheet'

import VietNamIcon from '../../../assets/icons/VietNam.png'
import EnglandIcon from '../../../assets/icons/UnitedKingdom.png'

import i18n from '../../../translations'
import { useTranslation } from 'react-i18next'

interface IFirstTimeScreenProps {}

const FirstTime: React.FC<IFirstTimeScreenProps> = props => {
  const navigation = useNavigation()
  const { Colors } = useTheme()
  const { t } = useTranslation()
  const { height } = useWindowDimensions()
  const [openLanguageSettings, setOpenLanguageSetting] =
    useState<boolean>(false)

  return (
    <SafeAreaView style={{ backgroundColor: Colors.secondary[100] }}>
      <View
        style={{
          height: height,
          justifyContent: 'space-between',
          backgroundColor: Colors.secondary[100],
        }}
      >
        <View
          style={{
            justifyContent: 'space-between',
            marginTop: 10,
            flexDirection: 'row',
            width: '100%',
            paddingHorizontal: 20,
          }}
        >
          <Text
            style={{
              fontSize: 24,
              fontWeight: '800',
              color: Colors.primary[500],
            }}
          >
            Sneakery
          </Text>
          <TouchableOpacity
            onPress={() => setOpenLanguageSetting(true)}
            style={{
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderWidth: 1,
              borderColor: Colors.secondary[400],
              justifyContent: 'center',
              borderRadius: 50,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                color: Colors.secondary[600],
                fontWeight: '500',
                fontSize: 14,
              }}
            >
              {t('welcome.language')}
            </Text>
            <Image
              source={WorldIcon}
              style={{ width: 20, height: 20, marginLeft: 5 }}
            />
          </TouchableOpacity>
        </View>

        <WelcomSlider />
        <View
          style={{
            paddingBottom: Platform.OS === 'ios' ? 80 : 40,
            paddingHorizontal: 20,
          }}
        >
          <Button
            label={t('welcome.login_now')}
            onPress={() => navigation.navigate('Login' as never)}
          />
          <Button
            label={t('welcome.register_now')}
            onPress={() => navigation.navigate('Register' as never)}
            variant="outline"
            customStyle={{ marginTop: 8 }}
          />
        </View>
      </View>

      <BaseBottomSheet
        initialSnapPoints={['22%']}
        children={
          <View style={{ paddingVertical: 20 }}>
            <TouchableOpacity
              onPress={() => {
                i18n.changeLanguage('vi')
                setOpenLanguageSetting(false)
              }}
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
                paddingVertical: 15,
                paddingHorizontal: 20,
                borderBottomColor: Colors.secondary[300],
                borderBottomWidth: 1,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: Colors.secondary[600],
                  fontWeight: '500',
                }}
              >
                {t('welcome.vietnamese')} (VN)
              </Text>
              <Image source={VietNamIcon} style={{ width: 30, height: 30 }} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                i18n.changeLanguage('en')
                setOpenLanguageSetting(false)
              }}
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
                paddingVertical: 15,
                paddingHorizontal: 20,
                borderBottomColor: Colors.secondary[300],
                borderBottomWidth: 1,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: Colors.secondary[600],
                  fontWeight: '500',
                }}
              >
                {t('welcome.english')} (EN)
              </Text>
              <Image source={EnglandIcon} style={{ width: 30, height: 30 }} />
            </TouchableOpacity>
          </View>
        }
        isOpen={openLanguageSettings}
      />
    </SafeAreaView>
  )
}

export default FirstTime
