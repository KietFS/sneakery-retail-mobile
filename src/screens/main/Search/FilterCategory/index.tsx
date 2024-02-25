import React from 'react'
import { Text, View } from 'react-native'
import useTheme from '../../../../hooks/useTheme'
import { Button, Slider, TextInput } from '../../../../components/atoms'
import { useForm } from 'react-hook-form'
import { ScrollView } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import BottomSheetSelector from '../../../../components/molecules/BottomSheetSelector'
import useProduct from '../../../../hooks/useProduct'

interface IFilterCategoryProps {}

const FilterCategory: React.FC<IFilterCategoryProps> = props => {
  const { Colors } = useTheme()
  const { control, getValues, handleSubmit } = useForm()
  const navigation = useNavigation()
  const { dispatchFilterProduct } = useProduct()

  const handlePressSubmit = () => {
    const keyword = null
    const priceStart = !!getValues('price') ? (0 as number).toString() : null
    const priceEnd = !!getValues('price') ? `${getValues('price')}000` : null
    const condition = !!getValues('condition')
      ? getValues('condition')?.id
      : null
    const category = !!getValues('category') ? getValues('category')?.id : null
    const brand = !!getValues('brand') ? [getValues('brand')?.id] : []
    const color = !!getValues('color') ? [getValues('color')?.id] : []
    const size = !!getValues('size') ? [getValues('size')?.id] : []

    dispatchFilterProduct(
      keyword,
      priceStart,
      priceEnd,
      condition,
      category,
      brand,
      color,
      size,
    )
  }

  const {} = useTheme()

  return (
    <View
      style={{
        height: '100%',
        backgroundColor: 'white',
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
          Cài đặt lọc sản phẩm
        </Text>
        <View style={{ marginTop: 24 }}></View>
        <BottomSheetSelector
          searchable={false}
          label="Giới tính"
          placeholder="Chọn giới tính"
          control={control}
          optionLabelField="name"
          optionValueField="id"
          name="category"
          options={[
            { id: 'nam', name: 'Nam' },
            { id: 'nu', name: 'Nu' },
            { id: 'unisex', name: 'Unisex' },
          ]}
        />
        <BottomSheetSelector
          customStyles={{ marginTop: 16 }}
          searchable={false}
          label="Thương hiệu"
          placeholder="Chọn thương hiệu"
          control={control}
          optionLabelField="name"
          optionValueField="id"
          name="brand"
          options={[
            { id: 'nike', name: 'Nike' },
            { id: 'adidas', name: 'Adidas' },
            { id: 'puma', name: 'Puma' },
            { id: 'reebok', name: 'Reebok' },
            { id: 'lv', name: 'Louis Vuiton' },
            { id: 'balenciaga', name: 'Balenciaga' },
          ]}
        />

        <BottomSheetSelector
          customStyles={{ marginTop: 16 }}
          searchable={false}
          label="Tình trạng"
          placeholder="Chọn tình trạng"
          control={control}
          optionLabelField="name"
          optionValueField="id"
          name="condition"
          options={[
            { id: 'FULLBOX', name: 'Full box' },
            { id: 'USED', name: 'Đã qua sử dụng' },
          ]}
        />

        <BottomSheetSelector
          customStyles={{ marginTop: 16 }}
          searchable={false}
          label="Size"
          placeholder="Chọn size"
          control={control}
          optionLabelField="name"
          optionValueField="id"
          name="size"
          options={[
            { id: '35', name: 'Size 35' },
            { id: '36', name: 'Size 36' },
            { id: '37', name: 'Size 37' },
            { id: '38', name: 'Size 38' },
            { id: '39', name: 'Size 39' },
            { id: '40', name: 'Size 40' },
            { id: '41', name: 'Size 41' },
            { id: '42', name: 'Size 42' },
            { id: '43', name: 'Size 43' },
            { id: '44', name: 'Size 44' },
            { id: '45', name: 'Size 45' },
          ]}
        />

        <BottomSheetSelector
          customStyles={{ marginTop: 16 }}
          searchable={false}
          label="Màu"
          placeholder="Chọn màu"
          control={control}
          optionLabelField="name"
          optionValueField="id"
          name="color"
          options={[
            { id: 'WHITE', name: 'Màu trắng' },
            { id: 'SILVER', name: 'Màu bạc' },
            { id: 'GRAY', name: 'Màu xám' },
            { id: 'BLACK', name: 'Màu đen' },
            { id: 'DENIM', name: 'Màu denim' },
            { id: 'CREAM', name: 'Màu kem' },
            { id: 'RED', name: 'Màu đỏ' },
            { id: 'PINK', name: 'Màu hồng' },
            { id: 'GREEN', name: 'Màu xanh' },
            { id: 'YELLOW', name: 'Màu vàng' },
            { id: 'BROWN', name: 'Màu nâu' },
          ]}
        />
        <Slider
          name="price"
          control={control}
          label="Giá (k$)"
          containerStyles={{ marginTop: 16 }}
        />
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
          customStyle={{ marginBottom: 12, width: 380 }}
          label="Lưu lại"
          onPress={handleSubmit(handlePressSubmit)}
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

export default FilterCategory
