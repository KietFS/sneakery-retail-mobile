import React from 'react';
import {View, Text} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import useTheme from '../../../../hooks/useTheme';
import {Button} from '../../../../components/atoms';
import {useNavigation} from '@react-navigation/native';
import NavigationHeader from '../../../../components/molecules/NavigationHeader';
import {SafeAreaView} from 'react-native-safe-area-context';

interface INotifycationProps {}

const Security: React.FC<INotifycationProps> = props => {
  const {Colors} = useTheme();
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{backgroundColor: 'white'}}>
      <View style={{borderColor: 'white', height: '100%'}}>
        <NavigationHeader title="Chính sách bảo mật" />
        <ScrollView style={{paddingHorizontal: 16}}>
          <Text
            style={{
              marginTop: 16,
              color: Colors.secondary[600],
              fontWeight: 'normal',
            }}>
            1. Sneakery cam kết bảo vệ thông tin cá nhân của người dùng. Chúng
            tôi thu thập, sử dụng và lưu trữ thông tin của người dùng chỉ để
            quản lý tài khoản và cung cấp dịch vụ cho người dùng.
          </Text>
          <Text
            style={{
              marginTop: 16,
              color: Colors.secondary[600],
              fontWeight: 'normal',
            }}>
            2. Sneakery thu thập các thông tin cá nhân của người dùng, bao gồm
            tên, địa chỉ email, số điện thoại và địa chỉ giao hàng để cung cấp
            dịch vụ đấu giá giày.
          </Text>
          <Text
            style={{
              marginTop: 16,
              color: Colors.secondary[600],
              fontWeight: 'normal',
            }}>
            3. Chúng tôi cũng có thể thu thập thông tin khác như địa chỉ IP,
            loại trình duyệt, thời gian truy cập và các trang web đã truy cập để
            phân tích và cải thiện trải nghiệm người dùng trên Sneakery.
          </Text>
          <Text
            style={{
              marginTop: 16,
              color: Colors.secondary[600],
              fontWeight: 'normal',
            }}>
            4. Sneakery không bán, cho thuê hoặc chia sẻ thông tin cá nhân của
            người dùng với bất kỳ bên thứ ba nào trừ khi được sự đồng ý của
            người dùng hoặc khi yêu cầu bởi pháp luật.
          </Text>
          <Text
            style={{
              marginTop: 16,
              color: Colors.secondary[600],
              fontWeight: 'normal',
            }}>
            5. Chúng tôi sử dụng các biện pháp bảo mật để bảo vệ thông tin cá
            nhân của người dùng, bao gồm mã hóa SSL và các biện pháp bảo mật vật
            lý để ngăn chặn truy cập trái phép hoặc mất mát dữ liệu.
          </Text>
          <Text
            style={{
              marginTop: 16,
              color: Colors.secondary[600],
              fontWeight: 'normal',
            }}>
            6. Người dùng có thể chỉnh sửa hoặc xoá thông tin cá nhân của mình
            bằng cách truy cập vào tài khoản Sneakery của mình hoặc liên hệ với
            chúng tôi để yêu cầu xoá hoặc sửa đổi thông tin cá nhân.
          </Text>
          <Text
            style={{
              marginTop: 16,
              color: Colors.secondary[600],
              fontWeight: 'normal',
            }}>
            7. Sneakery sử dụng các cookie và công nghệ tương tự để thu thập
            thông tin và cải thiện trải nghiệm người dùng. Người dùng có thể tắt
            cookie trên trình duyệt của mình, tuy nhiên điều này có thể làm giảm
            chức năng của Sneakery.
          </Text>
          <Text
            style={{
              marginTop: 16,
              color: Colors.secondary[600],
              fontWeight: 'normal',
            }}>
            8. Sneakery có thể thay đổi hoặc cập nhật chính sách bảo mật này
            theo thời gian. Chúng tôi khuyến khích người dùng xem xét chính sách
            này định kỳ để biết các cập nhật mới nhất.
          </Text>
          <Text
            style={{
              marginTop: 16,
              color: Colors.secondary[600],
              fontWeight: 'normal',
            }}>
            9. Nếu bạn có bất kỳ câu hỏi hoặc đề xuất liên quan đến chính sách
            bảo mật của Sneakery, vui lòng liên hệ với chúng tôi qua trang liên
            hệ trên ứng dụng.
          </Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Security;
