import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import colors from '../config/colors';

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.image} />
      <Image
        source={require('../assets/food-splah.png')}
        style={styles.image2}
      />
      {/* <Image
        source={require('../assets/gelocery/logo.png')}
        style={styles.image}
        resizeMode="contain"
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.red,
  },
  image: {
    width: 140,
    height: 140,
    resizeMode: 'contain',
    tintColor: colors.white,
  },
  image2: {
    width: 160,
    height: 160,
    resizeMode: 'contain',
    position: 'absolute',
    bottom: 4,
    left: -8,
  },
});
