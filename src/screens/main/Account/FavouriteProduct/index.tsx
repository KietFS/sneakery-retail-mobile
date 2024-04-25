import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import useTheme from '../../../../hooks/useTheme';
import {Button} from '../../../../components/atoms';
import {useNavigation} from '@react-navigation/native';
import NavigationHeader from '../../../../components/molecules/NavigationHeader';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ProductHorizontalCard} from '../../../../components/molecules';
import useProduct from '../../../../hooks/useProduct';

interface IFavouriteProductProps {}

const FavouriteProduct: React.FC<IFavouriteProductProps> = props => {
  const {Colors} = useTheme();
  const navigation = useNavigation();

  const {dispatchGetFavouriteProducts, favouriteProducts} = useProduct();

  useEffect(() => {
    dispatchGetFavouriteProducts();
  }, []);

  console.log('FAVOURITE PRODUCTS', favouriteProducts);

  return (
    <SafeAreaView style={{backgroundColor: 'white'}}>
      <View style={{borderColor: 'white', height: '100%'}}>
        <NavigationHeader title="Sản phẩm yêu thích" />
        <FlatList
          style={{paddingHorizontal: 16}}
          data={favouriteProducts}
          renderItem={({item, index}) => <ProductHorizontalCard {...item} />}
        />
      </View>
    </SafeAreaView>
  );
};

export default FavouriteProduct;
