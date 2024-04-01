import React, {
  useCallback,
  useRef,
  useMemo,
  useEffect,
  useState,
  ReactNode,
} from 'react'

//components
import { View, Modal, Keyboard, Platform, Text } from 'react-native'
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { GestureHandlerRootView as RNGestureView } from 'react-native-gesture-handler'
import { Button, TextInput } from '../../atoms'

//hooks
import useTheme from '../../../hooks/useTheme'
import { useForm } from 'react-hook-form'

interface IBottomSheetComponentProps {
  handleCloseSheet?: () => void
  showButtonTop?: boolean
  children: ReactNode
}

const BottomSheetComponent: React.FC<IBottomSheetComponentProps> = props => {
  const { handleCloseSheet, children, showButtonTop } = props
  const [isShowKeyboard, setIsShowKeyboard] = useState<boolean>(false)

  //ref
  const sheetRef = useRef<BottomSheet>(null)

  //common hooks

  //local state
  const [visibleModal, setVisibleModal] = useState<boolean>(true)
  const [date, setDate] = useState<Date | undefined>()

  // variables
  const snapPoints = useMemo(
    () => [
      Platform.OS == 'ios'
        ? isShowKeyboard
          ? '63%'
          : '35%'
        : isShowKeyboard
        ? '66%'
        : '35%',
    ],
    [isShowKeyboard],
  )

  // onChange callbacks
  const handleSheetChange = useCallback((index: number) => {}, [])

  const onCloseSheet = useCallback(() => {
    handleCloseSheet?.()
    setVisibleModal(false)
  }, [])

  useEffect(() => {
    Keyboard.addListener('keyboardWillShow', () => setIsShowKeyboard(true))
    Keyboard.addListener('keyboardWillHide', () => setIsShowKeyboard(false))
  }, [])

  const renderBackdrop = useCallback(
    (props: any) => <BottomSheetBackdrop {...props} />,
    [],
  )

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
            snapPoints={snapPoints}
            enablePanDownToClose
            onClose={onCloseSheet}
            onChange={handleSheetChange}
            backdropComponent={renderBackdrop}
          >
            {children}
          </BottomSheet>
        </View>
      </RNGestureView>
    </Modal>
  )
}

interface INumberFormWithBottomSheetProps {
  title: string
  onBid: (bidNumber: number) => void
  minValue: number
  loading?: boolean
}

const NumberFormWithBottomSheet: React.FC<
  INumberFormWithBottomSheetProps
> = props => {
  //props
  const { title, onBid, minValue, loading = false } = props

  //local state
  const [openSheet, setOpenSheet] = useState<boolean>(false)

  //hooks
  const { Colors } = useTheme()
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm()

  const handlePressSubmit = () => {
    onBid(getValues('amount'))
  }

  return (
    <View style={{ width: '100%' }}>
      <TouchableOpacity
        onPress={() => setOpenSheet(true)}
        activeOpacity={0.8}
        style={{
          width: '100%',
          zIndex: 2000,
          paddingVertical: 16,
          backgroundColor: Colors.primary[500],
          justifyContent: 'center',
          borderRadius: 8,
          marginBottom: Platform.OS === 'ios' ? 16 : 8,
        }}
      >
        <Text
          style={{
            textAlign: 'center',
            fontSize: 16,
            color: 'white',
            fontWeight: 'bold',
          }}
        >
          {title}
        </Text>
      </TouchableOpacity>
      {openSheet && (
        <BottomSheetComponent
          handleCloseSheet={() => setOpenSheet(false)}
          children={
            <ScrollView
              style={{
                paddingHorizontal: 16,
                paddingVertical: 16,
                zIndex: 99,
              }}
            >
              <TextInput
                {...register('amount', {
                  min: {
                    value: minValue - 1,
                    message:
                      'Số tiền đấu giá phải lớn hơn giá hiện tại + bước nhảy',
                  },
                })}
                keyboardType="numeric"
                control={control}
                label="Nhập số tiền"
                placeholder="Nhập số tiền đấu giá của bạn"
              />
              {errors.amount && errors.amount.type === 'min' && (
                <Text
                  style={{
                    marginTop: 2,
                    color: Colors.error[500],
                    fontSize: 12,
                  }}
                >
                  Số tiền đấu giá phải lớn hơn giá hiện tại + bước nhảy
                </Text>
              )}
              <Button
                isLoading={loading}
                label="Xác nhận"
                onPress={handleSubmit(handlePressSubmit)}
                customStyle={{ marginTop: 64 }}
              />
            </ScrollView>
          }
        />
      )}
    </View>
  )
}

export default NumberFormWithBottomSheet
