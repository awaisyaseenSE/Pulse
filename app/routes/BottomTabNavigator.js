import {Image, StyleSheet, Platform, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import colors from '../config/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import CartScreen from '../screens/CartScreen';
import ChatScreen from '../screens/chat/ChatScreen';

const BottomTab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const insets = useSafeAreaInsets();
  const isIOS = Platform.OS === 'ios';

  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: colors.white,
        tabBarInactiveTintColor: colors.gray,
        tabBarStyle: {
          backgroundColor: colors.red,
          borderRadius: 8,
          position: 'absolute',
          marginHorizontal: 12,
          bottom: Platform.OS === 'android' ? 10 : insets.bottom - 12,
          borderTopWidth: 0,
          paddingVertical: 12,
          height: 60,
          paddingBottom: isIOS ? 14 : 16,
        },
        tabBarShowLabel: false,
      }}
      initialRouteName="HomeScreen">
      <BottomTab.Screen
        component={HomeScreen}
        name="HomeScreen"
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <View
                style={[
                  styles.iconContainer,
                  {
                    backgroundColor: focused ? colors.white : null,
                  },
                ]}>
                <Image
                  source={require('../assets/tab_home.png')}
                  style={[
                    styles.iconStyle,
                    {tintColor: focused ? colors.red : colors.white},
                  ]}
                />
              </View>
            );
          },
        }}
      />
      <BottomTab.Screen
        component={ProfileScreen}
        name="ProfileScreen"
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <View
                style={[
                  styles.iconContainer,
                  {
                    backgroundColor: focused ? colors.white : null,
                  },
                ]}>
                <Image
                  source={require('../assets/tab_profile.png')}
                  style={[
                    styles.iconStyle,
                    {tintColor: focused ? colors.red : colors.white},
                  ]}
                />
              </View>
            );
          },
        }}
      />
      <BottomTab.Screen
        component={CartScreen}
        name="CartScreen"
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <View
                style={[
                  styles.iconContainer,
                  {
                    backgroundColor: focused ? colors.white : null,
                  },
                ]}>
                <Image
                  source={require('../assets/tab_cart.png')}
                  style={[
                    styles.iconStyle,
                    {tintColor: focused ? colors.red : colors.white},
                  ]}
                />
              </View>
            );
          },
        }}
      />
      <BottomTab.Screen
        component={ChatScreen}
        name="ChatScreen"
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <View
                style={[
                  styles.iconContainer,
                  {
                    backgroundColor: focused ? colors.white : null,
                  },
                ]}>
                <Image
                  source={require('../assets/tab_chat.png')}
                  style={[
                    styles.iconStyle,
                    {tintColor: focused ? colors.red : colors.white},
                  ]}
                />
              </View>
            );
          },
        }}
      />
    </BottomTab.Navigator>
  );
};

const styles = StyleSheet.create({
  iconStyle: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  iconContainer: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 4,
  },
});

export default BottomTabNavigator;
