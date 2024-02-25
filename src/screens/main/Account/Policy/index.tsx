import React from 'react';
import {View, Text} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import useTheme from '../../../../hooks/useTheme';
import {Button} from '../../../../components/atoms';
import {useNavigation} from '@react-navigation/native';
import NavigationHeader from '../../../../components/molecules/NavigationHeader';
import {SafeAreaView} from 'react-native-safe-area-context';

interface INotifycationProps {}

const Policy: React.FC<INotifycationProps> = props => {
  const {Colors} = useTheme();
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{backgroundColor: 'white'}}>
      <View style={{borderColor: 'white', height: '100%'}}>
        <NavigationHeader title="Điều khoản sử dụng" />
        <ScrollView style={{paddingHorizontal: 16}}>
          <Text
            style={{
              marginTop: 16,
              color: Colors.secondary[600],
              fontWeight: 'normal',
            }}>
            1. Chào mừng bạn đến với Sneakery. Bằng cách tải xuống, truy cập
            hoặc sử dụng ứng dụng này, bạn đồng ý tuân thủ các điều khoản và
            điều kiện sử dụng của chúng tôi.
          </Text>
          <Text
            style={{
              marginTop: 16,
              color: Colors.secondary[600],
              fontWeight: 'normal',
            }}>
            2. Sneakery là một ứng dụng đấu giá giày trực tuyến cho phép người
            dùng mua và bán các sản phẩm giày.
          </Text>
          <Text
            style={{
              marginTop: 16,
              color: Colors.secondary[600],
              fontWeight: 'normal',
            }}>
            3. Bằng cách sử dụng ứng dụng này, bạn đồng ý rằng bạn chịu trách
            nhiệm về các giao dịch mua bán của mình và bạn đảm bảo rằng các sản
            phẩm của bạn đáp ứng các yêu cầu và tiêu chuẩn của chúng tôi.
          </Text>
          <Text
            style={{
              marginTop: 16,
              color: Colors.secondary[600],
              fontWeight: 'normal',
            }}>
            4. Bạn đồng ý không sử dụng Sneakery để bán các sản phẩm giả mạo,
            sao chép hoặc bất hợp pháp. Chúng tôi có quyền xóa các sản phẩm vi
            phạm chính sách của chúng tôi và cảnh báo hoặc khóa tài khoản của
            người dùng.
          </Text>
          <Text
            style={{
              marginTop: 16,
              color: Colors.secondary[600],
              fontWeight: 'normal',
            }}>
            5. Nếu bạn đang sử dụng Sneakery để bán sản phẩm, bạn đồng ý rằng
            bạn sẽ cung cấp thông tin đầy đủ và chính xác về sản phẩm của mình,
            bao gồm các hình ảnh và mô tả chi tiết.
          </Text>
          <Text
            style={{
              marginTop: 16,
              color: Colors.secondary[600],
              fontWeight: 'normal',
            }}>
            6. Bạn đồng ý rằng bạn sẽ không sử dụng Sneakery để gửi thư rác,
            hoặc các tin nhắn không được yêu cầu cho các người dùng khác. Bạn
            cũng không được phép sử dụng Sneakery để thực hiện hoặc khuyến khích
            các hành vi bất hợp pháp hoặc gây rối loạn.
          </Text>
          <Text
            style={{
              marginTop: 16,
              color: Colors.secondary[600],
              fontWeight: 'normal',
            }}>
            7. Bạn có trách nhiệm bảo vệ mật khẩu của mình và đảm bảo rằng chỉ
            có bạn mới được truy cập vào tài khoản của mình trên Sneakery.
          </Text>
          <Text
            style={{
              marginTop: 16,
              color: Colors.secondary[600],
              fontWeight: 'normal',
            }}>
            8. Chúng tôi có quyền thay đổi hoặc cập nhật các điều khoản và điều
            kiện sử dụng của Sneakery vào bất kỳ thời điểm nào. Bạn nên kiểm tra
            định kỳ để biết các cập nhật này.
          </Text>
          <Text
            style={{
              marginTop: 16,
              color: Colors.secondary[600],
              fontWeight: 'normal',
            }}>
            9. Sneakery không chịu trách nhiệm đối với bất kỳ thiệt hại nào,
            trực tiếp hoặc gián tiếp, phát sinh từ việc sử dụng hoặc không thể
            sử dụng ứng dụng.
          </Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Policy;
