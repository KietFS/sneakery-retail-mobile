import {useRoute} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import useTheme from '../../../hooks/useTheme';
import NavigationHeader from '../../../components/molecules/NavigationHeader';
import {NumberFormWithBottomSheet} from '../../../components/molecules';
import ProductSlider from '../../../components/molecules/ProductSlider';
import DetailLoadingScreen from '../DetailLoadingScreen';
import useProduct from '../../../hooks/useProduct';
import {IProduct} from '@/store/@types';
import {useAuth} from '../../../hooks/useAuth';
import {Button} from '../../../components/atoms';

interface IDetailScreenProps {}

const PoductDetailScreen: React.FC<IDetailScreenProps> = props => {
  const route: any = useRoute();
  const {Colors} = useTheme();
  const {dispatchGetProductDetail, isGettingProductDetail, productDetail} =
    useProduct();

  useEffect(() => {
    dispatchGetProductDetail(route.params?.id);
  }, []);

  const detail: IProduct = productDetail as IProduct;
  const {accessToken} = useAuth();

  return (
    <>
      {isGettingProductDetail ? (
        <DetailLoadingScreen />
      ) : (
        <>
          <SafeAreaView style={{backgroundColor: 'white', height: '88%'}}>
            <NavigationHeader title="Product Detail" />
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: 16,
                paddingBottom: 100,
                alignItems: 'center',
              }}>
              {/* <Image
                style={{height: 230, width: 360}}
                source={{
                  uri: productDetail?.thumbnail,
                }}
              /> */}
              <ScrollView
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                style={{width: '100%'}}
                contentContainerStyle={{alignItems: 'center'}}
                horizontal>
                {detail?.images?.map((image, index) => (
                  <Image
                    style={{height: 230, width: 360}}
                    source={{
                      uri: image,
                    }}
                  />
                ))}
              </ScrollView>
              <View style={{marginTop: 24, width: '100%'}}>
                <Text
                  style={{
                    fontSize: 20,
                    color: Colors.secondary[600],
                    fontWeight: 'bold',
                  }}>
                  {detail?.name}
                </Text>
                <View style={{flexDirection: 'row', marginTop: 8}}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: Colors.secondary[400],
                      fontWeight: 'normal',
                      marginRight: 8,
                    }}>
                    Thương hiệu:
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      color: Colors.secondary[500],
                      fontWeight: 'normal',
                    }}>
                    {detail?.brand}
                  </Text>
                </View>
                <View style={{flexDirection: 'row', marginTop: 8}}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: Colors.secondary[400],
                      fontWeight: 'normal',
                      marginRight: 8,
                    }}>
                    Giá bán
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      color: Colors.secondary[500],
                      fontWeight: 'normal',
                    }}>
                    {/* @ts-ignore */}
                    {detail?.price?.toString().prettyMoney() || ''}$
                  </Text>
                </View>
              </View>
              {/* <View style={{marginTop: 24, width: '100%'}}>
                <Text
                  style={{
                    fontSize: 18,
                    color: Colors.secondary[500],
                    fontWeight: 'bold',
                  }}>
                  Các lượt bid gần đây
                </Text>
                <TouchableOpacity
                  style={{
                    backgroundColor: Colors.primary[200],
                    width: 100,
                    alignItems: 'center',
                    paddingVertical: 8,
                    marginTop: 16,
                    borderRadius: 16,
                  }}>
                  <Text
                    style={{fontWeight: 'bold', color: Colors.primary[500]}}>
                    Xem tất cả
                  </Text>
                </TouchableOpacity>
              </View> */}
            </ScrollView>
          </SafeAreaView>
          <View
            style={{
              height: '12%',
              backgroundColor: 'white',
              borderTopColor: Colors.secondary[200],
              borderTopWidth: 1,
              paddingHorizontal: 24,
              paddingVertical: 12,
            }}>
            <Button label="Thêmc vào giỏ hàng" />
          </View>
        </>
      )}
    </>
  );
};

export default PoductDetailScreen;
