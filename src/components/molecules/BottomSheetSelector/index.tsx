import React, { ReactNode } from 'react'

//components
import {
  View,
  Modal,
  TextInput,
  ViewStyle,
  StyleProp,
  TouchableHighlight,
  Keyboard,
  TextStyle,
  Platform,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Text,
} from 'react-native'
import {
  FlatList,
  GestureHandlerRootView as RNGestureView,
} from 'react-native-gesture-handler'
import { ActivityIndicator } from 'react-native-paper'
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet'

//utils
import { Controller } from 'react-hook-form'

//hooks
import { useCallback, useRef, useMemo, useState } from 'react'
import useTheme from '../../../hooks/useTheme'

interface IBottomSheetProps<T = any> {
  options: T[]
  optionSelected?: T | null
  optionLabelField?: string
  optionValueField?: string
  searchable?: boolean

  searchPlaceholder?: string
  onChangeSearch?: (search: string) => void

  onSelect?: (item: T) => void
  customRenderItem?: (item: T) => ReactNode
  handleCloseSheet?: () => void

  onEndReach?: () => void
  loadingFooter?: boolean
}

const BottomSheetComponent: React.FC<IBottomSheetProps> = props => {
  //props
  const {
    options,
    optionLabelField = 'name',
    optionValueField = 'id',
    optionSelected = null,
    searchPlaceholder = 'Filter by name',
    onChangeSearch,
    onSelect,
    handleCloseSheet,
    customRenderItem,
    onEndReach = () => null,
    loadingFooter = false,
  } = props

  //local state
  const [visibleModal, setVisibleModal] = useState<boolean>(true)
  const [search, setSearch] = useState<string>('')

  // hooks
  const { Colors } = useTheme()
  const sheetRef = useRef<BottomSheet>(null)

  // variables
  const snapPoints = useMemo(
    () => [
      Platform.OS === 'ios' ? '50%' : '55%',
      Platform.OS === 'ios' ? '93%' : '97%',
    ],
    [],
  )

  // functions
  const handleSheetChange = useCallback((index: any) => {}, [])

  const handleSnapPress = useCallback((index: any) => {
    sheetRef.current?.snapToIndex(index)
  }, [])

  const onCloseSheet = useCallback(() => {
    handleCloseSheet?.()
    setVisibleModal(false)
  }, [])

  // render
  const renderItem = useCallback(
    ({ item }: any) => {
      if (customRenderItem === undefined) {
        return (
          <TouchableHighlight
            underlayColor={Colors.secondary[300]}
            onPress={() => onSelect?.(item)}
            style={{
              paddingHorizontal: 16,
              paddingVertical: 20,
              backgroundColor:
                optionSelected?.[optionValueField] === item?.[optionValueField]
                  ? Colors.secondary[200]
                  : 'transparent',
              borderBottomColor: Colors.secondary[200],
              borderBottomWidth: 1,
            }}
          >
            <Text style={{ color: Colors.secondary[800] }}>
              {item?.[optionLabelField as any] as string}
            </Text>
          </TouchableHighlight>
        )
      } else {
        return (
          <View>{customRenderItem?.({ item, optionSelected, onSelect })}</View>
        )
      }
    },

    [],
  )

  const renderBackdrop = useCallback(
    (props: any) => <BottomSheetBackdrop {...props} />,
    [],
  )

  const filterOptions = useMemo(
    () =>
      options.filter(option => {
        return option?.[optionLabelField]
          .toLowerCase()
          .includes(search.toLowerCase())
      }),
    [search, options],
  )

  React.useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardWillShow', event => {
      sheetRef.current?.snapToIndex(1)
    })
    const hideSubscription = Keyboard.addListener('keyboardWillHide', () => {
      sheetRef.current?.snapToIndex(0)
    })

    return () => {
      showSubscription.remove()
      hideSubscription.remove()
    }
  })

  return (
    <Modal transparent visible={visibleModal}>
      {/* RNGestureView for animation on android bottom sheet */}
      <RNGestureView style={{ width: '100%', height: '100%' }}>
        <View
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            backgroundColor: 'rgba(0,0,0,0.6)',
          }}
        >
          <BottomSheet
            ref={sheetRef}
            index={0}
            snapPoints={snapPoints}
            enablePanDownToClose
            onClose={onCloseSheet}
            onChange={handleSheetChange}
            backdropComponent={renderBackdrop}
          >
            <TouchableOpacity
              onPress={onCloseSheet}
              style={{
                marginBottom: 16,
                marginRight: 16,
                alignSelf: 'flex-end',
              }}
            ></TouchableOpacity>
            {props.searchable ? (
              <TextInput
                allowFontScaling={false}
                placeholder={searchPlaceholder}
                placeholderTextColor={Colors.secondary[600]}
                onChangeText={text => {
                  setSearch(text)
                  onChangeSearch?.(text)
                }}
                style={{
                  marginHorizontal: 8,
                  paddingHorizontal: 8,
                  borderRadius: 16,
                  height: 50,
                  borderColor: Colors.secondary[300],
                  borderWidth: 1,
                }}
              />
            ) : null}

            {filterOptions.length > 0 ? (
              <FlatList
                style={{ marginTop: 16 }}
                data={filterOptions}
                keyExtractor={(i: any) => i[optionValueField as any]}
                renderItem={renderItem as any}
                contentContainerStyle={{ backgroundColor: 'white' }}
                onEndReached={onEndReach}
                bounces={false}
                ListFooterComponent={() => {
                  if (!loadingFooter) return null
                  return (
                    <View style={{ marginVertical: 32 }}>
                      <ActivityIndicator color={Colors.success[500]} />
                    </View>
                  )
                }}
              />
            ) : options.length > 0 ? (
              <FlatList
                style={{ marginTop: 10 }}
                data={options}
                keyExtractor={(i: any) => i[optionValueField as any]}
                renderItem={renderItem as any}
                bounces={false}
              />
            ) : (
              <Text
                style={{
                  color: Colors.secondary[800],
                  textAlign: 'center',
                  width: '100%',
                }}
              >
                There is no data to show
              </Text>
            )}
          </BottomSheet>
        </View>
      </RNGestureView>
    </Modal>
  )
}

