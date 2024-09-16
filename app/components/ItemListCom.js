import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import colors from '../config/colors';

const ItemListCom = ({item}) => {
  console.log('item: ', item?.title);
  return (
    <View style={styles.dd}>
      <Text>{item?.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  dd: {
    marginBottom: 20,
    paddingVertical: 12,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderColor: colors.gGray,
  },
});

export default React.memo(ItemListCom);
