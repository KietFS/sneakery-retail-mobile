import {useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import useTheme from '../../../hooks/useTheme';
import NavigationHeader from '../../../components/molecules/NavigationHeader';
import DetailLoadingScreen from '../DetailLoadingScreen';
import useProduct from '../../../hooks/useProduct';
import {IProduct} from '@/store/@types';
import {useAuth} from '../../../hooks/useAuth';
import {Button} from '../../../components/atoms';
import AddToCartBottomSheet from '../../../components/organisms/AddToCartBottomSheet';
import Comment from '../../../components/molecules/Comment';
import CommentInput from '../../../components/atoms/CommentInput';

interface IDetailScreenProps {}

const PoductDetailScreen: React.FC<IDetailScreenProps> = props => {
  const route: any = useRoute();
  const {Colors} = useTheme();
  const {
    dispatchGetProductDetail,
    dispatchAddProductToCart,
    dispatchGetProductComments,
    isGettingProductDetail,
    dispatchCommentOnProduct,
    dispatchAddToFavouriteProduct,
    isAddingToFavouriteProduct,
    productDetail,
    productComments,
    isGettingProductComments,
  } = useProduct();
  const [openAddToCartSheet, setOpenAddToCartSheet] = useState<boolean>(false);
  const [sizeSelected, setSizeSelected] = useState<{
    size: number;
    quantity: number;
  } | null>(null);

  useEffect(() => {
    dispatchGetProductDetail(route.params?.id);
    dispatchGetProductComments(route.params?.id);
  }, []);

  useEffect(() => {
    if (productDetail) {
      setSizeSelected(productDetail?.sizes[0]);
    }
  }, [productDetail]);

  const detail: IProduct = productDetail as IProduct;

  const handleAddToFavouriteProduct = () => {
    dispatchAddToFavouriteProduct(productDetail?._id);
  };

  return (
    <>
      {isGettingProductDetail ? (
        <DetailLoadingScreen />
      ) : (
        <>
          <SafeAreaView style={{backgroundColor: 'white', height: '84%'}}>
            <NavigationHeader title="Product Detail" />
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: 16,
                paddingBottom: 400,
                alignItems: 'center',
              }}>
              <Image
                style={{height: 230, width: 360}}
                source={{
                  uri: productDetail?.thumbnail,
                }}
              />
              <ScrollView
                bounces={true}
                showsHorizontalScrollIndicator={false}
                style={{marginTop: 20, width: '100%'}}
                contentContainerStyle={{alignItems: 'center'}}
                horizontal>
                {detail?.images?.map((image, index) => (
                  <TouchableOpacity
                    key={index}
                    style={{
                      width: 200,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderColor: Colors.secondary[300],
                      borderWidth: 1,

                      borderRadius: 20,
                      marginRight: 10,
                      overflow: 'hidden', // Tắt overflow để tránh mờ border và border radius
                    }}>
                    <Image
                      resizeMethod="scale"
                      style={{
                        minHeight: 100,
                        maxHeight: 200,
                        height: 130,
                        width: '100%',
                      }}
                      source={{
                        uri: image,
                      }}
                    />
                  </TouchableOpacity>
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
                <View style={{marginTop: 4}}>
                  <Text
                    numberOfLines={3}
                    style={{
                      fontSize: 14,
                      color: Colors.secondary[500],
                      fontWeight: 'normal',
                      fontStyle: 'italic',
                    }}>
                    {detail?.description}
                  </Text>
                </View>

                <View style={{flexDirection: 'row', marginTop: 8}}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: Colors.secondary[600],
                      fontWeight: '600',
                      marginRight: 8,
                    }}>
                    Thương hiệu:
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      color: Colors.secondary[600],
                      fontWeight: 'normal',
                    }}>
                    {detail?.brand}
                  </Text>
                </View>
                <View style={{flexDirection: 'row', marginTop: 8}}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: Colors.secondary[600],
                      fontWeight: '600',
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
                <View style={{marginTop: 8}}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: Colors.secondary[600],
                      fontWeight: '600',
                    }}>
                    Các size hiện có:
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 12,
                      flexWrap: 'wrap',
                    }}>
                    {(
                      productDetail?.sizes as {size: number; quantity: number}[]
                    )?.map((value, index) => (
                      <TouchableOpacity
                        onPress={() => setSizeSelected(value)}
                        style={{
                          marginRight: 10,
                          marginBottom: 6,
                          borderColor:
                            sizeSelected == value
                              ? Colors.primary[600]
                              : Colors.secondary[300],
                          borderWidth: sizeSelected == value ? 2 : 1,
                          borderRadius: 5,
                          paddingHorizontal: 10,
                          paddingVertical: 5,
                        }}>
                        <Text
                          style={{
                            fontSize: 16,
                            color:
                              sizeSelected == value
                                ? Colors.primary[600]
                                : Colors.secondary[600],
                          }}>
                          {value.size}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                <View style={{marginTop: 16}}>
                  <Text
                    style={{
                      fontSize: 18,
                      color: Colors.secondary[500],
                      fontWeight: '600',
                    }}>
                    Bình luận về sản phẩm
                  </Text>
                  <View style={{marginTop: 12}}></View>
                  <CommentInput
                    onPostComment={() => {}}
                    productId={detail?._id as string}
                  />
                  {productComments?.map((comment, commentIndex) => (
                    <View
                      style={{
                        borderColor: Colors.secondary[300],
                        borderWidth: 1,
                        paddingHorizontal: 10,
                        paddingVertical: 4,
                        borderRadius: 10,
                        marginBottom: 12,
                      }}>
                      <Comment {...comment} />
                    </View>
                  ))}
                </View>
              </View>
            </ScrollView>
          </SafeAreaView>
          <View
            style={{
              height: '16%',
              backgroundColor: 'white',
              borderTopColor: Colors.secondary[200],
              borderTopWidth: 1,
              paddingHorizontal: 24,
              paddingVertical: 12,
              justifyContent: 'space-between',
            }}>
            <Button
              label="Thêm vào giỏ hàng"
              onPress={() => setOpenAddToCartSheet(true)}
            />
            <Button
              isLoading={isAddingToFavouriteProduct}
              customStyle={{marginTop: 4}}
              label="Yêu thích sản phẩm"
              variant="outline"
              onPress={handleAddToFavouriteProduct}
            />
          </View>
        </>
      )}

      {openAddToCartSheet ? (
        <AddToCartBottomSheet
          size={sizeSelected}
          onAddToCart={quantity => {
            const payload = {
              productId: productDetail?._id,
              quantity: quantity,
              size: sizeSelected.size,
            };
            dispatchAddProductToCart(payload);
            setOpenAddToCartSheet(false);
          }}
          isOpen={openAddToCartSheet}
          onClose={() => setOpenAddToCartSheet(false)}
        />
      ) : null}
    </>
  );
};

export default PoductDetailScreen;
