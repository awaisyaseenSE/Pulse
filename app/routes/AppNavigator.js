import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Dimensions} from 'react-native';
import BottomTabNavigator from './BottomTabNavigator';
import SettingScreen from '../screens/SettingScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import GWelcomeScreen from '../screens/GroceryApp/GWelcomeScreen';
import TestingScreen from '../screens/TestingScreen';

const Stack = createNativeStackNavigator();

const {width, height} = Dimensions.get('window');

function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BottomTabNavigator"
        component={BottomTabNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SettingScreen"
        component={SettingScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="GWelcomeScreen"
        component={GWelcomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TestingScreen"
        component={TestingScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
export default AppNavigator;
