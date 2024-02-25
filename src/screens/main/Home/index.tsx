import useTheme from '../../../hooks/useTheme';
import React, {useEffect} from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import {BrandCard} from '../../../components/molecules';
import ProductGrid from '../../../components/organisms/ProductGrid';
import Skeleton from '../../../components/atoms/Skeleton';
import useProduct from '../../../hooks/useProduct';

interface IHomeScreenProps {}

const Home: React.FC<IHomeScreenProps> = props => {
  const {Colors} = useTheme();
  const {
    dispatchGetProductHomePage,
    nikeProducts,
    adidasProducts,
    pumaProducts,
    lvProducts,
    isGettingHomePage,
  } = useProduct();

  useEffect(() => {
    dispatchGetProductHomePage();
  }, []);

  return (
    <SafeAreaView style={{backgroundColor: Colors.secondary[50]}}>
      {isGettingHomePage ? (
        <LoadingPlaceHolder />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 200}}
          style={{
            backgroundColor: Colors.secondary[50],
            height: '100%',
            paddingHorizontal: 16,
            paddingVertical: 16,
          }}>
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
              Chúng tôi có những đôi giày cực hiếm và cực đẹp, việc của bạn đưa
              ra mức giá hợp lý nhất để mang nó về nhà.
            </Text>
          </View>

          <BrandCard
            isReverse
            logo={require('../../../assets/images/NikeCaro1.jpeg')}
            title="Thương hiệu Nike"
            subTitle="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro ad
          voluptas fugit corporis, dolorum voluptas fugit corporis, dolorum"
          />
          <ProductGrid products={nikeProducts} />
          <BrandCard
            title="Thương hiệu Adidas"
            subTitle="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro ad
          voluptas fugit corporis, dolorum voluptas fugit corporis, dolorum"
            logo={require('../../../assets/images/AdidasCaro1.jpeg')}
          />
          <ProductGrid products={adidasProducts} />
          <BrandCard
            isReverse
            logo={require('../../../assets/images/LVCaro1.jpeg')}
            title="Thương hiệu LV"
            subTitle="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro ad
          voluptas fugit corporis, dolorum voluptas fugit corporis, dolorum"
          />
          <ProductGrid products={lvProducts} />
          <BrandCard
            title="Thương hiệu Puma"
            subTitle="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro ad
          voluptas fugit corporis, dolorum voluptas fugit corporis, dolorum"
            logo={require('../../../assets/images/PumaCaro1.webp')}
          />
          <ProductGrid products={pumaProducts} />
        </ScrollView>
      )}
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
