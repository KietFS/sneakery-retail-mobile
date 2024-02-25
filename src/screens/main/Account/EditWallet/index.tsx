import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import useTheme from '../../../../hooks/useTheme'
import { Button, TextInput } from '../../../../components/atoms'
import { useForm } from 'react-hook-form'
import { ScrollView } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../store'
import { useAuth } from '../../../../hooks/useAuth'
import { NumberFormWithBottomSheet } from '../../../../components/molecules'

interface IEditWalletProps {}

const EditWallet: React.FC<IEditWalletProps> = props => {
  const { Colors } = useTheme()
  const { control } = useForm()
  const navigation = useNavigation()
  const { accountBalance } = useSelector(
    (state: RootState) => state.authReducer,
  )

  const { dispatchDeposit, isDepositting, dispatchRefreshWallet } = useAuth()
  return (
    <View
      style={{
        height: '100%',
        justifyContent: 'space-between',
      }}
    >
      <ScrollView
        style={{ height: '80%' }}
        contentContainerStyle={{ paddingVertical: 24, paddingHorizontal: 16 }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: Colors.secondary[500],
          }}
        >
          Thông tin số dư
        </Text>
        <View style={{ marginTop: 16, flexDirection: 'row' }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'normal',
              color: Colors.secondary[500],
              marginRight: 8,
            }}
          >
            Số dư hiện tại của bạn
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: Colors.primary[500],
              marginRight: 16,
            }}
          >
            ${(accountBalance as number)?.toString()?.prettyMoney() || ''}
          </Text>

          <TouchableOpacity onPress={() => dispatchRefreshWallet()}>
            <Image
              source={require('../../../../assets/icons/Refresh.png')}
              style={{ width: 16, height: 16 }}
            />
          </TouchableOpacity>
        </View>
        <Text
          style={{
            fontSize: 14,
            fontWeight: 'normal',
            color: Colors.secondary[400],
            marginTop: 16,
          }}
        >
          *Lưu ý: Người dùng có thể nạp tiền vào tài khoản của mình thông qua
          phiên bản web của chúng tôi bằng cách sử dụng dịch vụ thanh toán trực
          tuyến Paypal. Quá trình nạp tiền trên phiên bản web của chúng tôi
          nhanh chóng và dễ dàng để bạn có thể nhanh chóng sử dụng các tính năng
          của hệ thống. Tuy nhiên, đối với phiên bản mobile của chúng tôi, tính
          năng nạp tiền đang trong quá trình phát triển và chưa hoàn thiện.
          Chúng tôi đang nỗ lực để sớm mang đến cho người dùng trải nghiệm tốt
          nhất trên cả hai phiên bản
        </Text>
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
          width: '100%',
        }}
      >
        <NumberFormWithBottomSheet
          title="Nạp thêm tiền"
          minValue={1}
          loading={isDepositting}
          onBid={value => dispatchDeposit(value)}
        />
        <Button
          variant="outline"
          isLoading={false}
          customStyle={{ width: 380 }}
          label="Quay về"
          onPress={() => navigation.goBack()}
        />
      </View>
    </View>
  )
}

export default EditWallet
