import {View, Text, Alert} from 'react-native';
import React from 'react';
import useAuth from '../auth/useAuth';
import ScreenComponent from '../components/ScreenComponent';
import ButtonComponent from '../components/ButtonComponent';

export default function SettingScreen() {
  const {logout} = useAuth();
  const handleLogout = () => {
    try {
      Alert.alert('Logout', 'Are you sure to Logout!', [
        {
          text: 'Yes',
          onPress: logout,
        },
        {
          text: 'No',
        },
      ]);
    } catch (error) {
      console.log('============ERROR WHILE LOG OUT========================');
      console.log(error);
      console.log('====================================');
    }
  };
  return (
    <>
      <ScreenComponent>
        <View style={{flex: 1, paddingHorizontal: 22}}>
          <Text>Setting Screen</Text>
          <ButtonComponent title="Logout" onPress={handleLogout} />
        </View>
      </ScreenComponent>
    </>
  );
}
