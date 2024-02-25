import React, {useEffect, useState} from 'react';
import {Image, SafeAreaView, ScrollView, Text, View} from 'react-native';
import {SearchInput} from '../../../components/atoms';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import useTheme from '../../../hooks/useTheme';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../store';
import {ProductHorizontalCard} from '../../../components/molecules';
import SearchLoadingView from './LoadingView';
import useDebounce from '../../../hooks/useDebounce';
import useProduct from '../../../hooks/useProduct';

interface ISearchScreenProps {}

const Search: React.FC<ISearchScreenProps> = props => {
  const {Colors} = useTheme();
  const navigation = useNavigation();
  const {
    filterProducts,
    priceStart,
    priceEnd,
    condition,
    category,
    brand,
    color,
    size,
    isFilteringProduct,
  } = useSelector((state: RootState) => state?.productReducer);
  const [searchOptions, setSearchOptions] = useState<string[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const debonunceValue = useDebounce(searchText, 500);
  const dispatch = useDispatch();
  const {dispatchFilterProduct} = useProduct();

  useEffect(() => {
    if (!!filterProducts) {
      let temp: string[] = [];
      !!searchText ? temp.push(searchText?.toString()) : {};
      !!priceStart ? temp.push(priceStart?.toString()) : {};
      !!priceEnd ? temp.push(priceEnd?.toString()) : {};
      !!condition ? temp.push(condition as string) : {};
      !!category ? temp.push(category as string) : {};
      brand?.length > 0 ? temp.push(brand?.[0]?.toString() as string) : {};
      color?.length > 0 ? temp.push(color?.[0]?.toString() as string) : {};
      size?.length > 0 ? temp.push(size?.[0]?.toString() as string) : {};
      setSearchOptions([...temp]);
    }
  }, [filterProducts]);

  useEffect(() => {
    if (!!debonunceValue) {
      dispatchFilterProduct(
        searchText,
        priceStart,
        priceEnd,
        condition,
        category,
        brand,
        color,
        size,
      );
    }
  }, [debonunceValue]);

  return (
    <SafeAreaView style={{backgroundColor: 'white'}}>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          alignItems: 'center',
          paddingHorizontal: 16,
          marginTop: 16,
          justifyContent: 'space-between',
        }}>
        <SearchInput
          keyboardType="default"
          onChangeText={text => setSearchText(text)}
          onIconPress={() => navigation.navigate('FilterCategory' as never)}
          placeholder="Tìm kiếm sản phẩm"
          customStyle={{width: '100%'}}
        />
      </View>
      {isFilteringProduct ? (
        <SearchLoadingView />
      ) : filterProducts?.length > 0 ? (
        <View
          style={{
            height: '100%',
            backgroundColor: 'white',
            paddingHorizontal: 16,
          }}>
          <Text
            style={{marginTop: 16, fontSize: 16, color: Colors.secondary[600]}}>
            Chúng tôi tìm thấy {filterProducts?.length} kết quả cho yêu cầu tìm
            kiếm của bạn
          </Text>
          <View
            style={{
              marginTop: 8,
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}>
            {searchOptions.map((item, index) => (
              <View
                style={{
                  paddingVertical: 4,
                  paddingHorizontal: 16,
                  marginRight: 4,
                  borderRadius: 50,
                  backgroundColor: Colors.primary[200],
                }}
                key={index.toString()}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '600',
                    color: Colors.primary[500],
                  }}>
                  {item}
                </Text>
              </View>
            ))}
          </View>
          <FlatList
            style={{
              height: '100%',
              backgroundColor: 'white',
              marginTop: 16,
            }}
            data={filterProducts}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{paddingBottom: 240}}
            renderItem={({item}) => <ProductHorizontalCard {...item} />}
          />
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{backgroundColor: 'white'}}
          contentContainerStyle={{paddingHorizontal: 16, minHeight: '100%'}}>
          <View
            style={{
              height: '60%',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 24,
            }}>
            <Image
              source={require('../../../assets/images/search.png')}
              style={{width: 300, height: 300}}
            />
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: Colors.secondary[500],
                textAlign: 'center',
              }}>
              Gõ vào tên sản phẩm để tìm kiếm
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: 'normal',
                color: Colors.secondary[600],
                marginTop: 8,
                textAlign: 'center',
              }}>
              Hoặc bạn có thể tìm kiếm theo thương hiệu, giới tính, màu sắc bằng
              cách nhấn vào nút bên phải thanh search
            </Text>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Search;
