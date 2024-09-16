import {Platform, View, Dimensions, StatusBar} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import React from 'react';
import colors from '../config/colors';

const {height} = Dimensions.get('window');
const deviceModel = DeviceInfo.getModel();

export default function ScreenComponent({
  style,
  children,
  content = Platform.OS === 'ios' ? 'dark-content' : 'light-content',
  hideStatusBar = false,
  backgroundColor = colors.white,
}) {
  let paddingTop = Platform.OS === 'ios' ? height * 0.05 : 10;

  if (deviceModel.includes('iphone 15')) {
    paddingTop = height * 0.06;
  }

  return (
    <>
      <StatusBar
        barStyle={content}
        backgroundColor={backgroundColor}
        hidden={hideStatusBar}
      />
      <View
        style={[{paddingTop, flex: 1, backgroundColor: colors.white}, style]}>
        {children}
      </View>
    </>
  );
}
