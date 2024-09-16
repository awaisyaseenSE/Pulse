import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import React from 'react';
import colors from '../config/colors';
import FastImage from 'react-native-fast-image';

const screenWidth = Dimensions.get('window').width;

const ShowMenuHomeCompo = ({data, index}) => {
  let even = index % 2 == 0 ? true : false;
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          marginRight: even ? 10 : 0,
          marginLeft: even ? 0 : 10,
        },
      ]}
      activeOpacity={0.8}>
      <FastImage source={data?.img} style={styles.img} resizeMode="contain" />
      <Text>{data?.title}</Text>
      <Text>{data?.price}</Text>
      <Text>{even ? 'even' : 'not'}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bg,
    width: screenWidth / 2 - 28,
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 12,
  },
  img: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
});

export default ShowMenuHomeCompo;
