import {
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import React from 'react';
import colors from '../config/colors';
import fontFamily from '../config/fontFamily';

const ButtonComponent = ({
  title = '',
  style,
  onPress,
  textStyle,
  loading = false,
}) => {
  return (
    <TouchableOpacity
      style={{...styles.buttonContainer, ...style}}
      activeOpacity={0.5}
      onPress={onPress}
      disabled={loading}>
      {loading ? (
        <ActivityIndicator size={16} color={colors.white} />
      ) : (
        <Text style={{...styles.buttonText, ...textStyle}}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: colors.red,
    borderRadius: 6,
    alignItems: 'center',
    height: 50,
    justifyContent: 'center',
    borderCurve: 'continuous',
  },
  buttonText: {
    fontSize: 16,
    color: colors.white,
    fontFamily: fontFamily.semi_bold,
  },
});

export default ButtonComponent;
