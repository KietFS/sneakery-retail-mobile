import React from 'react'
import { Text, View } from 'react-native'
import useTheme from '../../../../hooks/useTheme'
import { Button, TextInput } from '../../../../components/atoms'
import { useForm } from 'react-hook-form'
import { ScrollView } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

interface IEditAddressProps {}

const EditAddress: React.FC<IEditAddressProps> = props => {
  const { Colors } = useTheme()
  const { control } = useForm()
  const navigation = useNavigation()
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
          Chỉnh sửa thông tin giao hàng
        </Text>
        <View style={{ marginTop: 24 }}>
          <TextInput
            control={control}
            value="Quận Thủ Đức"
            name="district"
            placeholder="Chọn Quận của bạn"
            label="Quận"
            inputMode="text"
          />
          <TextInput
            control={control}
            value="Phường Linh Chiểu"
            name="ward"
            placeholder="Chọn phường của bạn"
            label="Phường"
            inputMode="text"
            customStyle={{ marginTop: 16 }}
          />
          <TextInput
            control={control}
            value="Số 1 Võ Văn Ngân"
            name="address"
            placeholder="Nhập địa chỉ cụ thể của bạn"
            label="Địa chỉ"
            inputMode="text"
            customStyle={{ marginTop: 16 }}
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
          width: '100%',
        }}
      >
        <Button
          customStyle={{ marginBottom: 12, width: 380 }}
          label="Lưu lại"
        />
        <Button
          customStyle={{ width: 380 }}
          variant="outline"
          label="Quay về"
          onPress={() => navigation.goBack()}
        />
      </View>
    </View>
  )
}

export default EditAddress
