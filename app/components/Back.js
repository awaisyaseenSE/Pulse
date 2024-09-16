import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import colors from '../config/colors';
import {useNavigation} from '@react-navigation/native';

const Back = ({style, iconStyle}) => {
  const navigation = useNavigation();
  return (
    <View style={{...styles.container, ...style}}>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigation.goBack()}
        activeOpacity={0.6}>
        <Image
          source={require('../assets/backward.png')}
          style={{...styles.icon, ...iconStyle}}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginBottom: 8,
  },
  icon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
    tintColor: colors.black,
  },
  iconContainer: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    alignSelf: 'flex-start',
  },
});

export default Back;
