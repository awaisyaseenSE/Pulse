import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import colors from '../config/colors';
import fontFamily from '../config/fontFamily';

function ErrorText({error, style}) {
  return (
    <View style={{...styles.container, ...style}}>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  errorText: {
    color: colors.red,
    marginTop: 5,
    fontFamily: fontFamily.medium,
    fontSize: 13,
  },
});
export default ErrorText;
