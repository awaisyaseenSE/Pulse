import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import OnBoardingScreen from '../screens/OnBoardingScreen';
import constants from '../constants/constants';
import BioScreen from '../screens/BioScreen';
import UploadImageScreen from '../screens/UploadImageScreen';
import SetLocationScreen from '../screens/SetLocationScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import GLogin from '../screens/GroceryApp/GLogin';
import GWelcomeScreen from '../screens/GroceryApp/GWelcomeScreen';
import GEnterPhoneNo from '../screens/GroceryApp/GEnterPhoneNo';

const Stack = createNativeStackNavigator();

function AuthNavigator() {
  return (
    <Stack.Navigator>
      {!constants.onBoardingStatus && (
        <Stack.Screen
          name="OnBoardingScreen"
          component={OnBoardingScreen}
          options={{headerShown: false}}
        />
      )}
      {/* <Stack.Screen
        name="GWelcomeScreen"
        component={GWelcomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="GLogin"
        component={GLogin}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="GEnterPhoneNo"
        component={GEnterPhoneNo}
        options={{headerShown: false}}
      /> */}
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BioScreen"
        component={BioScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UploadImageScreen"
        component={UploadImageScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SetLocationScreen"
        component={SetLocationScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
export default AuthNavigator;
