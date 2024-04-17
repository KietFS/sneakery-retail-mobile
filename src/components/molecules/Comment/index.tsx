import {Text, View} from 'react-native';
import {ICommentItem} from '../../../store/@types';
import React from 'react';
import useTheme from '../../../hooks/useTheme';

interface ICommentProps extends ICommentItem {}

const Comment: React.FC<ICommentProps> = props => {
  const {Colors} = useTheme();
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        maxWidth: '85%',
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
            color: Colors.secondary[50],
            fontWeight: '600',
          }}>
          {`${props.user.username[0]}`.toUpperCase()}
        </Text>
      </View>
      <View>
        <Text
          style={{
            color: Colors.secondary[600],
            fontWeight: '600',
            fontSize: 16,
          }}>
          {props.user.username}
        </Text>
        <Text
          style={{
            color: Colors.secondary[500],
            fontWeight: '500',
            fontSize: 14,
          }}>
          {props.comment}
        </Text>
      </View>
    </View>
  );
};

export default Comment;
