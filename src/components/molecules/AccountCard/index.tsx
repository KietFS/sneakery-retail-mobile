import React from 'react'

//components
import { Image, ImageSourcePropType, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

//hooks
import useTheme from '../../../hooks/useTheme'

interface IProfileCardProps {
  title: string
  onPress?: () => void
  iconSource?: ImageSourcePropType
}

const AccountCard: React.FC<IProfileCardProps> = props => {
  //props
  const { title, onPress } = props

  //call hooks
  const { Colors } = useTheme()

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={{
        backgroundColor: Colors.secondary[100],
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 16,
        marginBottom: 16,
        flexDirection: 'row',
      }}
    >
      {!!props.iconSource ? (
        <Image
          source={props.iconSource}
          style={{ width: 20, height: 20, marginRight: 8 }}
        />
      ) : null}

      <Text
        style={{
          color: Colors.secondary[600],
          fontSize: 16,
          fontWeight: '600',
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  )
}

export default AccountCard
