import React from 'react';
import {View, Text, Platform} from 'react-native';
import Skeleton from '../../../components/atoms/Skeleton';
import {SafeAreaView} from 'react-native-safe-area-context';

interface IDetailLoadingScreenProps {}

const DetailLoadingScreen: React.FC<IDetailLoadingScreenProps> = props => {
  return (
    <SafeAreaView style={{paddingVertical: Platform.OS === 'android' ? 16 : 0}}>
      <View style={{height: '100%', justifyContent: 'space-between'}}>
        <View style={{height: '95%'}}>
          <View style={{paddingVertical: 16, paddingHorizontal: 16}}>
            <View style={{marginBottom: 24}}>
              <Skeleton
                variant=""
                width="100%"
                height={200}
                radius={12}
                style={{marginBottom: 12}}
              />
            </View>
            <View>
              <Skeleton variant="" width="90%" height={24} radius={12} />
              <View style={{flexDirection: 'row', marginTop: 12}}>
                <Skeleton
                  variant=""
                  width="40%"
                  height={15}
                  radius={12}
                  style={{marginRight: 12}}
                />
                <Skeleton
                  variant=""
                  width="24%"
                  height={15}
                  radius={12}
                  style={{marginRight: 12}}
                />
              </View>
              <View style={{flexDirection: 'row', marginTop: 12}}>
                <Skeleton
                  variant=""
                  width="40%"
                  height={15}
                  radius={12}
                  style={{marginRight: 12}}
                />
                <Skeleton
                  variant=""
                  width="24%"
                  height={15}
                  radius={12}
                  style={{marginRight: 12}}
                />
              </View>
              <View style={{flexDirection: 'row', marginTop: 12}}>
                <Skeleton
                  variant=""
                  width="40%"
                  height={15}
                  radius={12}
                  style={{marginRight: 12}}
                />
                <Skeleton
                  variant=""
                  width="50%"
                  height={15}
                  radius={12}
                  style={{marginRight: 12}}
                />
              </View>
              <View style={{flexDirection: 'row', marginTop: 12}}>
                <Skeleton
                  variant=""
                  width="40%"
                  height={15}
                  radius={12}
                  style={{marginRight: 12}}
                />
                <Skeleton
                  variant=""
                  width="40%"
                  height={15}
                  radius={12}
                  style={{marginRight: 12}}
                />
              </View>
              <View style={{flexDirection: 'row', marginTop: 12}}>
                <Skeleton
                  variant=""
                  width="40%"
                  height={15}
                  radius={12}
                  style={{marginRight: 12}}
                />
                <Skeleton
                  variant=""
                  width="50%"
                  height={15}
                  radius={12}
                  style={{marginRight: 12}}
                />
              </View>
            </View>
            <View style={{marginTop: 24}}>
              <Skeleton variant="" width="90%" height={24} radius={12} />
              <View style={{flexDirection: 'row', marginTop: 12}}>
                <Skeleton
                  variant=""
                  width="40%"
                  height={15}
                  radius={12}
                  style={{marginRight: 12}}
                />
                <Skeleton
                  variant=""
                  width="24%"
                  height={15}
                  radius={12}
                  style={{marginRight: 12}}
                />
              </View>
              <View style={{flexDirection: 'row', marginTop: 12}}>
                <Skeleton
                  variant=""
                  width="40%"
                  height={15}
                  radius={12}
                  style={{marginRight: 12}}
                />
                <Skeleton
                  variant=""
                  width="50%"
                  height={15}
                  radius={12}
                  style={{marginRight: 12}}
                />
              </View>
              <View style={{flexDirection: 'row', marginTop: 12}}>
                <Skeleton
                  variant=""
                  width="40%"
                  height={15}
                  radius={12}
                  style={{marginRight: 12}}
                />
                <Skeleton
                  variant=""
                  width="40%"
                  height={15}
                  radius={12}
                  style={{marginRight: 12}}
                />
              </View>
              <View style={{flexDirection: 'row', marginTop: 12}}>
                <Skeleton
                  variant=""
                  width="40%"
                  height={15}
                  radius={12}
                  style={{marginRight: 12}}
                />
                <Skeleton
                  variant=""
                  width="50%"
                  height={15}
                  radius={12}
                  style={{marginRight: 12}}
                />
              </View>
            </View>

            {/* <View style={{marginTop: 24}}>
              <Skeleton
                variant=""
                width="40%"
                height={36}
                radius={16}
                style={{marginRight: 12}}
              />
            </View> */}
          </View>
        </View>
        <View style={{height: '10%', paddingHorizontal: 20}}>
          <Skeleton variant="" width="100%" height={40} radius={12} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DetailLoadingScreen;
