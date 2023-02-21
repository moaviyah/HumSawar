import React, { useState, useRef } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';

const OtpInput = ({ onChange, onComplete, inputContainerStyle, inputStyle, autoFocus = true }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);
    let index;
  const handleInputChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (onChange) {
      onChange(newOtp.join(''));
    }

    if (value !== '' && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (index, event) => {
    if (event.nativeEvent.key === 'Backspace' && index > 0 && otp[index] === '') {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleInputComplete = () => {
    if (onComplete) {
      onComplete(otp.join(''));
    }
  };

  const inputProps = {
    maxLength: 1,
    style: [styles.input, inputStyle],
    keyboardType: 'number-pad',
    onKeyPress: e => handleKeyPress(index, e),
    onChangeText: value => handleInputChange(index, value),
    ref: ref => {
      inputRefs.current[index] = ref;
    },
  };

  return (
    <View style={[styles.container, inputContainerStyle]}>
      {Array.from({ length: 6 }).map((_, index) => (
        <TextInput
          key={index}
          value={otp[index]}
          autoFocus={autoFocus && index === 0}
          {...inputProps}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 24,
  },
  input: {
    fontSize: 32,
    fontWeight: 'bold',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'gray',
    textAlign: 'center',
    width: 48,
    height: 48,
    backgroundColor: '#F6F6F6',
  },
});

export default OtpInput