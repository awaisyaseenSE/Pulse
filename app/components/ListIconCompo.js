import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import colors from '../config/colors';
import fontFamily from '../config/fontFamily';

const ListIconCompo = ({icon, label = '', onPress}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={onPress}>
      <View style={styles.row}>
        <View style={styles.iconContainer}>
          <Image source={icon} style={styles.icon} />
        </View>
        <Text style={styles.label}>{label}</Text>
      </View>
      <Image
        source={require('../assets/right-arrow.png')}
        style={styles.rightIcon}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 22,
  },
  icon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    tintColor: colors.white,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightIcon: {
    width: 14,
    height: 14,
    resizeMode: 'contain',
    tintColor: colors.gray,
  },
  label: {
    fontSize: 16,
    color: colors.black,
    fontFamily: fontFamily.medium,
    marginLeft: 14,
  },
  iconContainer: {
    width: 34,
    height: 34,
    backgroundColor: colors.red,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
});

export default ListIconCompo;
