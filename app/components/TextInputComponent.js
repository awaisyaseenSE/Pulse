import React from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Text,
} from 'react-native';
import colors from '../config/colors';

const TextInputComponent = ({
  value = '',
  onChangeText,
  placeholder = '',
  secureTextEntry = false,
  onPressSecure = () => {},
  secureText = '',
  inputStyle = {},
  textStyle = {},
  placeholderTextColor = colors.grey,
  clearIcon = '',
  onPressClear = () => {},
  closeIconStyle,
  leftIcon,
  leftIconStyle,
  onPress,
  loading = false,
  innerRef,
  showHideIconStyle,
  rightIcon,
  rightIconOnPress,
  leftTxt = '',
  ...props
}) => {
  return (
    <View style={{...styles.inputStyle, ...inputStyle}}>
      {leftIcon && (
        <TouchableOpacity
          style={styles.leftIconContainer}
          onPress={onPress}
          activeOpacity={0.6}>
          <Image
            source={leftIcon}
            style={{...styles.leftIcon, ...leftIconStyle}}
          />
        </TouchableOpacity>
      )}
      {leftTxt !== '' && <Text>{leftTxt}</Text>}
      <TextInput
        ref={innerRef}
        style={{...styles.textStyle, ...textStyle}}
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        placeholderTextColor={placeholderTextColor}
        secureTextEntry={secureTextEntry}
        onPressSecure={onPressSecure}
        {...props}
      />
      {!!secureText ? (
        <TouchableOpacity onPress={onPressSecure} activeOpacity={0.6}>
          <Image
            source={secureText}
            style={{...styles.showHideIcon, ...showHideIconStyle}}
          />
        </TouchableOpacity>
      ) : null}
      {clearIcon.length > 0 ? (
        <TouchableOpacity
          onPress={onPressClear}
          style={{
            paddingVertical: 6,
            paddingHorizontal: 4,
          }}
          disabled={loading}>
          {loading ? (
            <ActivityIndicator size={'small'} color={colors.black} />
          ) : (
            <Image
              source={require('../assets/close.png')}
              style={{...styles.closeIcon, ...closeIconStyle}}
            />
          )}
        </TouchableOpacity>
      ) : null}
      {rightIcon && (
        <TouchableOpacity
          style={styles.righticonContainer}
          activeOpacity={0.6}
          onPress={rightIconOnPress}>
          <Image source={rightIcon} style={styles.righticon} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    height: 50,
    justifyContent: 'space-between',
    borderRadius: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginBottom: 0,
    flexDirection: 'row',
    backgroundColor: colors.inputBg,
  },
  textStyle: {
    fontSize: 14,
    flex: 1,
    color: colors.black_light,
    marginRight: 12,
    height: '100%',
  },
  showHideIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: colors.black,
  },
  closeIcon: {
    width: 12,
    height: 12,
    resizeMode: 'contain',
    tintColor: colors.black_light,
  },
  leftIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: colors.gray,
    marginRight: 12,
  },
  leftIconContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  righticon: {
    width: 26,
    height: 26,
    resizeMode: 'contain',
  },
  righticonContainer: {
    height: '100%',
    paddingLeft: 10,
    justifyContent: 'center',
  },
});

export default TextInputComponent;
