import React, { useEffect } from 'react'
import { Text, View } from 'react-native'
import useTheme from '../../../../hooks/useTheme'
import { Button, TextInput } from '../../../../components/atoms'
import { useForm } from 'react-hook-form'
import { ScrollView } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { useAuth } from '../../../../hooks/useAuth'
import { IUser } from '../../../../types'

interface IEditProfileProps {}

const EditProfile: React.FC<IEditProfileProps> = props => {
  const { Colors } = useTheme()
  const { control, setValue } = useForm()
  const navigation = useNavigation()
  const { userInfo } = useAuth()

  const info: IUser = userInfo as any

  console.log('user info', userInfo)

  useEffect(() => {
    if (!!userInfo) {
      setValue('name', (userInfo as IUser).username)
      setValue('email', (userInfo as IUser).email)
    }
  }, [userInfo])

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
          Chỉnh sửa thông tin cá nhân
        </Text>
        <View style={{ marginTop: 24 }}>
          <TextInput
            control={control}
            name="name"
            placeholder="Nhập tên của bạn"
            label="Tên"
            inputMode="text"
          />
          <TextInput
            control={control}
            name="email"
            placeholder="Nhập email của bạn"
            label="Email"
            inputMode="email"
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
        }}
      >
        <Button
          label="Lưu lại"
          customStyle={{ marginBottom: 12, width: 380 }}
        />
        <Button
          variant="outline"
          customStyle={{ width: 380 }}
          label="Quay về"
          onPress={() => navigation.goBack()}
        />
      </View>
    </View>
  )
}

export default EditProfile
