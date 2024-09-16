import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  Platform,
  StatusBar,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React, {useState} from 'react';
import ScreenComponent from '../../components/ScreenComponent';
import colors from '../../config/colors';
import {findFocusedRoute, useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import TextInputComponent from '../../components/TextInputComponent';
import {validatePhoneNumber} from '../../utils/validation';
import CountryPicker from 'react-native-country-picker-modal';
import auth from '@react-native-firebase/auth';

export default function GEnterPhoneNo() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [countryCode, setCountryCode] = useState('PK');
  const [country, setCountry] = useState('');
  const [withFlag, setWithFlag] = useState(true);
  const [withEmoji, setWithEmoji] = useState(true);
  const [withFilter, setWithFilter] = useState(true);
  const [isCountryPickerShow, setIsCountryPickerShow] = useState(false);

  const [countryCallingCode, setCountryCallingCode] = useState('92');
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const [confirm, setConfirm] = useState(null);

  const onSelect = country => {
    setCountryCode(country?.cca2);

    setCountry(country?.name);
    setCountryCallingCode(country?.callingCode[0]);
  };

  async function signIn(phoneNumber) {
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirm(confirmation);
      console.log('object');
      let cc = await confirmation.confirm('123456');
      console.log('conf: ', cc.user?.uid);
    } catch (error) {
      alert(error);
    }
  }

  const handleSubmit = () => {
    console.log('call start');
    if (validatePhoneNumber(phone)) {
      let final = '+' + countryCallingCode + phone;
      //   console.log(final);
      signIn(final);
    } else {
      console.log('enter valid phone number!');
      Keyboard.dismiss();
    }
  };

  return (
    <>
      <StatusBar backgroundColor={colors.gGray} />
      <TouchableWithoutFeedback
        style={{flex: 1}}
        onPress={() => Keyboard.dismiss()}>
        <ImageBackground
          style={{flex: 1, backgroundColor: colors.gWhite}}
          source={require('../../assets/gelocery/bg.png')}>
          <View
            style={[
              styles.container,
              {
                marginTop: Platform.OS === 'android' ? 14 : insets.top,
              },
            ]}>
            <TouchableOpacity
              style={styles.backContainer}
              onPress={() => navigation.goBack()}>
              <Image
                source={require('../../assets/gelocery/back.png')}
                style={styles.back}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <View style={styles.row}>
              <CountryPicker
                {...{
                  countryCode,
                  withFilter,
                  withFlag,
                  withEmoji,
                  onSelect,
                }}
                visible={isCountryPickerShow}
              />
              <Text style={{fontSize: 14, color: colors.black}}>
                +{countryCallingCode}
              </Text>
              <TextInputComponent
                placeholder="Country"
                value={phone}
                onChangeText={text => setPhone(text.replace(/\s+/g, ''))}
                placeholderTextColor={colors.gray}
                inputStyle={styles.input}
                keyboardType="phone-pad"
                maxLength={15}
                textStyle={{color: colors.black}}
              />
            </View>
            <View style={{marginTop: 40}} />
            <Button title="submit" onPress={handleSubmit} />
          </View>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  back: {
    width: 18,
    height: 18,
  },
  backContainer: {
    alignSelf: 'flex-start',
    paddingRight: 10,
    paddingVertical: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: colors.red,
    borderRadius: 8,
    paddingRight: 6,

    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
  },
  input: {
    flex: 1,
    backgroundColor: colors.transparent,
    borderWidth: 0,
  },
});
