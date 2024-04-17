import useProduct from '../../../hooks/useProduct';
import {useAuth} from '../../../hooks/useAuth';
import useTheme from '../../../hooks/useTheme';
import React, {useRef} from 'react';
import {Text, TextInput, View} from 'react-native';

interface ICommentInputProps {
  productId: string;
  onPostComment: (content: string) => void;
}

const CommentInput: React.FC<ICommentInputProps> = props => {
  const {Colors} = useTheme();
  const {userInfo} = useAuth();
  const {dispatchCommentOnProduct} = useProduct();

  const textInputRef = useRef<TextInput | null>(null);
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
      }}>
      <View
        style={{
          width: 30,
          height: 30,
          backgroundColor: Colors.primary[500],
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 10,
          borderRadius: 50,
        }}>
        <Text
          style={{
            fontSize: 20,
            color: 'white',
            fontWeight: '600',
          }}>
          {`${userInfo.username[0]}`.toUpperCase()}
        </Text>
      </View>

      <View style={{width: '100%', flexDirection: 'row'}}>
        <View style={{width: '100%'}}>
          <Text
            style={{
              fontSize: 16,
              color: Colors.secondary[600],
              fontWeight: '600',
              marginBottom: 4,
            }}>
            Thêm bình luận
          </Text>
          <TextInput
            ref={textInputRef}
            onSubmitEditing={e => {
              dispatchCommentOnProduct(props.productId, e.nativeEvent.text);
              textInputRef.current.clear();
              textInputRef.current.blur();
            }}
            returnKeyType="send"
            returnKeyLabel="send"
            placeholder="Nhập bình luận của bạn"
            onChangeText={() => {}}
            style={{
              borderRadius: 10,
              borderColor: Colors.secondary[300],
              borderWidth: 1,
              height: 50,
              paddingHorizontal: 10,
              width: '90%',
            }}
          />
        </View>

        {/* <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Text
            style={{
              fontSize: 16,
              color: Colors.primary[600],
              fontWeight: '600',
              textAlign: 'center',
            }}>
            Thêm
          </Text>
        </View> */}
      </View>
    </View>
  );
};

export default CommentInput;