interface IBottomSheetSelectorProps<T = any>
  extends Omit<IBottomSheetProps<T>, 'isOpen'> {
  label?: string
  placeholder?: string
  searchable?: boolean
  leftIcon?: JSX.Element
  rightIcon?: JSX.Element
  customStyles?: StyleProp<ViewStyle>
  name: string
  control: any
  customStylePlaceholder?: StyleProp<TextStyle>
  customButton?: () => React.ReactNode
  customStyleInside?: StyleProp<TextStyle>
}

const BottomSheetSelector: React.FC<IBottomSheetSelectorProps> = props => {
  //props
  const {
    options,
    customStyles,
    placeholder,
    label,
    customStylePlaceholder,
    searchable = true,
    onSelect,
    customButton,
    customStyleInside,
  } = props

  //local state
  const [openBottomSheet, setOpenBottomSheet] = useState<boolean>(false)

  //hooks
  const { Colors } = useTheme()

  return (
    <>
      <Controller
        control={props.control}
        name={props.name}
        render={({ field: { value, onChange }, formState: { errors } }) => {
          return (
            <>
              {customButton ? (
                <TouchableWithoutFeedback
                  onPress={() => setOpenBottomSheet(true)}
                >
                  {customButton()}
                </TouchableWithoutFeedback>
              ) : (
                <TouchableOpacity
                  onPress={() => setOpenBottomSheet(true)}
                  style={customStyles}
                >
                  {label ? (
                    <Text
                      style={{
                        marginLeft: 4,
                        marginBottom: 4,
                        fontSize: 14,
                        fontWeight: 'bold',
                        color: !!errors?.[props.name]
                          ? Colors.error[500]
                          : Colors.secondary[500],
                      }}
                    >
                      {label}
                    </Text>
                  ) : null}
                  <View
                    style={{
                      backgroundColor: 'white',
                      height: 40 + 6,
                      paddingHorizontal: 16,
                      borderColor: !!errors?.[props.name]
                        ? Colors.error[500]
                        : Colors.secondary[400],
                      borderWidth: 1,
                      borderRadius: 50,
                      justifyContent: 'center',
                    }}
                  >
                    {!!value ? (
                      <Text
                        style={{
                          textAlign: 'left',
                          fontSize: 14,
                          fontWeight: 'normal',
                          color: Colors.secondary[600],
                        }}
                      >
                        {value?.[props.optionLabelField as any]}
                      </Text>
                    ) : (
                      <Text
                        style={{
                          textAlign: 'left',
                          color: Colors.secondary[400],
                        }}
                      >
                        {placeholder ? placeholder : ''}
                      </Text>
                    )}
                  </View>
                </TouchableOpacity>
              )}

              {openBottomSheet && (
                <BottomSheetComponent
                  {...props}
                  optionLabelField={props?.optionLabelField}
                  optionValueField={props?.optionValueField}
                  searchable={searchable}
                  optionSelected={value}
                  onSelect={item => {
                    onChange(item)
                    onSelect?.(item)
                    setOpenBottomSheet(false)
                  }}
                  options={options}
                  handleCloseSheet={() => setOpenBottomSheet(false)}
                />
              )}
            </>
          )
        }}
      />
    </>
  )
}

export default BottomSheetSelector
