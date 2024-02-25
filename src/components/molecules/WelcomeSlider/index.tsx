import React, { useState } from 'react'
import {
  Image,
  Pressable,
  SectionList,
  Text,
  useWindowDimensions,
  View,
} from 'react-native'

import ThinkingStorySet from '../../../assets/images/ThinkingStorySet.png'
import PhoneStorySet from '../../../assets/images/PhoneStorySet.png'
import ReceiveStorySet from '../../../assets/images/ReceiveStorySet.png'

//hooks
import useTheme from '../../../hooks/useTheme'
import { useTranslation } from 'react-i18next'

interface IWelcomSliderProps {}

const WelcomSlider: React.FC<IWelcomSliderProps> = props => {
  //local state
  const [currentIndex, setCurrentIndex] = useState<number>(0)

  //hooks
  const { width } = useWindowDimensions()
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
    <View>
      <SectionList
        sections={DATA}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onCheckViewableItems}
        pagingEnabled
        keyExtractor={(item, index) => item.id + index}
        renderItem={({ item }) => (
          <View
            style={{
              width: width,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image source={item.image} style={{ width: 300, height: 300 }} />
            <Text
              style={{
                color: Colors.secondary[700],
                fontWeight: '700',
                fontSize: 20,
                marginTop: 15,
              }}
            >
              {item.title}
            </Text>
            <Text
              style={{
                fontSize: 14,
                marginTop: 5,
                color: Colors.secondary[500],
                width: '80%',
                textAlign: 'center',
              }}
            >
              {item.description}
            </Text>
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

export default WelcomSlider
