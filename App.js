import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppNavigator from './app/routes/AppNavigator';
import AuthNavigator from './app/routes/AuthNavigator';
import AuthsContext from './app/auth/AuthsContext';
import SplashScreen from './app/screens/SplashScreen';
import auth from '@react-native-firebase/auth';
import {NavigationContainer} from '@react-navigation/native';
import {getValue} from './app/utils/storeAndGetAsyncStorage';
import constants from './app/constants/constants';

export default function App() {
  const [user, setUser] = useState(null);
  const [splashDone, setIsSplashDone] = useState(false);

  const checkOnBoarding = async () => {
    try {
      let key = 'onBoarding';
      const val = await getValue(key);
      if (val === 'true') {
        constants.onBoardingStatus = true;
      }
      setTimeout(() => {
        setIsSplashDone(true);
      }, 1000);
    } catch (error) {
      console.log('Error in getting onBoarding status in app.js: ', error);
    }
  };

  const checkUser = () => {
    if (auth().currentUser !== null && auth().currentUser !== undefined) {
      setUser(auth().currentUser);
      checkOnBoarding();
    } else {
      checkOnBoarding();
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <>
      {splashDone ? (
        <AuthsContext.Provider value={{user, setUser}}>
          <SafeAreaProvider>
            <NavigationContainer>
              {user !== null ? <AppNavigator /> : <AuthNavigator />}
            </NavigationContainer>
          </SafeAreaProvider>
        </AuthsContext.Provider>
      ) : (
        <SplashScreen />
      )}
    </>
  );
}
