import React from 'react';
import {Text, View} from 'react-native';

//interface
import {IProduct} from '../../../store/@types';
import {FlatList} from 'react-native-gesture-handler';
import {ProductHorizontalCard} from '../../../components/molecules';
import useTheme from '../../../hooks/useTheme';

interface ITopSellerHorizontalProps {
  products: IProduct[];
}

const TopSellerHorizontal: React.FC<ITopSellerHorizontalProps> = ({
  products,
}) => {
  const {Colors} = useTheme();
  return (
    <View>
      <View>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: Colors.secondary[600],
          }}>
          Sản phẩm bán chạy
        </Text>
      </View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        style={{marginTop: 12}}
        horizontal
        data={products}
        keyExtractor={(item, index) => `horizontal ${item._id}`}
        renderItem={({item}) => (
          <View style={{marginRight: 4}}>
            <ProductHorizontalCard
              _id={item?._id}
              name={item?.name}
              thumbnail={item.thumbnail}
              price={item.price}
            />
          </View>
        )}
      />
    </View>
  );
};

export default TopSellerHorizontal;
