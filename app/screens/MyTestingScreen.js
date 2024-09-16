import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import ScreenComponent from '../components/ScreenComponent';

export default function MyTestingScreen() {
  return (
    <ScreenComponent>
      <View style={styles.container}>
        <Text>My Testing</Text>
      </View>
    </ScreenComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 20,
  },
});
