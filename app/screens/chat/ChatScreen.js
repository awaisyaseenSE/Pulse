import {View, Text} from 'react-native';
import React from 'react';
import ScreenComponent from '../../components/ScreenComponent';

export default function ChatScreen() {
  return (
    <ScreenComponent>
      <View style={{paddingHorizontal: 20}}>
        <Text>ChatScreen</Text>
      </View>
    </ScreenComponent>
  );
}
