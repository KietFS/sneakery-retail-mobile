import useTheme from '../../../hooks/useTheme';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import {BrandCard, ProductHorizontalCard} from '../../../components/molecules';
import ProductGrid from '../../../components/organisms/ProductGrid';
import Skeleton from '../../../components/atoms/Skeleton';
import useProduct from '../../../hooks/useProduct';
import {FlatList} from 'react-native-gesture-handler';
import TopSellerHorizontal from '../../../components/organisms/TopSellerHorizontal';
import {useAuth} from '../../../hooks/useAuth';

interface IHomeScreenProps {}

const Home: React.FC<IHomeScreenProps> = props => {
  const {Colors} = useTheme();
  const {
    dispatchGetProductHomePage,
    products,
    isGettingHomePage,
    totalRecords,
  } = useProduct();
  const [limit, setLimit] = useState<number>(5);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const {accessToken} = useAuth();

  //handle infinity load
  useEffect(() => {
    if (totalRecords > products.length || totalRecords === 0) {
      if (loadingMore && limit > 5) {
        dispatchGetProductHomePage(1, limit);
      } else {
        setLoadingMore(true);
      }
    }
  }, [limit, loadingMore]);

  console.log('ACCESS TOKEN', accessToken);

  return (
    <SafeAreaView style={{backgroundColor: Colors.secondary[50]}}>
      <FlatList
        showsVerticalScrollIndicator={true}
        onEndReached={() => {
          setLoadingMore(true);
          let temp = limit;
          setLimit(temp + 5);
        }}
        data={products}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingVertical: 16,
        }}
        renderItem={itemProps => (
          <ProductHorizontalCard
            key={`hor-card-${itemProps.item._id}`}
            _id={itemProps.item._id}
            name={itemProps?.item.name}
            price={itemProps?.item?.price}
            thumbnail={itemProps?.item?.thumbnail}
            size={itemProps?.item.size}
          />
        )}
        ListHeaderComponent={() => (
          <View>
            <View style={{marginBottom: 24}}>
              <Text
                style={{
                  fontSize: 28,
                  fontWeight: 'bold',
                  color: Colors.primary[600],
                }}>
                Sneakery
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 'normal',
                  color: Colors.secondary[600],
                  marginTop: 4,
                }}>
                Chúng tôi có những đôi giày cực hiếm và cực đẹp, việc của bạn
                đưa ra mức giá hợp lý nhất để mang nó về nhà.
              </Text>
            </View>

            <TopSellerHorizontal products={products} />

            <BrandCard
              isReverse
              logo={require('../../../assets/images/NikeCaro1.jpeg')}
              title="Thương hiệu Nike"
              subTitle="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro ad
          voluptas fugit corporis, dolorum voluptas fugit corporis, dolorum"
            />
            <ProductGrid
              key="nike"
              products={products?.filter(product => product.brand == 'nike')}
            />
            <BrandCard
              title="Thương hiệu Adidas"
              subTitle="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro ad
          voluptas fugit corporis, dolorum voluptas fugit corporis, dolorum"
              logo={require('../../../assets/images/AdidasCaro1.jpeg')}
            />
            <ProductGrid
              key="adidas"
              products={products?.filter(product => product.brand == 'adidas')}
            />
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const LoadingPlaceHolder: React.FC<any> = () => {
  const {Colors} = useTheme();
  return (
    <View style={{paddingVertical: 16, paddingHorizontal: 16}}>
      <View style={{marginBottom: 16}}>
        <Skeleton
          variant=""
          width="25%"
          height={30}
          radius={8}
          style={{marginBottom: 8}}
        />
        <Skeleton variant="" width="100%" height={10} radius={8} />
        <Skeleton
          variant=""
          width="100%"
          height={10}
          radius={8}
          style={{marginTop: 2}}
        />
        <Skeleton
          variant=""
          width="100%"
          height={10}
          radius={8}
          style={{marginTop: 2}}
        />
      </View>
      <Skeleton variant="" width="100%" height={180} radius={8} />
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          marginTop: 16,
        }}>
        <Skeleton width="48%" height={200} radius={8} />
        <Skeleton width="48%" height={200} radius={8} />
        <Skeleton width="48%" height={200} radius={8} style={{marginTop: 8}} />
        <Skeleton width="48%" height={200} radius={8} style={{marginTop: 8}} />
      </View>
    </View>
  );
};

export default Home;
