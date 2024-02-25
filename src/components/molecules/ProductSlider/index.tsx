import React, { useState } from 'react'

//components
import { Image, Pressable, SectionList, View } from 'react-native'
import ThinkingStorySet from '../../../assets/images/ThinkingStorySet.png'
import PhoneStorySet from '../../../assets/images/PhoneStorySet.png'
import ReceiveStorySet from '../../../assets/images/ReceiveStorySet.png'

//hooks
import { useTranslation } from 'react-i18next'
import useTheme from '../../../hooks/useTheme'

interface IProductSliderProps {}

const ProductSlider: React.FC<IProductSliderProps> = props => {
  //local state
  const [currentIndex, setCurrentIndex] = useState<number>(0)

  //hooks
  const { Colors } = useTheme()

  const { t } = useTranslation()

  //dummy data
  const DATA = [
    {
      title: 'Languages',
      data: [
        {
          id: '0',
          title: t('welcome.first_slider_title'),
          description: t('welcome.first_slider_description'),
          image: ThinkingStorySet,
        },
        {
          id: '1',
          title: t('welcome.second_slider_title'),
          description: t('welcome.second_slider_description'),
          image: PhoneStorySet,
        },
        {
          id: '2',
          title: t('welcome.third_slider_title'),
          description: t('welcome.third_slider_description'),
          image: ReceiveStorySet,
        },
      ],
    },
  ]

  //functions
  const onCheckViewableItems = ({ viewableItems, changed }: any) => {
    setCurrentIndex(viewableItems[0]?.index)
  }

  return (
    <View style={{ width: '100%' }}>
      <SectionList
        sections={DATA}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onCheckViewableItems}
        pagingEnabled
        keyExtractor={(item, index) => item.id + index}
        renderItem={({ item }) => (
          <View>
            <Image
              source={{
                uri: 'https://sneakery.vercel.app/_next/image?url=https%3A%2F%2Fimages.stockx.com%2F360%2FAir-Jordan-1-Retro-High-Dior%2FImages%2FAir-Jordan-1-Retro-High-Dior%2FLv2%2Fimg01.jpg%3Ffm%3Davif%26auto%3Dcompress%26w%3D768%26dpr%3D2%26updated_at%3D1635189753%26h%3D512%26q%3D75&w=3840&q=75',
              }}
              style={{ width: 250, height: 200 }}
            />
          </View>
        )}
        horizontal
      />
      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          marginTop: 20,
          flexDirection: 'row',
        }}
      >
        <Pressable
          style={{
            width: 5,
            height: 5,
            borderRadius: 50,
            backgroundColor:
              currentIndex === 0 ? Colors.primary[500] : Colors.secondary[300],
          }}
        ></Pressable>
        <Pressable
          style={{
            width: 5,
            height: 5,
            borderRadius: 50,
            backgroundColor:
              currentIndex === 1 ? Colors.primary[500] : Colors.secondary[300],
            marginLeft: 10,
          }}
        ></Pressable>
        <Pressable
          style={{
            width: 5,
            height: 5,
            borderRadius: 50,
            backgroundColor:
              currentIndex === 2 ? Colors.primary[500] : Colors.secondary[300],
            marginLeft: 10,
          }}
        ></Pressable>
      </View>
    </View>
  )
}

export default ProductSlider
