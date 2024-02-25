import React from 'react'

//components
import { Image, Text, TouchableOpacity, View } from 'react-native'

//hooks
import useTheme from '../../../hooks/useTheme'
import { useNavigation } from '@react-navigation/native'

interface IAuthNavigateHeaderProps {
  title: string
}

const NavigationHeader: React.FC<IAuthNavigateHeaderProps> = props => {
  //props
  const { title } = props

  //hooks
  const { Colors } = useTheme()
  const navigation = useNavigation()

  return (
    <View
      style={{
        paddingHorizontal: 24,
        paddingVertical: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../../assets/icons/ArrowLeft.png')}
            style={{ width: 30, height: 30, marginRight: 8 }}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: Colors.secondary[700],
          }}
        >
          {title}
        </Text>
      </View>
      <View style={{ width: '33%' }}></View>
    </View>
  )
}

export default NavigationHeader
