import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import ScreenComponent from '../components/ScreenComponent';
import DropShadow from 'react-native-drop-shadow';
import colors from '../config/colors';
import Animated from 'react-native-reanimated';

export default function CartScreen() {
  const AnimatedDropShadow = Animated.createAnimatedComponent(DropShadow);

  return (
    <ScreenComponent>
      <View style={styles.container}>
        <Text>Cart Screen</Text>
        <View style={styles.shawdow} />
        <DropShadow style={styles.sh}>
          <View
            style={{
              width: 80,
              height: 80,
              backgroundColor: 'skyblue',
              borderRadius: 8,
            }}
          />
        </DropShadow>
      </View>
    </ScreenComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sh: {
    margin: 12,
    shadowColor: colors.gray,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.6,
    shadowRadius: 4,
  },
  shawdow: {
    shadowColor: colors.gray,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.8,
    shadowRadius: 4,

    width: 100,
    height: 100,
    backgroundColor: colors.gray_Light,
    margin: 20,
    borderRadius: 8,
  },
});
