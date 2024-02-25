import React from 'react'

//components
import { Image, ImageSourcePropType, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

//hooks
import useTheme from '../../../hooks/useTheme'

interface IBrandCardProps {
  isReverse?: boolean
  title: string
  subTitle: string
  logo: ImageSourcePropType
}

const BrandCard: React.FC<IBrandCardProps> = props => {
  //props
  const { isReverse, title, subTitle, logo } = props

  //hooks
  const { Colors } = useTheme()
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={{
        width: '100%',
        backgroundColor: 'white',
        height: 150,
        borderWidth: 1,
        borderRadius: 16,
        borderColor: Colors.secondary[300],
        paddingVertical: 16,
        paddingHorizontal: 16,
        flexDirection: isReverse ? 'row-reverse' : 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
      }}
    >
      <View style={{ maxWidth: '60%' }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: Colors.primary[600],
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            fontSize: 12,
            marginTop: 8,
            fontWeight: 'normal',
            color: Colors.secondary[600],
          }}
        >
          {subTitle}
        </Text>
      </View>
      <Image
        source={logo}
        style={{ width: 100, height: 60, backgroundColor: 'white' }}
      />
    </TouchableOpacity>
  )
}

export default BrandCard
