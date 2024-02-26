import React, {useRef, useState, useEffect} from 'react';
import {Control, Controller, useForm} from 'react-hook-form';
import {View, TextInput, StyleSheet, Text} from 'react-native';

interface IOTPInpurProps {
  otpValue: string;
  setOtpValue: (value: string) => void;
}

const OTPInput: React.FC<IOTPInpurProps> = ({otpValue, setOtpValue}) => {
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const inputsRef = useRef([]);

  const focusNext = (index, value) => {
    if (index < otp.length - 1 && value) {
      inputsRef.current[index + 1].focus();
    }
    if (index === otp.length - 1) {
      inputsRef.current[index].blur();
    }
    const otpCopy = [...otp];
    otpCopy[index] = value;
    setOtp(otpCopy);
  };

  const focusPrevious = (key, index) => {
    if (key === 'Backspace' && index !== 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  useEffect(() => {
    setOtpValue(otp.join(''));
  }, [otp]);

  return (
    <View style={styles.container}>
      {Array.from({length: 6}).map((_, index) => (
        <TextInput
          ref={ref => (inputsRef.current[index] = ref)}
          key={index}
          style={styles.otpBox}
          keyboardType="numeric"
          maxLength={1}
          onChangeText={value => focusNext(index, value)}
          onKeyPress={({nativeEvent}) => {
            if (nativeEvent.key === 'Backspace') {
              focusPrevious(nativeEvent.key, index);
            }
          }}
          value={otp[index]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  otpBox: {
    width: 50,
    height: 50,
    borderRadius: 4,
    backgroundColor: '#d1d5db',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default OTPInput;
