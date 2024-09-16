import {View, Text, StyleSheet, FlatList} from 'react-native';
import React, {memo, useCallback, useState} from 'react';
import ScreenComponent from '../components/ScreenComponent';
import ButtonComponent from '../components/ButtonComponent';
import fontFamily from '../config/fontFamily';
import colors from '../config/colors';
import ItemListCom from '../components/ItemListCom';

// Memoized ListItem component
const ListItem = memo(({item}) => {
  console.log('Rendered item in memo:', item.title);
  return (
    <View style={styles.dd}>
      <Text>{item?.title}</Text>
    </View>
  );
});

export default function TestingScreen() {
  const data = [
    {id: 0, title: 'Football'},
    {id: 1, title: 'Cricket'},
    {id: 2, title: 'Horse Riding'},
    {id: 3, title: 'Running'},
    {id: 4, title: 'Volleyball'},
  ];

  const [count, setCount] = useState(0);

  // Memoize the renderItem function
  const renderItem = useCallback(({item}) => {
    return <ListItem item={item} />;
  }, []);

  // Memoize keyExtractor to prevent re-renders if data array remains the same
  const keyExtractor = useCallback(item => item.id.toString(), []);

  const handleIncrement = useCallback(() => {
    setCount(prevValue => prevValue + 1);
  }, []);

  return (
    <ScreenComponent>
      <View style={styles.container}>
        <Text style={styles.heading}>Testing Screen</Text>
        <View>
          <FlatList
            data={data}
            // renderItem={renderItem}
            renderItem={({item}) => <ItemListCom item={item} />}
            keyExtractor={keyExtractor}
            // Removed extraData to prevent unnecessary re-renders
          />
        </View>
        <ButtonComponent
          title={count.toString()}
          style={{marginTop: 20}}
          onPress={handleIncrement}
        />
      </View>
    </ScreenComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 18,
    alignSelf: 'center',
    fontFamily: fontFamily.semi_bold,
    color: colors.black,
    marginBottom: 20,
  },
  dd: {
    marginBottom: 20,
    paddingVertical: 12,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderColor: colors.gGray,
  },
});
