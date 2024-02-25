import React from 'react';
import {View} from 'react-native';
import Skeleton from '../../../../components/atoms/Skeleton';

interface ISearchLoadingViewProps {}

const SearchLoadingView: React.FC<ISearchLoadingViewProps> = props => {
  return (
    <View
      style={{
        paddingVertical: 16,
        paddingHorizontal: 16,
        height: '100%',
        backgroundColor: 'white',
      }}>
      <View style={{marginTop: 8, marginBottom: 8}}>
        <Skeleton
          variant=""
          width="100%"
          height={20}
          radius={50}
          style={{marginBottom: 8}}
        />
        <Skeleton variant="" width="30%" height={20} radius={50} />
      </View>
      <View style={{marginBottom: 8, flexDirection: 'row'}}>
        <Skeleton
          variant=""
          width={60}
          height={25}
          radius={50}
          style={{marginRight: 4}}
        />
        <Skeleton
          variant=""
          width={60}
          height={25}
          radius={50}
          style={{marginRight: 4}}
        />
        <Skeleton
          variant=""
          width={60}
          height={25}
          radius={50}
          style={{marginRight: 4}}
        />
      </View>
      <View style={{marginTop: 16}}>
        <Skeleton
          variant=""
          width="100%"
          height={120}
          radius={16}
          style={{marginBottom: 16}}
        />
        <Skeleton
          variant=""
          width="100%"
          height={120}
          radius={16}
          style={{marginBottom: 16}}
        />
        <Skeleton
          variant=""
          width="100%"
          height={120}
          radius={16}
          style={{marginBottom: 16}}
        />
        <Skeleton
          variant=""
          width="100%"
          height={120}
          radius={16}
          style={{marginBottom: 16}}
        />
        <Skeleton
          variant=""
          width="100%"
          height={120}
          radius={16}
          style={{marginBottom: 16}}
        />
        <Skeleton
          variant=""
          width="100%"
          height={120}
          radius={16}
          style={{marginBottom: 16}}
        />
        <Skeleton
          variant=""
          width="100%"
          height={120}
          radius={16}
          style={{marginBottom: 16}}
        />
        <Skeleton
          variant=""
          width="100%"
          height={120}
          radius={16}
          style={{marginBottom: 16}}
        />
      </View>
    </View>
  );
};

export default SearchLoadingView;
